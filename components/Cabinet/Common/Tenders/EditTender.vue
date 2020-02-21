<template>
    <div class="filter-tab filter-tab--centered filter-tab--tender" :class="{'filter-tab--popup': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closePopup"></div>
            <div class="filter-tab__name">Изменить тендер</div>
        </div>
        <div class="filter-tab__items">
            <form action="post" class="form form--tender" @submit.prevent="saveTender">
                <div class="form__group">
                    <input type="text" v-model="editTenderInProcess.name" placeholder="Название" class="form__input input"/>
                </div>
                <div class="form__group">
                    <div class="form__group-name">Мне нужен</div>
                    <no-ssr>
                        <multi-select :searchable="true" class="multiselect--searchable multiselect--tenders"
                                      :show-labels="false" v-model="editTenderInProcess.selectedSpeciality" track-by="title" label="title"  :placeholder="'Мне нужен'" :options="specialities"><span slot="noResult">Специальность не найдена</span></multi-select>
                    </no-ssr>
                </div>
                <div class="form__group">
                    <div class="form__group-name">Бюджет</div>
                    <input type="text" v-model="editTenderInProcess.sum" @keypress="isNumber($event)" class="input input--full-width input--price">
                </div>
                <div class="form__group">
                    <div class="form__group-name">Город</div>
                    <no-ssr>
                        <multi-select :searchable="true" class="multiselect--searchable multiselect--tenders"
                                      :show-labels="false" v-model="editTenderInProcess.citySelected" track-by="title" label="title" value="Город" placeholder="Выберите город" :options="cityList"><span slot="noResult">Город не найден</span></multi-select>
                    </no-ssr>
                </div>
                <div class="form__group-holder">
                    <div class="form__date date">
                        <div class="date__name">Окончание тендера</div>
                        <div class="date__element-holder">
                            <div class="date__element">
                                <label for="day" class="date__element-label">
                                    {{editTenderInProcess.finishDate.day}}
                                </label>
                                <select name="day" id="day" v-model="editTenderInProcess.finishDate.day">
                                    <option disabled>День</option>
                                    <option v-for="day in finishDaysCount" :value="day" :key="day">{{day}}</option>
                                </select>
                            </div>

                            <div class="date__element">
                                <label for="month" class="date__element-label">
                                    {{editTenderInProcess.finishDate.month}}
                                </label>
                                <select name="month" id="month" v-model="editTenderInProcess.finishDate.month">
                                    <option disabled>Мес.</option>
                                    <option v-for="(month, index) in date.months" :value="index + 1" :key="month">{{month}}
                                    </option>
                                </select>
                            </div>
                            <div class="date__element">
                                <label for="year" class="date__element-label">
                                    {{editTenderInProcess.finishDate.year}}
                                </label>
                                <select name="year" id="year" v-model="editTenderInProcess.finishDate.year">
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
                                <label for="day" class="date__element-label">
                                    {{editTenderInProcess.eventDate.day}}
                                </label>
                                <select name="day" id="day" v-model="editTenderInProcess.eventDate.day">
                                    <option disabled>День</option>
                                    <option v-for="day in eventDaysCount" :value="day" :key="day">{{day}}</option>
                                </select>
                            </div>

                            <div class="date__element">
                                <label for="month" class="date__element-label">
                                    {{editTenderInProcess.eventDate.month}}
                                </label>
                                <select name="month" id="month" v-model="editTenderInProcess.eventDate.month">
                                    <option disabled>Мес.</option>
                                    <option v-for="(month, index) in date.months" :value="index + 1" :key="month">{{month}}
                                    </option>
                                </select>
                            </div>
                            <div class="date__element">
                                <label for="year" class="date__element-label">
                                    {{editTenderInProcess.eventDate.year}}
                                </label>
                                <select name="year" id="year" v-model="editTenderInProcess.eventDate.year">
                                    <option disabled>Год</option>
                                    <option v-for="year in date.years" :value="year" :key="year">{{year}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form__group">
                    <div class="form__group-name"></div>
                    <textarea name="" id="" placeholder="Комментарий…" v-model="editTenderInProcess.comment" class="form__group-textarea textarea"></textarea>
                </div>
                <div class="form__group">

                    <button class="form__button button button--violet button--filter">Сохранить</button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    export default {
        name: "editTender",
        components: {
            'multi-select': Multiselect,
        },
        data() {
            return {
                editTenderInProcess: {
                    name: '',
                    eventDate: {
                        day: '',
                        month: '',
                        year: ''
                    },
                    finishDate: {
                        day: '',
                        month: '',
                        year: ''
                    },
                    needs: [],
                    sum: '',
                    comment: '',
                    citySelected: {},
                    selectedSpeciality: {}
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
            tenderInfo: {
                default: function () {
                    return {}
                },
                type: Object
            }
            // openCreatePopup: {
            //     default: function () {
            //         return {}
            //     },
            //     type: Boolean
            // },
        },
        computed: {
            eventDaysCount: function () {
                const selectedDate = this.editTenderInProcess.eventDate;
                if (this.editTenderInProcess.eventDate.month) {
                    return this.getDaysInMonths(selectedDate.month, selectedDate.year, 'eventDate');
                } else {
                    return 31;
                }
            },
            finishDaysCount: function () {
                const selectedFinishDate = this.editTenderInProcess.finishDate;
                if(this.editTenderInProcess.finishDate.month) {
                    return this.getDaysInMonths(selectedFinishDate.month, selectedFinishDate.year, 'finishDate');
                } else {
                    return 31;
                }
            }
        },
        watch: {
            editTenderInProcess: {
                handler: function (newVal) {
                    const selectedDate = newVal.finishDate;

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
            getDaysInMonths(month, year, type) {
                let daysCount = new Date(year, month, 0).getDate();
                if(type) {
                    if(this.editTenderInProcess[type].day > daysCount) {
                        this.editTenderInProcess[type].day = 1;
                    }
                }
                return daysCount;

            },
            closePopup() {
                this.$emit('tenderEdition', false)
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
            saveTender() {
                // if(this.dateVaild) {
                    this.$axios({
                        method: 'patch',
                        url: `/api/tenders/${this.tenderInfo.id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        data: {
                            name: this.editTenderInProcess.name,
                            eventDate: `${this.editTenderInProcess.eventDate.year}-${this.editTenderInProcess.eventDate.month}-${this.editTenderInProcess.eventDate.day}`,
                            sum: this.editTenderInProcess.sum,
                            finishDate: `${this.editTenderInProcess.finishDate.year}-${this.editTenderInProcess.finishDate.month}-${this.editTenderInProcess.finishDate.day}`,
                            need: [this.editTenderInProcess.selectedSpeciality.id],
                            city: this.editTenderInProcess.citySelected.id,
                            comment: this.editTenderInProcess.comment

                        }
                    }).then((response) => {
                        this.closePopup();
                    })
                // }
            },
        },
        created() {

            let finishDateArr = this.tenderInfo.finishDate.split('-');
            let eventDateArr = this.tenderInfo.eventDate.split('-');
            this.editTenderInProcess.name = this.tenderInfo.name;
            this.editTenderInProcess.comment = this.tenderInfo.comment;
            this.editTenderInProcess.sum = this.tenderInfo.sum;
            this.editTenderInProcess.finishDate.month = parseInt(finishDateArr[1]);
            this.editTenderInProcess.finishDate.day = parseInt(finishDateArr[2]);
            this.editTenderInProcess.finishDate.year = this.date.years[this.date.years.indexOf(parseInt(finishDateArr[0]))];
            this.editTenderInProcess.eventDate.month = parseInt(eventDateArr[1]);
            this.editTenderInProcess.eventDate.day = parseInt(eventDateArr[2]);
            this.editTenderInProcess.eventDate.year = this.date.years[this.date.years.indexOf(parseInt(eventDateArr[0]))];
            for(let i = 0; i < this.specialities.length; i++) {
                if(this.specialities[i].id === JSON.parse(this.tenderInfo.need)[0]) {
                        this.editTenderInProcess.selectedSpeciality = this.specialities[i]
                }
            }
            this.cityList.findIndex((el, ind, arr) => {
                if(el.id === this.tenderInfo.city.id) {
                    return this.editTenderInProcess.citySelected = this.cityList[ind];
                }
            })
        }
    }
</script>

<style scoped>

</style>