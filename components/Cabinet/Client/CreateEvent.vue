<template>
    <div class="filter-tab filter-tab--centered" :class="{'filter-tab--popup': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closePopup"></div>
            <div class="filter-tab__name">Новое событие</div>
        </div>
        <div class="filter-tab__items">
            <form action="post" class="form form--reg form--event" @submit.prevent="createEvent">
                <div class="form__group">
                    <input type="text" v-model="createEventInProcess.name" placeholder="Название" class="form__input input"/>
                </div>

                <div class="form__date date">
                    <div class="date__name">Дата события</div>
                    <div class="date__element-holder">
                        <div class="date__element">
                            <label for="day" class="date__element-label">
                                {{createEventInProcess.selectedDate.day}}
                            </label>
                            <select name="day" id="day" v-model="createEventInProcess.selectedDate.day">
                                <option disabled>День</option>
                                <option v-for="day in daysCount" :value="day" :key="day">{{day}}</option>
                            </select>
                        </div>

                        <div class="date__element">
                            <label for="month" class="date__element-label">
                                {{createEventInProcess.selectedDate.month}}
                            </label>
                            <select name="month" id="month" v-model="createEventInProcess.selectedDate.month">
                                <option disabled>Мес.</option>
                                <option v-for="(month, index) in date.months" :value="index + 1" :key="month">{{month}}
                                </option>
                            </select>
                        </div>
                        <div class="date__element">
                            <label for="year" class="date__element-label">
                                {{createEventInProcess.selectedDate.year}}
                            </label>
                            <select name="year" id="year" v-model="createEventInProcess.selectedDate.year">
                                <option disabled>Год</option>
                                <option v-for="year in date.years" :value="year" :key="year">{{year}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form__group form__group--no-border">
                    <div class="form__group-name">Мне нужны</div>
                    <div class="select-tags">
                        <div class="select-tags__item select-tag" v-for="(vendor, index) in $store.state.specialities" :key="index">
                            <input :id="'tag' + index" name="vendor-type" :value="vendor.id" type="checkbox" class="select-tag__input" v-model="createEventInProcess.needs">
                            <label :for="'tag' + index" class="select-tag__label"><span
                                    class="select-tag__type" v-text="vendor.title"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form__group form__group--white">

                    <button class="form__button button button--violet button--filter">Создать</button>
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
        name: "createEvent",
        data() {
            return {
                createEventInProcess: {
                    name: '',
                    selectedDate: {
                        day: '',
                        month: '',
                        year: ''
                    },
                    needs: []
                },
                dateVaild: false

            }
        },
        props: {
            date: {
                default: function () {
                    return {}
                },
                type: Object
            },
            openCreatePopup: {
                default: function () {
                    return {}
                },
                type: Boolean
            },
        },
        computed: {
            daysCount: function () {
                const selectedDate = this.createEventInProcess.selectedDate;
                if (this.createEventInProcess.selectedDate.month) {
                    return this.getDaysInMonths(selectedDate.month, selectedDate.year);
                } else {
                   return 0;
                }
            }
        },
        watch: {
            createEventInProcess: {
                handler: function (newVal) {
                    const selectedDate = newVal.selectedDate;

                    const selectedDateFormatted = new Date(`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`);
                    let currentTime = new Date();

                    if(selectedDateFormatted > currentTime) {
                            this.dateVaild = true;
                    }

                    // currentTime = currentTime.toLocaleDateString('ru', options);
                    // console.log(currentTime)
                    // if(selectedDate)
                },
                deep: true
          }
        },
        methods: {
            getDaysInMonths(month, year) {
                return new Date(year, month, 0).getDate();
            },
            closePopup() {
                this.$emit('eventCreation', false)
            },
            createEvent() {
                if(this.dateVaild) {
                    this.$axios({
                        method: 'post',
                        url: `/api/client/events/?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        data: {
                            name: this.createEventInProcess.name,
                            date: `${this.createEventInProcess.selectedDate.year}-${this.createEventInProcess.selectedDate.month}-${this.createEventInProcess.selectedDate.day}`,
                            needs: this.createEventInProcess.needs
                        }
                    }).then((response) => {
                        this.$emit('eventCreated', true);
                        this.closePopup();
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>