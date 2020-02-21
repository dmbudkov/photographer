<template>
    <div class="filter-tab filter-tab--centered filter-tab--hot-events" :class="{'filter-tab--popup': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__back back back--black" v-if="!$store.state.desktop" @click="showHotEvents"></div>
            <div class="filter-tab__closer" v-if="$store.state.desktop" @click="showHotEvents"></div>
            <div class="filter-tab__name">Горящие даты</div>
        </div>
        <div class="filter-tab__items">
            <div class="events events--buy">
                <div class="events__list">
                    <div class="events__item message-item message-item--buy" @click="createOrder(1, 30000)">
                        <div class="message-item__name">Купить 1 горящее</div>
                        <div class="message-item__right">
                            <span class="message-item__price"> 300</span>
                            <!--<span class="message-item__price"> Недоступно</span>-->
                            <span class="message-item__currency">₽</span>
                        </div>
                    </div>
                    <div class="events__item message-item message-item--buy" @click="createOrder(2, 25000)">
                        <div class="message-item__name">Купить 2 горящих</div>
                        <div class="message-item__right">
                            <span class="message-item__price"> 500</span>
                            <!--<span class="message-item__price"> Недоступно</span>-->
                            <span class="message-item__currency">₽</span>
                        </div>
                    </div>
                    <div class="events__item message-item message-item--buy" @click="createOrder(5, 24000)">
                        <div class="message-item__name">Купить 5 горящих</div>
                        <div class="message-item__right">
                            <span class="message-item__price"> 1200</span>
                            <!--<span class="message-item__price"> Недоступно</span>-->
                            <span class="message-item__currency">₽</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter-tab__text">
                <h3>Что такое горящие даты?</h3>
                <p>Это Ваш помощник. «Сорвалась» дата, а до мероприятия остались считанные дни? Делайте «горящее предложение».</p>
                <p>Это дополнительные показы Вашей страницы, это привлечение большего внимания клиента, это инструмент, который поможет Вам продать.
                </p>
                <p>Сезон в разгаре, но «заколдованная суббота» так и осталась свободной? Ну Вы, поняли — делайте «горящее предложение».
                </p>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'VendorHotDates',
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

            }
        },
        methods: {
            showHotEvents() {
                this.$emit('showHotEvents', {
                    showHotEvents: false
                });
            },
            createOrder(quantity, pricePerOne) {
                const amount = +(pricePerOne*quantity);
                this.$axios({
                    method: 'post',
                    url: '/api/pay/tinkoff/',
                    data: {
                        email: this.$store.state.auth.user.email,
                        userId: this.$store.state.auth.user.id,
                        Taxation: 'usn_income',
                        items: [{
                                Name: `Горящие даты ${quantity} шт`,
                                Price: +pricePerOne,
                                Quantity: +quantity,
                                Amount: amount,
                                Tax: "vat10",
                            }],
                    }
                }).then((response) => {
                    window.location = response.data.PaymentURL;
                })
            }

        },
        created() {


        },
        mounted() {

        }
    }
</script>