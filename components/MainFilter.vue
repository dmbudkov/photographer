<template>
    <div class="main-filter" :style="{'background-image': `url(${banner.image})`}">
        <h2 class="main-filter__title">
            Начини свой праздник
        </h2>
        <form action="" novalidate class="main-filter__form" @submit.prevent="sendFilter">
            <no-ssr>
                <city-choice  class="main-filter__city city-select--filter"></city-choice>
            </no-ssr>
         <transition name="fade">
             <no-ssr>
                <multiselect class="main-filter__vendor multiselect--main"
                             v-model="vendorValue"
                             :options="$store.state.specialities"
                             :searchable="false"
                             :show-labels="false"
                             :allow-empty="true"
                             :placeholder="'Мне нужен'"
                             ref="specialitySelect"
                             label="title"
                             @close="closeSelect"
                             @open="openSelect"
                            >

                </multiselect>
            </no-ssr>
         </transition>
            <!--<transition name="fade">-->
            <!--<div class="main-filter__date-picker">-->
                <!--<div class="popup-overlay" v-if="$store.state.desktop && isOpen"></div>-->
            <!--<main-calendar  @fromDate="fromDate($event);" @calendarActivity="handleCalendarActivity($event);" @toDate="toDate($event);">-->
            <!--</main-calendar>-->
                <!--<div class="main-filter__date-title">Диапазон дат</div>-->
            <!--</div>-->
            <!--</transition>-->

            <!--radio buttons-->

        <transition name="fade">
            <div class="main-filter__radio-buttons" v-if="availablePrices.length > 0">
                <div class="main-filter__radio radio-button" v-for="price in availablePrices" :key="price.id">
                    <input :id="price.code" v-model="costPer" :value="price.code" name="costPer" type="radio" class="radio-button__input"/>
                    <label :for="price.code" class="radio-button__label" v-text="price.title">
                </label>
                </div>
            </div>
            <div class="main-filter__radio-buttons main-filter__radio-buttons--fake" v-else>
                <div class="main-filter__radio radio-button radio-button--disabled">
                    <input name="costPer" id="costPerDay" type="radio" class="radio-button__input" disabled/>
                    <label for="costPerDay" class="radio-button__label">
                        За день
                    </label>
                </div>
                <div class="main-filter__radio radio-button radio-button--disabled">
                    <input name="costPer" id="costPerHour" type="radio" class="radio-button__input" disabled/>
                    <label for="costPerHour" class="radio-button__label">
                        За час
                    </label>
                </div>
            </div>
        </transition>
            <transition name="fade">
            <!--range-slider-->
            <div class="main-filter__range range-prices range-prices--main">
                <h6 class="range-prices__title">Ценовой диапазон</h6>
                <div class="range-prices__holder">
                <div class="range-prices__item" v-if="priceRange[1]" >
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
                    <div class="range-prices__item range-prices__item--disabled" v-else >
                        <input disabled type="text" class="input"
                        />
                        <label class="range-prices__item-label">от</label>
                    </div>
                <div class="range-prices__item" v-if="priceRange[1]" >
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
                    <div class="range-prices__item range-prices__item--disabled" v-else >
                        <input disabled type="text" class="input"
                        />
                        <label class="range-prices__item-label">до</label>
                    </div>
                </div>
            </div>
          </transition>
            <button style="display: block; text-align: center;"  class="main-filter__button button button--violet button--main">Начать поиск</button>
        </form>
        <nuxt-link :to="`catalog/vendor/${banner.authorId}`" v-if="banner.authorId" class="main-filter__description banner-description">
            <span class="banner-description__name">{{banner.authorName}}</span>
            <span class="banner-description__spec">{{banner.authorSpeciality}}</span>
        </nuxt-link>
    </div>
</template>


<script>
    import NoSSR from 'vue-no-ssr';
    import Multiselect from 'vue-multiselect'
    import MainCalendar from "~/components/MainFilterElements/MainFilterCalendar.vue";
    import MaskedInput from 'vue-text-mask';
    import CityChoice from "~/components/PageHeaderItems/TheCityChoice.vue"
    //    import vSelect from 'vue-select';
//    import flatPickr from 'vue-flatpickr-component';
    let components = {

        Multiselect,
        MaskedInput,
        "no-ssr": NoSSR,
        'main-calendar': MainCalendar,
        'city-choice': CityChoice
    };
    if (process.browser) {
//    import vueSlider from 'vue-slider-component';
        const vSelect = require('vue-select');
        const vueSlider = require('vue-slider-component');
        components['vueSlider'] = vueSlider;
        components['vSelect'] = vSelect;
    }

