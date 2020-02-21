<template>
    <div class="dialog">
        <div class="dialog__top">
            <nuxt-link to="/cabinet/chat" class="dialog__back back back--small">
            </nuxt-link>
            <div class="dialog__person">
                <div class="dialog__person-pic"  v-if="$store.state.currentDialogInfo.userType === 'client' && +$store.state.currentDialogInfo.userProgress === 100" :style="{'background-image': `url(${$store.state.currentDialogInfo.userPic || '/app-icons/icon__user-def.svg'} )`}">
            </div>
                <nuxt-link v-else target="_blank" :to="`/catalog/vendor/${$route.params.id}`" class="dialog__person-pic"   :style="{'background-image': `url(${$store.state.currentDialogInfo.userPic || '/app-icons/icon__user-def.svg'})`}">
                </nuxt-link>
                <div class="dialog__person-right">
                    <!--<div class="dialog__person-title">Диалог</div>-->
                    <div class="dialog__person-name" v-text="$store.state.currentDialogInfo.name"></div>
                </div>
                <!--<div class="dialog__settings settings settings&#45;&#45;dialog">-->
                <!--<span class="settings__dot"></span>-->
                <!--<span class="settings__dot"></span>-->
                <!--<span class="settings__dot"></span>-->
                <!--</div>-->
            </div>
        </div>
        <div class="dialog__messages messages messages--dialog" ref="messagesHolder">
            <div class="messages__holder"  @scroll="handleScroll">
            <message v-for="message in messages" :messageInfo="message" :key="message.id" :id="message.id"></message>
            </div>
        </div>
        <div class="dialog__type-message">
            <textarea class="input" v-model="messageBody" @keydown="typing" @focus="handleScroll" ref="messageField" placeholder="Ваше сообщение"></textarea>
            <button class="dialog__send-button" :class="{'dialog__send-button--active': messageBody}" @click="sendMessage">
                <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="send" fill-rule="nonzero" class="dialog__send-icon" fill="#889FBC">
                            <path d="M11.9174575,29.4041883 L27.8983449,20.8823836 L27.8983449,20.8823836 C28.3856719,20.6225165 28.5700647,20.0167961 28.3101977,19.5294692 C28.2168207,19.35436 28.0734541,19.2109934 27.8983449,19.1176164 L11.9174575,10.5958117 L11.9174575,10.5958117 C11.4301305,10.3359447 10.8244101,10.5203374 10.5645431,11.0076644 C10.4873202,11.1524802 10.4469267,11.3140764 10.4469267,11.4781952 L10.4469267,16.4832702 L10.4469267,16.4832702 C10.4469267,16.902137 10.7079773,17.2766195 11.1009809,17.4215247 L18.0941743,20 L11.1009809,22.5784753 L11.1009809,22.5784753 C10.7079773,22.7233805 10.4469267,23.097863 10.4469267,23.5167298 L10.4469267,28.5218048 L10.4469267,28.5218048 C10.4469267,29.0740895 10.8946419,29.5218048 11.4469267,29.5218048 C11.6110455,29.5218048 11.7726418,29.4814113 11.9174575,29.4041883 Z"
                                  id="Shape"></path>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    import DialogMessage from "~/components/Cabinet/Common/Chat/DialogMessage.vue";
    import Echo from 'laravel-echo';
    import Pusher from 'pusher-js'

    export default {
        name: "Dialog",
        components: {
            "message": DialogMessage,
        },
        data() {
            return {
                messageBody: '',
                actualMessages: [],
                echo: null,
                userToInfo: {
                    name: '',
                    pic: ''
                }
            }
        },
        computed: {
            isConnected: {
                cache: false,
                get() {
                    return (this.echo && this.echo.connector.pusher.connection.connection !== null)
                }
            },
        },

        props: {
            messages: {
                default: function () {
                    return {}
                },
                type: Array,
                required: true
            },
        },
        methods: {
            typing(e) {
                if (e.keyCode === 13 && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            },
            setScrollBottom() {
                this.$refs.messagesHolder.scrollTop = 99999999;
            },
            handleScroll: function (evt, el) {
                if(this.$refs.messagesHolder) {
                    this.$refs.messagesHolder.scrollTop = 99999999;
                }
            },
            sendMessage() {
                if(!this.messageBody || this.messageBody.trim() === '') {
                    return
                }
                this.$axios({
                    method: 'post',
                    url: `/api/messages?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        recipient: +this.$route.params.id,
                        body: this.messageBody.trim()

                    }
                }).then((response) => {
                    this.messages.push({...response.data, user: this.$store.state.auth.user});
                    setTimeout(() => {
                        if(this.$refs.messagesHolder) {
                            this.$refs.messagesHolder.scrollTop = 99999999;
                        }
                    }, 100)
                })

                this.messageBody = null;
            },
        },
        mounted() {


            window.Echo.channel('App.User' + '.' + this.$store.state.auth.user.id)
                .listen('.newMessage', (message) => {
                    let messageInList = false;
                    // let reverseMessages =  this.messages;
                    // reverseMessages.reverse();
                    for(let i = 0; i < this.messages.length; i++) {

                        if(this.messages[i].id === message.message.id) {
                            messageInList = true;
                            return;
                        }
                    }
                    if(!messageInList) {
                        this.messages.push(message.message);

                    }
                });

            setTimeout(() => {
                if(this.$refs.messagesHolder) {
                    this.$refs.messageField.focus();
                }
            }, 1000)
            let messageHolders = [].slice.call(this.$el.querySelectorAll('.messages'));

            messageHolders.forEach((el) => {
                el.scrollTop = 999999999;
            });
            },
        updated() {
            if(this.$refs.messagesHolder) {
                this.$refs.messagesHolder.scrollTop = 99999999;
            }
            // this.setScrollBottom()
           // if(holder.scrollHeight > 0) {
           //     holder.scrollTop = holder.scrollHeight;
           // }
        },


        }

</script>

<style scoped>

</style>