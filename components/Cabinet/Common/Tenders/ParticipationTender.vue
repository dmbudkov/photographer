<template>
    <div class="popup popup--white">
        <button class="popup__closer" @click="closePopup"></button>
        <div class="popup__inner">

            <h6 class="popup__title">Поздравляем!</h6>
            <p class="popup__text">Ваш аккаунт попал в список потенциальных исполнителей.                Если заказчик ответит на ваше сообщение — вы сможете продолжить беседу</p>
            <nuxt-link to="/catalog/1/filter_" class="popup__button button button--aqua">Перейти в каталог</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ParticipationTender",
        data() {
            return {}
        },
        methods: {
          closePopup() {
              this.$emit('showPopup', false);
          }
        }
    }
</script>

<style scoped>

</style>