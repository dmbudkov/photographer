<template>
    <div class="main-filter main-filter--cabinet">
        <form action="" novalidate class="main-filter__form" @submit.prevent="sendFilter">
            <transition name="fade">
                <no-ssr>
                    <multiselect class="main-filter__vendor multiselect multiselect--cabinet" v-model="vendorValue"
                                 :options="$store.state.specialities"
                                 :searchable="false"
                                 :show-labels="false"
                                 label="title"></multiselect>
                </no-ssr>
            </transition>
            <transition name="fade">
                <div class="main-filter__date-picker">
                    <div class="popup-overlay" v-if="$store.state.desktop && isOpen"></div>
                    <main-calendar class="datepicker--cabinet-filter" @fromDate="fromDate($event);" @calendarActivity="handleCalendarActivity($event);"
                                   @toDate="toDate($event);">
                    </main-calendar>
                    <div class="main-filter__date-title">Диапазон дат</div>
                </div>
            </transition>

            <!--radio buttons-->

            <transition name="fade">
                <div class="main-filter__radio-buttons">
                    <div class="main-filter__radio radio-button radio-button--short" v-for="price in availablePrices" :key="price.id">
                        <input :id="price.code" v-model="costPer" :value="price.code" name="costPer" type="radio"
                               class="radio-button__input"/>
                        <label :for="price.code" class="radio-button__label" v-text="price.title">
                        </label>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <!--range-slider-->
                <div class="main-filter__range range-prices range-prices--main range-prices--cabinet">
                    <h6 class="range-prices__title">Ценовой диапазон</h6>
                    <div class="range-prices__holder">
                        <div class="range-prices__item" v-if="priceRange[1]">
                            <input
                                    type="tel"
                                    class="input"
                                    pattern='[0-9]'
                                    data-price="from"
                                    :placeholder="prettifyPrice(priceRange[0]) + ' ₽'"
                                    @keyup="formatPrice($event)"
                                    @blur="checkPrice($event)"
                            />
                            <label class="range-prices__item-label">от</label>
                        </div>
                        <div class="range-prices__item" v-if="priceRange[1]">
                            <input
                                    type="tel"
                                    class="input"
                                    pattern='[0-9]'
                                    data-price="to"
                                    @keyup="formatPrice($event)"
                                    :placeholder="prettifyPrice(priceRange[1]) + ' ₽'"
                                    @blur="checkPrice($event)"
                            />
                            <label class="range-prices__item-label">до</label>
                        </div>
                    </div>
                </div>
            </transition>
            <button style="display: block; text-align: center;"
                    class="main-filter__button button button--violet button--main">Начать поиск
            </button>
        </form>
    </div>
</template>