//    import vueSlider from 'vue-slider-component';
    import 'flatpickr/dist/flatpickr.css';
    import Ru from 'flatpickr/dist/l10n/ru.js';
    export default {
        components,
        name: "MainFilter",
        data() {
            return {
                vendorValue: null,
                vendorsList: [],
                costPer: 'full',
                priceRange: [],
                isOpen: false,
                availablePrices: [],
                banner: {
                  image: '',
                  authorName: '',
                  authorSpeciality: '',
                  authorId: null
                },
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
                rangeSliderOptions: {
                   selectedDate: '',
                   width: "100%",
                   height: 3,
                   dotSize: 27,
                   interval: 100,
                   realTime: true,
                   disabled: false,
                   show: true,
                   tooltip: false,
                   tooltipDir: [
                       "top",
                       "top",
                   ],
                   processStyle: {
                       "backgroundColor": "#02CFB6"
                   },
                   sliderStyle: {
                      "paddingLeft": "0px",
                      "paddingRight": "0px"
                   },
                   bgStyle: {
                       "backgroundColor": "#889FBC"
                   }
               }
            }
        },
        watch: {
            priceTo: this.formatPrice,
        },
        methods: {
            closeSelect(value, id) {
                if(!this.$refs.specialitySelect.$refs.list.classList.contains('multiselect__content-wrapper--closed')) {
                    this.$refs.specialitySelect.$refs.list.classList.add('multiselect__content-wrapper--closed');
                }
            },
            openSelect(value, id) {
                if(this.$refs.specialitySelect.$refs.list.classList.contains('multiselect__content-wrapper--closed')) {
                    this.$refs.specialitySelect.$refs.list.classList.remove('multiselect__content-wrapper--closed');
                }
            },
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
            // getSpecialities() {
            //     this.$axios({
            //         method: 'get',
            //         url: '/api/vendor/specialities'
            //     }).then((response) => {
            //         this.vendorValue = response.data[0];
            //     })
            // },
            getBanner() {
                this.$axios({
                    method: 'get',
                    url: '/api/mainpagesliers/'
                }).then((resp) => {
                    let response = resp.data[0];
                    this.banner.image = response.photo;
                    this.banner.authorName = `${response.vendor.firstName} ${response.vendor.lastName}`;
                    this.banner.authorSpeciality = response.vendor.speciality.title;
                    this.banner.authorId = response.vendor.id;
                })
            },
            getSpecPrices(specialityId) {
               // if(specialityId) {
                   this.$axios({
                       method: 'get',
                       url: `api/catalog/prices?speciality=${this.vendorValue.id}&city=${this.$store.state.userCity.id || 3}`
                   }).then((response) => {
                       this.availablePrices = response.data;
                       if (this.availablePrices.length > 0) {
                           this.costPer = this.availablePrices[0].code;
                       }
                       if (this.priceRange.length === 0) {
                           this.rangeSliderOptions.min = this.availablePrices[0].minPrice;
                           this.rangeSliderOptions.max = this.availablePrices[0].maxPrice;
                           this.priceRange[0] = this.availablePrices[0].minPrice;
                           this.priceRange[1] = this.availablePrices[0].maxPrice;
                       }
                       for (let i = 0; i < this.availablePrices.length; i++) {
                           if (this.availablePrices[i].code === this.costPer) {
                               this.priceRange[0] = this.availablePrices[i].minPrice;
                               this.priceRange[1] = this.availablePrices[i].maxPrice;
                           }
                       }
                   })
               // }
            },
            sendFilter() {
                let selectedSpeciality = 3;
                if(this.vendorValue !== null) {
                    selectedSpeciality = this.vendorValue.id;
                }
                if(!this.priceFrom) {
                    this.priceFrom = this.priceRange[0];
                }
                if(!this.priceTo) {
                    this.priceTo = this.priceRange[1];
                }
                this.$router.push({path: '/catalog/' + selectedSpeciality + '/filter_',
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
                         this.rangeSliderOptions.min = this.availablePrices[i].minPrice;
                         this.rangeSliderOptions.max = this.availablePrices[i].maxPrice;
                         this.priceRange[0] = this.availablePrices[i].minPrice;
                         this.priceRange[1] = this.availablePrices[i].maxPrice;
                     }
                 }

              },
          }
        },
        created() {
            // if(this.$store.state.desktop) {
            this.getBanner();
            // }
            // this.vendorValue = this.$store.state.specialities[0];
            // this.getSpecialities();
            this.$store.watch((state) => {
                    return this.$store.getters.getUserCityId
                },
                (id) => {
                    this.getSpecPrices();
                })
        },
    }
</script>