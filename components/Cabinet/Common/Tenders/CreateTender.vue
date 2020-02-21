<template>
    <div class="filter-tab filter-tab--centered filter-tab--tender" :class="{'filter-tab--popup': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closePopup"></div>
            <div class="filter-tab__name">Новый тендер</div>
        </div>
        <div class="filter-tab__items">
            <form action="post" class="form form--tender" @submit.prevent="createTender">
                <div class="form__group">
                    <input type="text" v-model="tenderData.name" placeholder="Название" class="form__input input"/>
                </div>
                <div class="form__group">
                    <div class="form__group-name">Мне нужен</div>
                    <no-ssr>
                        <multi-select
                                :searchable="false"
                                class="multiselect--searchable multiselect--tenders"

                                :show-labels="false"
                                :allow-empty="true"
                                v-model="tenderData.speciality"
                                track-by="title"
                                label="title" :placeholder="'Выберите специальность'"
                                :options="specialities" ><span slot="noResult">Специальность не найдена</span></multi-select>
                    </no-ssr>
                </div>
                <div class="form__group">
                    <div class="form__group-name">Бюджет</div>
                    <input type="text" v-model.number="tenderData.budget" @keypress="isNumber($event)" class="input input--full-width input--price">
                </div>
                <div class="form__group">
                    <div class="form__group-name">Город</div>
                    <no-ssr>
                        <multi-select :searchable="true" class="multiselect--searchable multiselect--tenders"
                                      :show-labels="false" v-model="tenderData.city" track-by="title" label="title" value="Город" placeholder="Выберите город" :options="cityList" ><span slot="noResult">Город не найден</span></multi-select>
                    </no-ssr>
                </div>
                <div class="form__group-holder">
                <div class="form__date date">
                    <div class="date__name">Окончание тендера</div>
                    <div class="date__element-holder">
                        <div class="date__element">
                            <label for="day" class="date__element-label" :class="{'date__element-label--selected': tenderData.finishDate.day}">
                                {{tenderData.finishDate.day || "День"}}
                            </label>
                            <select name="day" id="day" v-model="tenderData.finishDate.day">
                                <option disabled>День</option>
                                <option v-for="day in finishDaysCount" :value="day" :key="day">{{day}}</option>
                            </select>
                        </div>

                        <div class="date__element">
                            <label for="month" class="date__element-label" :class="{'date__element-label--selected': tenderData.finishDate.month}">
                                {{tenderData.finishDate.month || "Мес."}}
                            </label>
                            <select name="month" id="month" v-model="tenderData.finishDate.month">
                                <option disabled>Мес.</option>
                                <option v-for="(month, index) in date.months" :value="index + 1" :key="month">{{month}}
                                </option>
                            </select>
                        </div>
                        <div class="date__element">
                            <label for="year" class="date__element-label" :class="{'date__element-label--selected': tenderData.finishDate.year}">
                                {{tenderData.finishDate.year || "Год"}}
                            </label>
                            <select name="year" id="year" v-model="tenderData.finishDate.year">
                                <option disabled>Год</option>
                                <option v-for="year in date.years" :value="year" :key="year">{{year}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form__date date">
                    <div class="date__name">Дата события</div>
                    <div class="date__element-holder">
                        <div class="date__element">
                            <label for="day" class="date__element-label" :class="{'date__element-label--selected': tenderData.eventDate.day}">
                                {{tenderData.eventDate.day || "День"}}
                            </label>
                            <select name="day"  id="day" v-model="tenderData.eventDate.day">
                                <option selected disabled>День</option>
                                <option v-for="day in eventDaysCount" :value="day" :key="day">{{day}}</option>
                            </select>
                        </div>

                        <div class="date__element">
                            <label for="month" class="date__element-label" :class="{'date__element-label--selected': tenderData.eventDate.month}">
                                {{tenderData.eventDate.month || "Мес."}}
                            </label>
                            <select name="month" id="month" v-model="tenderData.eventDate.month">
                                <option disabled>Мес.</option>
                                <option v-for="(month, index) in date.months" :value="index + 1" :key="month">{{month}}
                                </option>
                            </select>
                        </div>
                        <div class="date__element">
                            <label for="year" class="date__element-label" :class="{'date__element-label--selected': tenderData.eventDate.year}">
                                {{tenderData.eventDate.year || "Год"}}
                            </label>
                            <select name="year" id="year" v-model="tenderData.eventDate.year">
                                <option disabled>Год</option>
                                <option v-for="year in date.years" :value="year" :key="year">{{year}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
                <div class="form__group">
                    <div class="form__group-name"></div>
                    <textarea name="" id="" v-model="tenderData.comment" placeholder="Комментарий…" class="form__group-textarea textarea"></textarea>
                </div>
                <div class="form__group">
                    
                    <button class="form__button button button--violet button--filter">Создать</button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    export default {
        name: "createTender",
        components: {
            'multi-select': Multiselect,
        },
        data() {
            return {
                tenderData: {
                    name: '',
                    finishDate: {
                        day: '',
                        month: '',
                        year: ''
                    },
                    eventDate: {
                        day: '',
                        month: '',
                        year: ''
                    },
                    comment: '',
                    budget: 0,
                    priceFormated: '',
                    city: null,
                    speciality: null,
                },
                citySelected: {},
                selectedSpeciality: {},
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
            cityList: {
                default: function () {
                    return {}
                },
                type: Array
            },
            specialities: {
                default: function () {
                    return {}
                },
                type: Array
            },
            // openCreatePopup: {
            //     default: function () {
            //         return {}
            //     },
            //     type: Boolean
            // },
        },
        computed: {
            eventDaysCount: function () {
                const selectedDate = this.tenderData.eventDate;
                if (this.tenderData.eventDate.month) {
                    return this.getDaysInMonths(selectedDate.month, selectedDate.year, 'eventDate');
                } else {
                    return 31;
                }
            },
            finishDaysCount: function () {
                const selectedFinishDate = this.tenderData.finishDate;
                if(this.tenderData.finishDate.month) {
                    return this.getDaysInMonths(selectedFinishDate.month, selectedFinishDate.year, 'finishDate');
                } else {
                    return 31;
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
            filterCities(query, id) {
                return this.cityList.filter(city => {
                    return city.title.toLowerCase().indexOf(query.toLowerCase()) === 0;
                })
            },
            isNumber(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();;
                } else {
                    return true;
                }
            },
            getDaysInMonths(month, year, type) {
                let daysCount = new Date(year, month, 0).getDate();
                    if(type) {
                        if(this.tenderData[type].day > daysCount) {
                            this.tenderData[type].day = 1;
                        }
                    }
                    return daysCount;

                },
            closePopup() {
                this.$emit('tenderCreation', false)
            },
            formatPrice(event) {

                let value = event.target.value.replace(/[^\d]/, '');
                let dirtyVal = value.replace(/ /g, '');
                let val = (+dirtyVal / 1).toFixed(0).replace('.', ' ');
                    if (val === "NaN") {
                        this.tenderData.budget = 0;
                    } else {
                        this.tenderData.priceFormated = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    }


            },
            createTender() {
                // if(this.dateVaild) {
                this.$axios({
                    method: 'post',
                    url: `api/tenders/?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        name: this.tenderData.name,
                        need: [this.tenderData.speciality.id],
                        sum: this.tenderData.budget,
                        city: this.tenderData.city.id,
                        finishDate: `${this.tenderData.finishDate.year}-${this.tenderData.finishDate.month}-${this.tenderData.finishDate.day}`,
                        eventDate: `${this.tenderData.eventDate.year}-${this.tenderData.eventDate.month}-${this.tenderData.eventDate.day}`,
                        comment: this.tenderData.comment

                    }
                }).then((response) => {
                    this.$emit('eventCreated', true);
                    this.closePopup();
                })
                // }
            },
        }
    }
</script>

<style scoped>

</style>