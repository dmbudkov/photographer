<template>
    <div class="filter-tab filter-tab--catalog">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closeFilter"></div>
            <div class="filter-tab__name">Фильтры</div>
            <button class="filter-tab__clear"  @click.prevent="clearFilter">
                Очистить
            </button>
        </div>
        <div class="filter-tab__items">
            <div class="filter-tab__section">
                <div class="filter-tab__section-name" >Город</div>
                <multi-select :searchable="true" :allow-empty="false"  class="multiselect--searchable"
                              :show-labels="false" v-model="citySelected" track-by="title" label="title" value="Город" @select="cityChanged" placeholder="Выберите город" :options="cityList"><span slot="noResult">Город не найден</span></multi-select>
            </div>
            <div class="filter-tab__section filter-tab__section--prices">
                <div class="filter-tab__section-name">Ценовой диапазон</div>
                <multi-select :searchable="false"
                              :show-labels="true"
                              :allow-empty="false" v-model="priceTypeSelected" track-by="title"  placeholder="Цена за" label="title"  @select="priceChanged" :options="priceType"></multi-select>

                <div class="range-prices range-prices--filter">
                    <div class="range-prices__holder">
                        <div class="range-prices__item" v-show="priceTypeSelected.maxPrice" >
                            <input
                                    type="tel"
                                    class="input"
                                    pattern='[0-9]'
                                    data-price="from"
                                    ref="priceFrom"
                                    v-model="priceFromValue"
                                    :placeholder="prettifyPrice(priceTypeSelected.minPrice) + ' ₽'"
                                    @keyup="formatPrice($event); checkPrice($event)"
                                    @keydown="stopTyping($event)"
                                    @focus="clearValue($event)"
                                    />
                            <label class="range-prices__item-label">от</label>
                        </div>
                        <div class="range-prices__item" v-show="priceTypeSelected.maxPrice" >
                            <input
                                    type="tel"
                                    class="input"
                                    pattern='[0-9]'
                                    v-model="priceToValue"
                                    data-price="to"
                                    ref="priceTo"
                                    @keyup="formatPrice($event); checkPrice($event)"
                                    @keydown="stopTyping($event)"
                                    @focus="clearValue($event)"  :placeholder="prettifyPrice(priceTypeSelected.maxPrice) + ' ₽'"/>
                            <label class="range-prices__item-label">до</label>
                        </div>
                    </div>
                </div>
            </div>
            <span class="preloader-interactive" v-if="vendorParams.length < 1">
            <span class="preloader-interactive__dot preloader-interactive__dot--first"></span>
            <span class="preloader-interactive__dot preloader-interactive__dot--second"></span>
            <span class="preloader-interactive__dot preloader-interactive__dot--third"></span>
            <span class="preloader-interactive__dot preloader-interactive__dot--fourth"></span>
            </span>
            <transition-group name="fade">
            <div class="filter-tab__section filter-tab__section--property" :class="{'filter-tab__section--expanded': paramsToSelect[groupIndex].values.length > 0}" v-for="(vendorGroup, groupIndex, groupArrayIndex) in vendorParams" :key="groupIndex" :data-id="groupIndex" v-if="paramsToSelect.length > 0" @click="expandTab('section' + groupIndex)" :ref="'section' + groupIndex">
                <div class="filter-tab__section-toggle"></div>
                <div class="filter-tab__section-name" v-text="vendorGroup.title"></div>
                <div v-if="vendorGroup.type === 'tag'" class="filter-tab__section-tags select-tags">
                    <div  class="select-tags__item select-tag" :key="index" v-for="(groupItem, index) in vendorGroup.values">
                        <input
                                :id="vendorGroup.code + groupItem.code + index"
                                @change="checkProp"
                                class="select-tag__input"
                                :value="groupItem.code"
                                type="checkbox"
                                :disabled="groupItem.count === 0 && paramsToSelect[groupIndex].values.length === 0"
                                v-model="paramsToSelect[groupIndex].values" />
                        <label class="select-tag__label"
                                :for="vendorGroup.code + groupItem.code + index" >
                            <span class="select-tag__type"
                                    v-text="groupItem.title"></span>
                            <span class="select-tag__quantity" v-if="groupItem.count > 0">({{groupItem.count}})</span></label>
                    </div>
                </div>
                <div v-if="vendorGroup.type === 'checkbox' || vendorGroup.type === 'select' || vendorGroup.type === 'radio'"  class="filter-tab__section-tags  select-checkboxes">
                    <div  class="select-checkboxes__item checkbox" :key="index" v-for="(groupItem, index) in vendorGroup.values">
                        <input
                                :id="vendorGroup.code + groupItem.code"
                                type="checkbox"
                                @change="checkProp"
                                :value="groupItem.code"
                                :disabled="groupItem.count === 0 && paramsToSelect[groupIndex].values.length === 0"
                                class="checkbox__input"
                                v-model="paramsToSelect[groupIndex].values"  />
                        <label :for="vendorGroup.code + groupItem.code" class="checkbox__label"><span class="checkbox__name" v-text="groupItem.title"></span><span class="checkbox__quantity" v-if="groupItem.count > 0">({{groupItem.count}})</span></label>
                    </div>
                </div>
                <!--<div v-if="vendorGroup.type === 'radio'"  class="select-checkboxes">-->
                    <!--<div class="select-checkboxes__item checkbox" :key="index" v-for="(groupItem, index) in vendorGroup.values">-->
                        <!--<input :id="'check' + groupItem.code + groupItem.id" type="radio" :disabled="groupItem.count === 0" v-model="paramsToSelect[groupIndex].values" :value="[groupItem.code]" class="checkbox__input"/>-->
                        <!--<label :for="'check' + groupItem.code + groupItem.id" class="checkbox__label"><span class="checkbox__name" v-text="groupItem.title"></span><span class="checkbox__quantity" v-if="groupItem.count > 0">({{groupItem.count}})</span></label>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<multiselect v-if="vendorGroup.type === 'select'" :searchable="true" class="multiselect--searchable"-->
                <!--:show-labels="false" v-model="citySelected" track-by="name" label="name" value="Город" placeholder="Выберите город" :options="cityList"></multiselect>-->
            </div>
            </transition-group>
        </div>
        <transition name="fade">
        <button class="filter-tab__button button button--violet button--filter" v-if="showSaveButton && !$store.state.desktop" @click.prevent="submit">Применить</button>
        </transition>
    </div>
