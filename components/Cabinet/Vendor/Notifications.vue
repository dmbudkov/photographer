<template>
    <div class="filter-tab filter-tab--centered filter-tab--notifications" :class="{'filter-tab--desktop': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__back back back--black" @click="showNotifications"></div>
            <div class="filter-tab__name">Уведомления</div>
        </div>
        <div class="filter-tab__items">
            <form action="" class="form form--reg">
                <div class="events__list">
                    <div class="events__item message-item message-item--notifications">
                        <div class="message-item__right">
                            <div class="message-item__name">
                                Новое сообщение
                            </div>
                        </div>
                        <div class="message-item__checkbox checkbox checkbox--ios">
                            <input class="checkbox__input" id="test" type="checkbox"/>
                            <label class="checkbox__label" for="test"></label>
                        </div>

                    </div>

                </div>

            </form>
            <!--<div class="filter-tab__section">-->
            <!--<div class="filter-tab__section -name">Город</div>-->
            <!--<multi-select :searchable="true" class="multiselect&#45;&#45;searchable"-->
            <!--:show-labels="false" v-model="citySelected" track-by="name" label="name" value="Город" placeholder="Выберите город" :options="cityList"></multi-select>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
            }
        },
        methods: {
            showNotifications() {
                this.$emit('showNotifications', {
                    showNotifications: false
                });
            },
        },
        created() {
            if(this.$store.state.auth.loggedIn) {
            }
        }
    }

</script>