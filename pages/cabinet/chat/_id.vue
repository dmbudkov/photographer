<template>
    <div class="wrapper cabinet-page">
    <div v-if="$store.state.auth.user" class="page-wrapper">
        <page-header class="page-header--cabinet-page"></page-header>
        <dialog-component :messages="dialogInfo" class="dialog--mobile"></dialog-component>
        <main class="main">
            <div class="main__background main__background--short">
                <div class="main__logo">
                    <svg width="268px" height="190px" viewBox="0 0 268 190" version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
                        <title>Combined Shape</title>
                        <desc>Created with Sketch.</desc>
                        <defs>
                            <linearGradient x1="139.039332%" y1="6.48995536%" x2="0%" y2="100%" id="linearGradient-1">
                                <stop stop-color="#00ADFF" offset="0%"></stop>
                                <stop stop-color="#06F6E1" offset="100%"></stop>
                            </linearGradient>
                            <linearGradient x1="3.00128483%" y1="98.0970982%" x2="136.164585%" y2="3.046875%"
                                            id="linearGradient-2">
                                <stop stop-color="#02DAB1" offset="0%"></stop>
                                <stop stop-color="#FF027D" offset="100%"></stop>
                            </linearGradient>
                            <path d="M0.00647789026,26.162599 C0.542118441,9.5577419 13.040398,3.48714899 13.040398,3.48714899 C26.9670523,-5.61874038 47.4999401,5.98680489 47.4999401,5.98680489 C47.4999401,5.98680489 227.122201,74.5487954 246.226714,83.4761379 C254.796962,87.5827155 260.867555,91.689293 263.902852,97.7598859 C267.652336,105.080307 267.295242,114.54329 267.295242,121.685164 C267.295242,134.540537 267.295242,222.271247 267.295242,244.23251 C267.295242,252.624212 265.68832,259.587539 262.831571,264.229757 C258.189353,271.550178 251.583119,273.69274 251.583119,273.69274 C251.583119,273.69274 49.4639554,372.967542 42.3220814,376.181385 C35.3587542,379.395228 24.1103027,382.609072 12.8618511,376.717026 C-0.707709511,369.575152 0.00647789026,363.863029 0.00647789026,353.863029 L0.00647789026,26.162599 Z M45.0415053,217.602384 C45.0415053,223.137336 45.2200522,326.044529 45.2200522,326.044529 C45.2200522,326.044529 44.5058648,332.472215 49.6837234,335.864606 C54.8615821,339.256996 59.8608939,335.686059 59.8608939,335.686059 C59.8608939,335.686059 226.980746,259.08946 235.015354,255.339976 C243.228509,251.411945 243.407056,243.912978 243.407056,239.092213 C243.407056,234.271448 243.407056,141.184332 243.407056,127.079131 C243.407056,112.97393 230.373136,117.794694 230.373136,117.794694 C219.481778,121.008538 210.911529,137.613395 193.949578,144.041081 C177.166175,150.468768 172.88105,142.43416 158.240208,147.969112 C143.599367,153.504065 135.921852,175.822421 114.317683,186.356685 C92.7135143,196.890949 76.8228447,182.250107 60.2179876,189.213435 C43.4345837,196.176762 45.0415053,212.067431 45.0415053,217.602384 Z"
                                  id="path-3"></path>
                        </defs>
                        <g id="main" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="фирменный-градиент">
                                <g>
                                    <g id="logo_min" transform="translate(0.000000, -45.000000)">
                                        <mask id="mask-4" fill="white">
                                            <use xlink:href="#path-3"></use>
                                        </mask>
                                        <g id="Combined-Shape" fill-rule="nonzero">
                                            <use fill="url(#linearGradient-1)" fill-rule="evenodd"
                                                 xlink:href="#path-3"></use>
                                            <use fill="url(#linearGradient-2)" fill-rule="evenodd"
                                                 xlink:href="#path-3"></use>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <!--vendor tabs-->
            <ul class="vendor-type vendor-type--cabinet vendor-type--in-tabs" ref="vendorTabs" v-if="$store.state.auth.user.type === 'vendor'">
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1" type="radio"/>-->
                <!--<label for="tab1" class="vendor-type__label">-->
                <!--Мои сообщения-->
                <!--</label>-->
                <!--</li>-->
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/chat/" class="vendor-type__label vendor-type__label--current">Мои
                        сообщения
                    </nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab3'}}"
                               class="vendor-type__label">Профиль
                    </nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab1'}}"
                               class="vendor-type__label">Лента событий
                    </nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab2'}}"
                               class="vendor-type__label">Мой календарь
                    </nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders/" class="vendor-type__label">Мои тендеры</nuxt-link>
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab4" class="vendor-type__input" v-model="openedTab" value="tab4" type="radio"/>-->
                <!--<label for="tab4" class="vendor-type__label">-->
                <!--Настройки-->
                <!--</label>-->
                <!--</li>-->
            </ul>
            <ul class="vendor-type vendor-type--cabinet vendor-type--in-tabs" v-else ref="vendorTabs">
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/chat/" class="vendor-type__label vendor-type__label--current">Мои
                        сообщения
                    </nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab1'}}"
                               class="vendor-type__label"> Быстрый подбор
                    </nuxt-link>
                    <!--<input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1" type="radio"/>-->
                    <!--<label for="tab1" class="vendor-type__label">-->
                    <!--Быстрый подбор-->
                    <!--</label>-->
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab2" class="vendor-type__input" v-model="openedTab" value="tab2" type="radio"/>-->
                <!--<label for="tab2" class="vendor-type__label">-->
                <!--Мои сообщения-->
                <!--</label>-->
                <!--</li>-->

                <!--<li class="vendor-type__item">-->
                    <!--<nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab3'}}"-->
                               <!--class="vendor-type__label"> Мои события-->
                    <!--</nuxt-link>-->
                    <!--&lt;!&ndash;<input name="vendor-type" id="tab3" class="vendor-type__input" v-model="openedTab" value="tab3" type="radio"/>&ndash;&gt;-->
                    <!--&lt;!&ndash;<label for="tab3" class="vendor-type__label">&ndash;&gt;-->
                    <!--&lt;!&ndash;Мои события&ndash;&gt;-->
                    <!--&lt;!&ndash;</label>&ndash;&gt;-->
                <!--</li>-->
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab4'}}"
                               class="vendor-type__label"> Профиль
                    </nuxt-link>
                    <!--<input name="vendor-type" id="tab4" class="vendor-type__input" v-model="openedTab" value="tab4" type="radio"/>-->
                    <!--<label for="tab4" class="vendor-type__label">-->
                    <!--Профиль-->
                    <!--</label>-->
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders/" class="vendor-type__label">Мои тендеры</nuxt-link>
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab5" class="vendor-type__input" v-model="openedTab" value="tab5" type="radio"/>-->
                <!--<label for="tab5" class="vendor-type__label">-->
                <!--Настройки-->
                <!--</label>-->
                <!--</li>-->
            </ul>
            <div class="tab-block tab-block--tenders">
                <!--vendor-tenders-->
                <div class="tab-block__item">
                    <div class="messages messages--inside">
                        <div class="messages__item-holder">
                            <div @click="selectDialog($event, chat.selfMessage ? chat.interlocutor : chat.user, chat.selfMessage ? chat.user_to : chat.user_id)" v-for="(chat, index) in $store.state.availableChats" :key="chat.id" class="messages__item chat-item" :class="{'chat-item--unread': !chat.selfMessage && !chat.read, 'chat-item--active': (chat.selfMessage && +chat.user_to === +$route.params.id) || (!chat.selfMessage && +chat.user_id === +$route.params.id)}">
                                <div class="chat-item__pic" v-if="chat.selfMessage ? !chat.interlocutor.profile_pic.length : !chat.user.profile_pic.length"></div>
                                <div v-else class="chat-item__pic" :style="{'background-image': `url(${chat.selfMessage ? chat.interlocutor.profile_pic : chat.user.profile_pic})`}"></div>
                                <div class="chat-item__right">
                                    <div class="chat-item__name" v-if="chat.selfMessage">
                                        {{chat.interlocutor.firstName}} {{chat.interlocutor.lastName}}
                                    </div>
                                    <div class="chat-item__name" v-else>
                                        {{chat.user.firstName}} {{chat.user.lastName}}
                                    </div>
                                    <div class="chat-item__message" v-text="chat.body.trim()">
                                    </div>
                                    <time class="chat-item__time" v-text="prettifyDate(chat.created_at)"></time>

                                </div>
                            </div>

                        </div>
                        <dialog-component :messages="dialogInfo" class="messages__dialog"></dialog-component>

                    </div>
                </div>
            </div>
        </main>
    </div>
        <page-footer v-if="$store.state.desktop"></page-footer>
    </div>
