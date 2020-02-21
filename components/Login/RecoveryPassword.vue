<template>
    <div class="filter-tab filter-tab--centered filter-tab--popup">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closePopup"></div>
            <div class="filter-tab__name">Смена пароля</div>
        </div>

        <div  class="filter-tab__items">
            <div v-if="passwordSent" class="filter-tab__text">
                <p>На указанный адрес электронной почты, выслано сообщение, содержащее ссылку для смены пароля. Войдите в почтовый ящик и перейдите по ссылке, указанной в письме. </p>
                <div @click="closePopup" class="form__button button button--violet">хорошо</div>
            </div>
            <form v-else class="form form--change-password" @submit.prevent="recoverPass">
                <div class="form__description">
                    <p>Введите адрес электронной почты, который был указан вами при регистрации, и мы вышлем вам ссылку на изменение пароля.</p>
                </div>
                <div class="form__group form__group--recovery">
                <input
                        type="email"
                        placeholder="e-mail"
                        v-model="email"
                        class="form__input input input--profile"
                        :class="{'input--error': dataSent && !passwordSent}"
                />
                <span class="form__input-error" v-if="dataSent && !passwordSent">Указанный e-mail не найден</span>
                </div>
                <button class=" form__button button button--violet">Отправить</button>
            </form>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                email: '',
                passwordSent: false,
                dataSent: false
            }
        },
        methods: {
            recoverPass() {
                this.$axios({
                    method: 'post',
                    url: '/api/restore/',
                    data: {
                        email: this.email
                    }
                }).then((response) => {
                    if(response.data.result === 'ok') {
                        this.passwordSent = true;
                    } else {
                        this.dataSent = true;
                    }
                    // this.closePopup();
                })
            },
            closePopup() {
                this.$emit('closePopup', false);
            }
        }
    }

</script>