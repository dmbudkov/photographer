<template>
    <div class="messages__item message-item message-item--dialog">

        <div class="message-item__pic" v-if="$store.state.currentDialogInfo.userType === 'client' && +$store.state.currentDialogInfo.userProgress === 100" :style="{'background-image': `url(${messageInfo.user.profile_pic || '/app-icons/icon__user-def.svg'})`}"></div>
        <nuxt-link v-else :to="`/catalog/vendor/${$route.params.id}`" target="_blank" class="message-item__pic" :style="{'background-image': `url(${messageInfo.user.profile_pic || '/app-icons/icon__user-def.svg'})`}"></nuxt-link>
        <div class="message-item__right">
            <div class="message-item__top">
                <div class="message-item__name" v-text="messageInfo.user.firstName">

                </div>
                <time class="message-item__time" v-text="prettifyDate(messageInfo.created_at)">сегодня в 18:15</time>
            </div>
            <div class="message-item__message" v-text="messageInfo.body">Жанне Павловне низкий поклон от меня. Смею спросить, как прошло сегодняшнее гуляние?</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DialogMessage",
        props: {
            messageInfo: {
                type: Object,
                default: function () {
                        return {}
                }
            }
        },
        methods: {
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
                // resultDate = resultDate.getMilliseconds() + 3*60*1000;
                // resultDate = new Date(resultDate);
                // console.log('res date', resultDate + );
                let options = {
                    year: '2-digit',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                resultDate = resultDate.toLocaleDateString('ru', options);
                resultDate = resultDate.split(' ');
                resultDate = `${resultDate[0]} ${resultDate[1]} ${resultDate[resultDate.length - 1]}`;
                return resultDate;
            },
            // prettifyDate(chat.created_at)
        },
        updated() {

        }
    }
</script>