</template>

<script>
    import NoSSR from 'vue-no-ssr';
    import Multiselect from 'vue-multiselect';
    let components = {
        "multi-select": Multiselect,
        "no-ssr": NoSSR
    };
    if (process.browser) {
//    import vueSlider from 'vue-slider-component';
        const vueSlider = require('vue-slider-component');
        components['vueSlider'] = vueSlider;

    }

 export default {
     name: 'FilterTab',
     components,
     data() {
         return {
             citySelected: {
                 id: null,
                 name: ''
             },
             showFilter: false,
             showSaveButton: false,
             checkedTags: [],
             typingTimer: '',
             vendorParams: {},
             paramsToSelect: [],
             paramsToCompare: [],
             // cityList: [
             //     {
             //         name: "Ярославль",
             //         id: 76
             //     },
             //     {
             //         name: "Москва",
             //         id: 199
             //     },
             //     {
             //         name: "Кострома",
             //         id: 44
             //     },
             // ],
             priceTypeSelected: {code: '',
             maxPrice: null,
             minPrice: null},
             priceType: [
                 {
                     title: "За вечер",
                     id: 1
                 },
                 {
                     title: "За час",
                     id: 2
                 }
             ],
             priceToValue: null,
             priceFromValue: null,
             rangeSliderOptions: {
                 selectedDate: '',
                 width: "100%",
                 eventType: "auto",
                 height: 3,
                 debug: false,
                 dotSize: 27,
                 interval: 100,
                 min: 0,
                 max: 50000,
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
             },
             filterData: {
                 costPer: '',
                 priceRange: []
             },
         }
     },
     computed: {
         cityList: function () {
             return this.$store.state.cityList;
         }
     },
     props: {
         showingFilter: {
             type: Boolean,
             default: false
         },
         filterDate: {
             type: Object,
             default: function () {
                 return {}
             }
         },
         filterSort: {
             type: String,
             default: 'demand'
         },
         paramsFromFilter: {
             type: Array,
             default: function () {
                 return [];
             }
         },
         checkedProps: {
             type: Array,
             default: function () {
                 return []
             }
         },
         checkedCity: {
             type: Object,
             default: function () {
                 return {}
             }
         },
         checkedPrice: {
             type: Object,
             default: function () {
                 return {}
             }
         },
         specialityId: {
             type: Number,
             default: 1
         },
         filterParams: {
             type: Array,
             default: function () {
                 return [];
             }
         }
     },
     watch: {
         filterParams: {
           handler: function (newValue) {

               if(newValue) {
                   this.vendorParams = newValue;
               }
               for(let i = 0; i < this.filterParams.length; i++) {
                   let checkedValues = [];
                   let checkedTagsTitles = [];

                   if(this.filterParams[i].values.length > 0) {

                       for(let k = 0; k < this.filterParams[i].values; k++) {

                           if (this.filterParams[i].values[k].checked && this.checkedProps[i].values.indexOf(this.filterParams[i].values[k].code) !== -1) {
                               checkedValues.push(this.filterParams[i].values[k].code);
                               checkedTagsTitles.push({
                                   code: this.filterParams[i].values[k].code,
                                   title: this.filterParams[i].values[k].title
                               });
                           }
                       }
                   }
                   this.paramsToSelect.push({code: this.filterParams[i].code, values: checkedValues});
                   // checkedTags.push({code: this.filterParams[i].code, values: checkedTagsTitles});
               }
               let checkedProps = [];
               let paramsToSelect = [];

               for(let i = 0; i < this.checkedProps.length; i++) {
                   if(this.checkedProps[i].values.length > 0) {
                       checkedProps.push(this.checkedProps[i].values);
                   }
               }
               if(checkedProps.length > 0) {
                   for (let i = 0; i < this.checkedProps.length; i++) {
                       let values = [];
                       for (let k = 0; k < this.checkedProps[i].values.length; k++) {
                           values.push(this.checkedProps[i].values[k].code);
                       }
                       paramsToSelect.push({code: this.checkedProps[i].code,
                           values: values})
                   }
                   this.paramsToSelect = paramsToSelect;
               }
           },
           deep: true
         },
         priceToValue: {
             handler: function (newValue) {
                 if (newValue) {
                     this.filterData.priceRange[1] = +newValue.replace(/[^\d]/, '');
                 } else if(newValue === null) {
                     this.filterData.priceRange[1] = this.priceTypeSelected.maxPrice;
                 }
                 // this.showSaveButton = true;

             }
         },

         priceFromValue: {
             handler: function (newValue) {
                 if (newValue) {
                     this.filterData.priceRange[0] = +newValue.replace(/[^\d]/, '');
                 } else if(newValue === null) {
                     this.filterData.priceRange[0] = this.priceTypeSelected.minPrice;
                 }
                 // this.showSaveButton = true;
             }
         },
         priceTypeSelected: {
             handler: function (newValue) {
                 this.rangeSliderOptions.min = newValue.minPrice;
                 this.rangeSliderOptions.max = newValue.maxPrice;
             }
         },
         citySelected: {
             handler: function (newValue) {

                 if(typeof newValue !== 'undefined') {
                     this.$store.commit({
                         type: 'setUserCity',
                         cityData: {title: newValue.title, id: newValue.id, code: newValue.code}
                     })
                     this.getSpecPrices(this.specialityId, this.$route.query.priceType);
                 }
             },
         }
     },
     methods: {
         expandTab(tabId) {
             const checkedTabNode = this.$refs[tabId][0];
             if (checkedTabNode.classList.contains('filter-tab__section--expanded')) {
                 checkedTabNode.classList.remove('filter-tab__section--expanded');
             } else {
                 checkedTabNode.classList.add('filter-tab__section--expanded');
             }
         },
         checkPrice(event) {
             // let priceType = event.target.getAttribute('data-price');
             //
             //
             // if(priceType === "from") {
             //     if(this.filterData.priceRange[0] < this.priceTypeSelected.minPrice || this.filterData.priceRange[0] > this.priceTypeSelected.maxPrice) {
             //         this.priceFromValue = this.priceTypeSelected.minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
             //         // console.log('from', this.priceFromValue)
             //         this.filterData.priceRange[0] = this.priceTypeSelected.minPrice;
             //         console.log('from');
             //     }
             // } else if(priceType === "to") {
             //     if(this.filterData.priceRange[1] > this.priceTypeSelected.maxPrice || this.filterData.priceRange[1] < this.priceTypeSelected.minPrice) {
             //         this.priceToValue = this.priceTypeSelected.maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
             //         this.filterData.priceRange[1] = this.priceTypeSelected.maxPrice;
             //     }
             // }
             clearTimeout(this.typingTimer);
             this.typingTimer = setTimeout(() => {
             if(this.$store.state.desktop) {
                 this.submit()
             }
                }, 700)
         },
         stopTyping() {
             clearTimeout(this.typingTimer);
         },
         clearValue(event) {
           event.target.value = '';
         },
         cityChanged() {
             const priceFrom = this.$refs.priceFrom;
             const priceTo = this.$refs.priceTo;
             if(priceFrom && priceTo) {
                 this.priceToValue = null;
                 this.priceFromValue = null;
             }
             this.showSaveButton = true;

             if (this.$store.state.desktop) {
                 setTimeout(() => {
                     this.filterData.priceRange[0] = this.priceTypeSelected.minPrice;
                     this.filterData.priceRange[1] = this.priceTypeSelected.maxPrice;
                     this.submit(
                     );
                 }, 800);
             }

         },
         priceChanged() {
             const priceFrom = this.$refs.priceFrom;
             const priceTo = this.$refs.priceTo;

             if(priceFrom && priceTo) {
                 this.priceToValue = null;
                 this.priceFromValue = null;
                 // priceFrom.value = '';
                 // priceTo.value = '';
             }
             this.showSaveButton = true;
             if(this.$store.state.desktop) {
                 setTimeout(() => {
                 this.filterData.priceRange[0] = this.priceTypeSelected.minPrice;
                 this.filterData.priceRange[1] = this.priceTypeSelected.maxPrice;
                 this.submit()
                 }, 800)
             }
         },
         formatPrice(event) {

             let value = event.target.value.replace(/[^\d]/, '');
             let dirtyVal = value.replace(/ /g,'');
             let val = (+dirtyVal/1).toFixed(0).replace('.', ' ');
             let priceType = event.target.getAttribute('data-price');
             this.showSaveButton = true;
             if(priceType === 'from') {
                 if (val === "NaN") {
                     this.priceFromValue = 0;
                 } else {
                     this.priceFromValue = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                     this.filterData.priceRange[0] = +val;
                 }

             } else {
                 if (val === "NaN") {
                     this.priceToValue = 0;
                 } else {
                     this.priceToValue = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                     this.filterData.priceRange[1] = +val;
                 }
             }

         },
         formatPriceInserted(event, priceType) {
             let value = event.toString().replace(/[^\d]/, '');
             let dirtyVal = value.replace(/ /g,'');
             let val = (+dirtyVal/1).toFixed(0).replace('.', ' ');
             return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
         },
         getSpecPrices(specialityId, priceTypeFromQuery) {

             this.$axios({
                 method: 'get',
                 url: `/api/catalog/prices?speciality=${specialityId}&city=${this.$store.state.userCity.id || 3}`
             }).then((response) => {
                 if(priceTypeFromQuery === undefined) {
                     this.priceType = response.data;
                     this.priceTypeSelected = response.data[0];
                     this.rangeSliderOptions.min = this.priceType[0].minPrice;
                     this.rangeSliderOptions.max = this.priceType[0].maxPrice;
                     if (!this.filterData.priceRange[0]) {
                         this.filterData.priceRange[0] = +this.priceType[0].minPrice;
                     }
                     if (!this.filterData.priceRange[1]) {
                         this.filterData.priceRange[1] = +this.priceType[0].maxPrice;
                     }
                 } else {
                     for (let key in response.data) {
                         if(response.data[key].code === priceTypeFromQuery) {
                             this.priceType = response.data;
                             this.priceTypeSelected = response.data[key];
                         }
                     }
                 }
             })
         },
         submit() {
             let resultUrl = 'filter_';
             let queryData = {};
             let arrayToSend = this.paramsToSelect.slice();
             let formatedDate = this.processingDate(this.filterDate);

             let i = arrayToSend.length;

             while (i--) {
                 if (arrayToSend[i].values.length === 0) {
                     arrayToSend.splice(i, 1);
                 }
             }
             for (let ind = 0; ind < arrayToSend.length; ind++) {
                 resultUrl += arrayToSend[ind].code + '_';
                 for (let k = 0; k < arrayToSend[ind].values.length; k++) {
                     if (k !== arrayToSend[ind].values.length - 1) {
                         resultUrl += arrayToSend[ind].values[k] + "_ili_";
                     } else {
                         resultUrl += arrayToSend[ind].values[k]
                     }
                 }
                 if (ind !== arrayToSend.length - 1) {
                     resultUrl += "_i_";
                 }
             }
             if(resultUrl.length === 0) {
                 resultUrl = '/catalog/';
             }
                 queryData = {
                     "speciality": this.specialityId,
                     "properties": this.paramsToSelect,
                     "city": this.citySelected.id,
                     "date": this.filterDate,
                     "sort": this.filterSort,
                     "price": {
                         "type": this.priceTypeSelected.code,
                         "from": this.filterData.priceRange[0],
                         "to": this.filterData.priceRange[1],
                     }
                 }

             this.$axios({
                 method: 'post',
                 url: `/api/catalog/`,
                 data: queryData
             }).then((response) => {
                 this.vendorParams = response.data.props;
                 let checkedTags = [];
                 this.$emit('checkedParams', {
                     checkedTags: this.vendorParams,
                     checkedCity: this.citySelected,
                     checkedPrice: {
                         type: this.priceTypeSelected.code,
                         from: this.filterData.priceRange[0],
                         to: this.filterData.priceRange[1],
                     }
                 });
                 this.$emit('vendorResults', response.data.vendors);
                     this.$router.push({
                         path: resultUrl, query: {
                             priceType: this.priceTypeSelected.code,
                             priceFrom: this.filterData.priceRange[0],
                             priceTo: this.filterData.priceRange[1],
                             dateFrom: formatedDate.from,
                             dateTo: formatedDate.to,
                             city: this.citySelected.id,
                             sort: this.filterSort
                         }
                     });

                 this.closeFilter();
             });
         },
         clearFilter() {
           this.$axios({
               method: 'post',
               url: '/api/catalog/props',
               data: {
                   "speciality": this.specialityId,
                   "properties": [],
                   "date": {},
                   "city": this.$store.state.userCity.id
               }
           }).then((response) => {
               this.vendorParams = response.data.props;
               for(let i = 0; i < this.paramsToSelect. length; i++) {
                   this.paramsToSelect[i].values = [];
               }
               this.priceFromValue = null;
               this.priceToValue = null;
               this.showSaveButton = true;
               // let arrayToSend = this.paramsToSelect.slice();
               if(this.$store.state.desktop) {
                   let resultUrl = 'filter_';
                   // for (let ind = 0; ind < arrayToSend.length; ind++) {
                   //     resultUrl += arrayToSend[ind].code + '_';
                   //     for (let k = 0; k < arrayToSend[ind].values.length; k++) {
                   //         if (k !== arrayToSend[ind].values.length - 1) {
                   //             resultUrl += arrayToSend[ind].values[k] + "_ili_";
                   //         } else {
                   //             resultUrl += arrayToSend[ind].values[k]
                   //         }
                   //     }
                   //     if (ind !== arrayToSend.length - 1) {
                   //         resultUrl += "_i_";
                   //     }
                   // }
                   if(resultUrl.length === 0) {
                       resultUrl = '/catalog/';
                   }
                   let queryData = {};
                   queryData = {
                       "speciality": this.specialityId,
                       "properties": [],
                       "city": this.citySelected.id,
                       "dateFrom": '',
                       "dateTo": '',
                       "sort": "hotDate"
                   }
                   this.$axios({
                       method: 'post',
                       url: `/api/catalog/`,
                       data: queryData
                   }).then((response) => {
                       this.vendorParams = response.data.props;
                       let checkedTags = [];
                       this.$emit('checkedParams', {
                           checkedTags: this.vendorParams,
                           checkedCity: this.citySelected,
                           checkedPrice: {
                               type: this.priceTypeSelected.code,
                               from: this.filterData.priceRange[0],
                               to: this.filterData.priceRange[1],
                           }
                       });
                       this.$emit('vendorResults', response.data.vendors);
                           this.$router.push({
                               path: resultUrl, query: {
                                   city: this.citySelected.id,
                               }
                           });
                       this.closeFilter();
                   });
               }
               // this.citySelected = {};
               // this.$emit('clearFilter', {from: undefined, to: undefined});
           })
         },
         processingDate(dateObj) {
             let dateObjFormated = {};
             if(typeof dateObj.from !== 'undefined' && typeof dateObj.to !== 'undefined') {
                 for (let key in dateObj) {
                     let dateFormated = '';
                     if (typeof dateObj[key] === 'object') {
                         let date = new Date(dateObj[key]);
                             dateFormated = date.getFullYear() + '.'
                             + ('0' + (date.getMonth() + 1)).slice(-2) + '.'
                             + ('0' + date.getDate()).slice(-2);
                     } else {
                         dateFormated = dateObj[key];
                     }
                     if (key === 'from') {
                         dateObjFormated[key] = dateFormated;
                     } else {
                         dateObjFormated[key] = dateFormated;
                     }
                 }
             }
             return dateObjFormated;

         },
         checkProp() {
             let formatedDate = this.processingDate(this.filterDate);
             let selectedCity = {};
             this.showSaveButton = true;

             if(typeof this.citySelected !== "undefined") {
                 selectedCity = this.citySelected.id;
             }

             this.$axios({
                 method: 'post',
                 url: `/api/catalog/props`,
                 data: {
                     "speciality": this.specialityId,
                     "properties": this.paramsToSelect,
                     "city": selectedCity,
                     "date": formatedDate,
                     "sort": this.filterSort,
                     "price": {
                         "type": this.priceTypeSelected.code,
                         "from": this.filterData.priceRange[0],
                         "to": this.filterData.priceRange[1],
                     }
                 }
             }).then((response) => {
                 this.vendorParams = response.data.props;
                 if(this.$store.state.desktop) {
                     this.submit()
                 }
             });
         },
         closeFilter: function() {
             this.$emit('showingFilter', false);
         },
         prettifyPrice(value) {
             let val = (value/1).toFixed(0).replace('.', ' ');
             return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
         },
         getCurrentCity() {
                 const currentCityIndex = this.$store.state.cityList.findIndex((element, index, array) => {
                     if(this.$route.query.city) {

                         if (element.id === +this.$route.query.city) {
                             return index;
                         }
                     }  else {
                         if(element.id === this.$store.state.userCity.id) {
                             return index;
                         }
                     }
                 })
                     if(currentCityIndex + 1 > 0) {
                         this.citySelected = this.$store.state.cityList[currentCityIndex];
                     }

         },
     },
     created() {
     //     if(!this.$store.state.userCity.hasOwnProperty('id')) {

     //     }
     },
     mounted() {
         this.getCurrentCity();
         if (this.$route.query.priceFrom && this.$route.query.priceTo) {
             if (this.priceTypeSelected.minPrice === null && this.priceTypeSelected.maxPrice === null) {
                 // this.getSpecPrices(this.specialityId, this.$route.query.priceType)
             }
             this.priceTypeSelected.code = this.checkedPrice.type;
             this.$refs.priceFrom.value = this.checkedPrice.from;
             this.filterData.priceRange[1] = +this.$route.query.priceTo;
             this.filterData.priceRange[0] = +this.$route.query.priceFrom;
             // if (!this.$route.query.mainPage) {
                 for(let i = 0; i < this.priceType.length; i++) {
                     if(this.priceType[i].code === this.$route.query.priceType) {
                         this.priceTypeSelected = this.priceType[i];
                     }
                 }
                 this.priceFromValue = this.formatPriceInserted(this.$route.query.priceFrom, 'from');
                 this.priceToValue = this.formatPriceInserted(this.$route.query.priceTo, 'to');
         } else {
             if (this.priceTypeSelected.minPrice === null && this.priceTypeSelected.maxPrice === null) {
                 // this.getSpecPrices(this.specialityId, undefined);
             }
         }
         this.vendorParams = this.filterParams;

         // if (this.checkedCity.hasOwnProperty('code')) {
         //     this.citySelected = this.checkedCity;
         // }
         let checkedTags = [];

         for (let i = 0; i < this.filterParams.length; i++) {
             let checkedValues = [];
             let checkedTagsTitles = [];

             if (this.filterParams[i].values.length > 0) {

                 for (let k = 0; k < this.filterParams[i].values; k++) {

                     if (this.filterParams[i].values[k].checked && this.checkedProps[i].values.indexOf(this.filterParams[i].values[k].code) !== -1) {
                         checkedValues.push(this.filterParams[i].values[k].code);
                         checkedTagsTitles.push({
                             code: this.filterParams[i].values[k].code,
                             title: this.filterParams[i].values[k].title
                         });
                     }
                 }
             }
             this.paramsToSelect.push({code: this.filterParams[i].code, values: checkedValues});
             checkedTags.push({code: this.filterParams[i].code, values: checkedTagsTitles});
         }
         let checkedProps = [];
         let paramsToSelect = [];

         for (let i = 0; i < this.checkedProps.length; i++) {
             if (this.checkedProps[i].values.length > 0) {
                 checkedProps.push(this.checkedProps[i].values);
             }
         }
         if (checkedProps.length > 0) {

             for (let i = 0; i < this.checkedProps.length; i++) {
                 // this.checkedProps

                 let values = [];
                 for (let k = 0; k < this.checkedProps[i].values.length; k++) {
                     values.push(this.checkedProps[i].values[k].code);
                 }
                 paramsToSelect.push({
                     code: this.checkedProps[i].code,
                     values: values
                 })
             }
             this.paramsToSelect = paramsToSelect;
         }
         this.checkedTags = checkedTags;
     },

     }


</script>