<template>
    <div class="filter-tab filter-tab--centered" :class="{'filter-tab--popup': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closePopup"></div>
            <div class="filter-tab__name">Изменить событие</div>
        </div>
        <div class="filter-tab__items">
            <div class="form form--reg" >
                <div class="form__group">
                    <input type="text" v-model="changeEventInProcess.name" placeholder="Название" class="form__input input"/>
                </div>

                <div class="form__date date">
                    <div class="date__name">Дата события</div>
                    <div class="date__element-holder">
                        <div class="date__element">
                            <label for="day" class="date__element-label">
                                {{changeEventInProcess.selectedDate.day}}
                            </label>
                            <select name="day" id="day" v-model="changeEventInProcess.selectedDate.day">
                                <option disabled>День</option>
                                <option v-for="day in daysCount" :value="day" :key="day">{{day}}</option>
                            </select>
                        </div>

                        <div class="date__element">
                            <label for="month" class="date__element-label">
                                {{changeEventInProcess.selectedDate.month}}
                            </label>
                            <select name="month" id="month" v-model="changeEventInProcess.selectedDate.month">
                                <option disabled>Мес.</option>
                                <option v-for="(month, index) in date.months" :value="index + 1" :key="month">{{month}}
                                </option>
                            </select>
                        </div>
                        <div class="date__element">
                            <label for="year" class="date__element-label">
                                {{changeEventInProcess.selectedDate.year}}
                            </label>
                            <select name="year" id="year" v-model="changeEventInProcess.selectedDate.year">
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
                            <input :id="'tag' + index" name="vendor-type" :value="vendor.id" type="checkbox" class="select-tag__input" v-model="changeEventInProcess.needs">
                            <label :for="'tag' + index" class="select-tag__label"><span
                                    class="select-tag__type" v-text="vendor.title"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form__group form__group--white form__group--event">

                    <button class="form__button form__button--event button button--violet button--filter" @click.prevent="saveEvent">изменить</button>
                    <button class="form__button form__button--event button button--gray button--filter" @click.prevent="deleteEvent">удалить</button>
                </div>

            </div>
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
        name: "changeEvent",
        data() {
            return {
                changeEventInProcess: {
                    name: '',
                    selectedDate: {
                        day: '',
                        month: '',
                        year: ''
                    },
                    needs: []
                },

            }
        },
        props: {
            date: {
                default: function () {
                    return {}
                },
                type: Object
            },
            event: {
                default: function () {
                    return {}
                },
                type: Object
            }
        },
        computed: {
            daysCount: function () {
                const selectedDate = this.changeEventInProcess.selectedDate;
                if (selectedDate.month) {
                    return this.getDaysInMonths(selectedDate.month, selectedDate.year);
                } else {
                    return 0;
                }
            }
        },
        methods: {
            getDaysInMonths(month, year) {
                return new Date(year, month, 0).getDate();
            },
            closePopup() {
                this.$emit('eventChanging', false)
            },
            saveEvent() {
                let dataToSend = {};
                for(let key in this.changeEventInProcess) {
                    if (typeof this.changeEventInProcess[key] === "string") {
                        if (this.changeEventInProcess[key].length > 0) {

                            dataToSend[key] = this.changeEventInProcess[key];
                        }
                    } else if (typeof this.changeEventInProcess[key] === "object") {
                        if (key === 'selectedDate') {

                            let date = `${this.changeEventInProcess.selectedDate.year}-${this.changeEventInProcess.selectedDate.month > 9 ? this.changeEventInProcess.selectedDate.month : '0' + this.changeEventInProcess.selectedDate.month}-${this.changeEventInProcess.selectedDate.day > 9 ? this.changeEventInProcess.selectedDate.day : '0' + this.changeEventInProcess.selectedDate.day} 00:00`;
                            if (date.length > 0) {
                                dataToSend[key] = date;
                            }

                        } else if (key === 'needs') {

                            if (this.changeEventInProcess.needs.length > 0) {
                                dataToSend[key] = this.changeEventInProcess.needs;
                            }
                        }
                        // for (let dateElement in this.changeEventInProcess[key]) {
                        //     if(this.changeEventInProcess[key][dateElement].length > 0) {
                        //
                        //     }
                        // }
                    }
                }
                this.$axios({
                    method: 'patch',
                    url: `/api/client/events/${this.event.id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: dataToSend
                }).then((response) => {
                    console.log(response);
                    this.$emit('eventChanged', true);
                    this.closePopup();

                })
            },
            deleteEvent() {
                console.log('delete');
                this.$axios({
                    method: 'delete',
                    url: `/api/client/events/${this.event.id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                    }
                }).then((response) => {
                    console.log(response);
                    this.$emit('eventChanged', true);
                    this.closePopup();

                })
            }
        },
        created() {
            this.changeEventInProcess.name = this.event.name;
        }
    }
</script>