</template>
<script>
    import PageHeader from '~/components/PageHeader/PageHeaderCabinet.vue';
    import Dialog from '~/components/Cabinet/Common/Chat/Dialog.vue';
    import PageFooter from '~/components/PageFooter.vue';

    export default {

        name: "detailChat",
        components: {
            "page-header": PageHeader,
            'page-footer': PageFooter,
            "dialog-component": Dialog
        },
        asyncData({ params, error, store, query, app, redirect }) {
            if(!store.state.auth.loggedIn) {
                redirect('302', '/login/');
            }
        },
        data() {
            return {
                openedTab: 'tab3',
                dialogInfo: [],
                chats: [],
                interlocutorInfo: {},
                selectedChat: ''

            }
        },
        computed: {

        },
        methods: {

            selectDialog(event, interlocutor, userTo) {
                this.$store.commit({
                    type: 'setCurrentDialog',
                    userInfo: {name: `${interlocutor.firstName} ${interlocutor.lastName}`, userPic: interlocutor.profile_pic, userType: interlocutor.type, userProgress: interlocutor.hasOwnProperty('progress') ? interlocutor.progress : 0}
                })
                this.$router.push({path: `/cabinet/chat/${userTo}`})
            },
            getChats() {
                this.$axios({
                    method: 'get',
                    url: `/api/chats?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
                }).then((response) => {
                    this.chats = response.data;
                    let chats = this.$store.state.availableChats;
                    if(chats.length > 0) {
                        chats.concat(this.chats);
                    } else {
                        chats = this.chats;
                    }
                    this.$store.commit({
                        type: 'setAvailableChats',
                        chats: chats
                    })
                    for(let i = 0; i < this.chats.length; i++) {
                        if ((this.chats[i].selfMessage && +this.chats[i].user_to === +this.$route.params.id)) {;
                            this.$store.commit({
                                type: 'setCurrentDialog',
                                userInfo: {
                                    name: `${this.chats[i].interlocutor.firstName} ${this.chats[i].interlocutor.lastName}`,
                                    userPic: this.chats[i].interlocutor.profile_pic,
                                    userType: this.chats[i].interlocutor.type,
                                    userProgress: this.chats[i].interlocutor.hasOwnProperty('progress') ? this.chats[i].interlocutor.progress : 0
                                }
                            })
                        } else if ((!this.chats[i].selfMessage && +this.chats[i].user_id === +this.$route.params.id)) {
                            this.$store.commit({
                                type: 'setCurrentDialog',
                                userInfo: {
                                    name: `${this.chats[i].user.firstName} ${this.chats[i].user.lastName}`,
                                    userPic: this.chats[i].user.profile_pic,
                                    userType: this.chats[i].user.type,
                                    userProgress: this.chats[i].user.hasOwnProperty('progress') ? this.chats[i].user.progress : 0
                                }
                            })
                        }
                    }

                })
            },
          getMessages() {
              this.$axios({
                  method: 'get',
                  url: `/api/messages/${this.$route.params.id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
              }).then((response) => {
                  this.dialogInfo = response.data.sort((a, b) => {
                      return a.id - b.id;
                  });
              })
          },
          prettifyDate(date) {
                let correctDate = date;
                if(typeof date === "string") {
                    if (date.indexOf('.') > -1) {
                        correctDate = correctDate.replace(/[.]/g, '-');
                    }
                    correctDate = correctDate.split(" ").join("T");
                    correctDate = correctDate + "Z";
                }

                let resultDate = new Date(correctDate);

                let options = {
                    year: '2-digit',
                    month: 'short',
                    day: 'numeric',
                };
                resultDate = resultDate.toLocaleDateString('ru', options);
                resultDate = resultDate.substr(0, resultDate.length - 2);
                resultDate = resultDate.split(' ');
                const month = resultDate[1];
                const slash = '/' + resultDate[2];
                resultDate[1] = month;
                resultDate[2] = '';
                resultDate = resultDate.join(' ');
                return resultDate;
            },
          markMessagesRead() {
              this.$axios({
                  method: 'patch',
                  url: `/api/messages/${this.$route.params.id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                  data: {
                      messagesRead: 1
                      // token: `${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
                  }
              })
          }
        },
        created() {


            // window.Echo.join(`App.User.${this.$route.params.id}`)
            //     .here(users => {
            //         console.log('here', users);
            //     })
            //     .joining(user => {
            //         console.log('join', user);
            //     })
            //     .leaving(user => {
            //         console.log('leave', user);
            //     })
            this.getChats();
            this.getMessages();
            this.markMessagesRead();

        },


    }
</script>