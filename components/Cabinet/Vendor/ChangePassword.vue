<template>
    <div class="filter-tab filter-tab--centered" :class="{'filter-tab--desktop': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="showChangePassword"></div>
            <div class="filter-tab__name">Смена пароля</div>
        </div>
        <div class="filter-tab__items">
            <form class="form form--change-password">
                <input type="text" placeholder="Старый пароль" v-model="oldPass" class="form__input input input--profile"/>
                <input type="text" placeholder="Новый пароль" v-model="newPass" class="form__input input input--profile"/>
                <input type="text" placeholder="Новый пароль повторно" v-model="newPassRepeat" class="form__input input input--profile"/>
            </form>
        </div>
        <div class="filter-tab__button-holder">
            <div class="button button--violet" @click="changePassword">Изменить</div>
            <!--<button class="button button&#45;&#45;violet">-->
            <!--Добавить фото-->
            <!--</button>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VendorChangePassowrd',
        components: {
        },
        props: {
//            showGallery: {
//                default: false,
//                type: Boolean
//            }
        },
        data() {
            return {
                oldPass: '',
                newPass: '',
                newPassRepeat: '',

            }
        },
        methods: {
            changePassword() {
                this.$axios({
                    method: 'post',
                    url: '/api/changepassword',
                    data: {
                        password: this.newPass,
                        password_confirmation: this.newPassRepeat,
                        oldPassword: this.oldPass,
                        token: this.$auth.$storage['_state']['_token.local'].split(' ')[1]
                    }
                }).then((response) => {
                    console.log(response);
                    // if(response ===)
                });
            },
            showChangePassword() {
                this.$emit('showChangePassword', {
                    showChangePassword: false
                });
            },
        },
    }
</script>