<script>
    import NoSSR from 'vue-no-ssr';
    import Multiselect from 'vue-multiselect'
    import MainCalendar from "~/components/MainFilterElements/MainFilterCalendar.vue";
    import MaskedInput from 'vue-text-mask';
    let components = {

        Multiselect,
        MaskedInput,
        "no-ssr": NoSSR,
        'main-calendar': MainCalendar,
    };
    if (process.browser) {
//    import vueSlider from 'vue-slider-component';
        const vSelect = require('vue-select');
        const vueSlider = require('vue-slider-component');
        components['vueSlider'] = vueSlider;
        components['vSelect'] = vSelect;
    }
    export default {
        components,
        name: "FastFilter",
        data() {
            return {
                vendorValue: this.$store.state.specialities[0],
                vendorsList: [],
                costPer: 'full',
                priceRange: [],
                isOpen: false,
                availablePrices: [],
                selectedDate: '',
                configPicker: {
                    altInput: false,
                    dateFormat: "d.m.Y",
                    locale: "ru",
                    allowInput: true
                },
                date: {
                    from: '',
                    to: ''
                },
                priceFrom: '',
                priceTo: '',
            }
        },
        watch: {
            priceTo: this.formatPrice,
        },
        methods: {
            checkPrice(event) {
                let priceType = event.target.getAttribute('data-price');
                if(priceType === 'from') {
                    if(this.priceFrom < this.priceRange[0] || this.priceFrom > this.priceRange[1]) {
                        event.target.value = this.priceRange[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        this.priceFrom = this.priceRange[0];
                    }
                } else if(priceType === 'to') {
                    if(this.priceTo > this.priceRange[1] || this.priceTo < this.priceRange[0]) {
                        event.target.value = this.priceRange[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        this.priceTo = this.priceRange[1];
                    }
                }
            },
            fromDate(dateFrom) {
                this.date.from = dateFrom;
            },
            toDate(dateTo) {
                this.date.to = dateTo;
            },
            handleCalendarActivity(data) {
                this.isOpen = data;
            },
            prettifyPrice(value) {
                let val = (value/1).toFixed(0).replace('.', ' ');
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            },

            formatPrice(event) {



                let value = event.target.value.replace(/[^\d]/, '');
                let dirtyVal = value.replace(/ /g,'');
                let val = (+dirtyVal/1).toFixed(0).replace('.', ' ');
                let priceType = event.target.getAttribute('data-price');
                if(priceType === 'from') {
                    this.priceFrom = val;
                } else {
                    this.priceTo = val;
                }
                if (val === "NaN") {
                    event.target.value = 0;
                } else {
                    event.target.value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                }
                // }


            },
            getSpecialities() {
                this.$axios({
                    method: 'get',
                    url: '/api/vendor/specialities'
                }).then((response) => {
                    this.vendorValue = response.data[0];
                })
            },
            getSpecPrices(specialityId) {

                this.$axios({
                    method: 'get',
                    url: `api/catalog/prices?speciality=${this.vendorValue.id}&city=${this.$store.state.userCity.id || 3}`
                }).then((response) => {
                    this.availablePrices = response.data;
                    if(this.availablePrices.length > 0) {
                        this.costPer = this.availablePrices[0].code;
                    }
                    if(this.priceRange.length === 0) {
                        this.priceRange[0] = this.availablePrices[0].minPrice;
                        this.priceRange[1] = this.availablePrices[0].maxPrice;
                    }
                    for(let i = 0; i < this.availablePrices.length; i++) {
                        if(this.availablePrices[i].code === this.costPer) {
                            this.priceRange[0] = this.availablePrices[i].minPrice;
                            this.priceRange[1] = this.availablePrices[i].maxPrice;
                        }
                    }
                })
            },
            sendFilter() {
                if(!this.priceFrom) {
                    this.priceFrom = this.priceRange[0];
                }
                if(!this.priceTo) {
                    this.priceTo = this.priceRange[1];
                }
                this.$router.push({path: '/catalog/' + this.vendorValue.id + '/filter_',
                    query: {
                        priceType: this.price.type,
                        priceFrom: this.priceFrom,
                        priceTo: this.priceTo,
                        dateFrom: this.date.from,
                        dateTo: this.date.to,
                        city: this.$store.state.userCity.id,
                        mainPage: true
                    }})
            }
        },
        computed: {
            price: function () {
                return {
                    type: this.costPer
                }
            },
        },
        watch: {
            vendorValue: function (value) {
                this.getSpecPrices(value.id);

            },
            costPer: {
                handler: function(newValue) {

                    for(let i = 0; i < this.availablePrices.length; i++) {
                        if(this.availablePrices[i].code === newValue) {
                            this.priceRange[0] = this.availablePrices[i].minPrice;
                            this.priceRange[1] = this.availablePrices[i].maxPrice;
                        }
                    }

                },
            }
        },
        created() {
            this.getSpecialities();
            this.$store.watch((state) => {
                    return this.$store.getters.getUserCityId
                },
                (id) => {
                    this.getSpecPrices();
                })
        },
    }
</script>

<style scoped>

</style>