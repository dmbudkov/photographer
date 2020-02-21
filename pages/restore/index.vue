<template>
    <div class="filter-tab filter-tab--centered">
        <div class="filter-tab__top">
            <!--<div class="filter-tab__closer"></div>-->
            <div class="filter-tab__name">Смена пароля</div>
        </div>
        <div class="filter-tab__items">
            <form class="form form--change-password">
                <input type="password" placeholder="Новый пароль" v-model="password" class="form__input input input--profile"/>
                <input type="password" placeholder="Новый пароль повторно" v-model="passwordConfirmation" class="form__input input input--profile"/>
            </form>
        </div>
        <div class="filter-tab__button-holder">
            <div class="button button--violet" v-if="passwordsEqual" @click="recoverPass">Изменить</div>
            <!--<button class="button button&#45;&#45;violet">-->
            <!--Добавить фото-->
            <!--</button>-->
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                password: '',
                passwordConfirmation: ''
            }
        },
        computed: {
            passwordsEqual: function () {
                if (this.password === this.passwordConfirmation && (this.password.length && this.passwordConfirmation.length > 5)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {

            recoverPass() {
                this.$axios({
                    method: 'post',
                    url: '/api/restore/confirm/',
                    data: {
                        email: this.$route.query.email,
                        code: this.$route.query.code,
                        password_confirmation: this.passwordConfirmation,
                        password: this.password
                    }
                }).then((response) => {
                    // if(response ===)
                    this.passwordSent = true;
                    this.$auth.loginWith('local', {
                        data: {
                            email: this.$route.query.email,
                            password: this.password
                        }
                    }).then(res => {
                        this.$router.push('/cabinet/');
                    })
                })
            },
        },
    }

</script>