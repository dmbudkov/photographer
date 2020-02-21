<template>
    <!--<section class="catalog">-->
    <div class="catalog__form-holder">
    <form class="catalog__form" ref="catalogForm">
        <div ref="filterHolder" class="catalog__filter-holder">
            <div class="catalog__filter-icon" @click="showFilterHandler" v-if="!$store.state.desktop">
                    <span class="catalog__filter-quantity" v-if="urlParams.length > 0" v-text="urlParams.length">

                    </span>
            </div>
            <no-ssr>
                <filter-tab class="catalog__filter-params" v-if="showFilter || $store.state.desktop" @showingFilter="showingFilter" :specialityId="vendorType"  :paramsFromFilter="urlParams" :filterParams="filterParams" :filterDate="date" :filterSort="sort" :checkedProps="checkedTags" @checkedParams="handleCheckedParams($event)" :checkedPrice="checkedPrice" :checkedCity="$store.state.userCity"  @clearFilter="handleClearFilter($event)" @vendorResults="handleVendorResults($event);"></filter-tab>
            </no-ssr>
            <!--<div class="catalog__date-holder">-->
                <!--<span class="catalog__date-title">Дата</span>-->
            <!--<catalog-calendar class="catalog__filter-date" :date="date" @toDate="getToDate($event);" @fromDate="getFromDate($event);" >-->

            <!--</catalog-calendar>-->
            <!--</div>-->
            <div class="catalog__filter-sort filter-sort">
                <label class="filter-sort__label" for="sort">
                </label>
                <select name="sort" id="sort" v-model="sort" class="filter-sort__select" @change="sendSort(sort);">
                    <option value="hotDate">Горящие</option>
                    <option value="expensive">Дороже</option>
                    <option value="cheaper">Дешевле</option>
                </select>
            </div>
        </div>
        <filter-tags v-if="!$store.state.desktop"
                :specialityId="vendorType"
                :filterDate="date"
                :filterSort="sort"
                :checkedCity="checkedCity"
                :paramsFromFilter="checkedTags"
                @tagsChanged="handleChangedTags($event);"
        ></filter-tags>
        <!--<filter-results :vendorResults="filterResult"></filter-results>-->
    </form>
    </div>
    <!--</section>-->
</template>

<script>

    import CatalogCalendar from "~/components/CatalogFilterElements/CatalogFilterCalendar.vue";
    import FilterTab from "~/components/FilterElements/FilterTab.vue";
    import NoSSR from 'vue-no-ssr';
    import FilterTags from "~/components/CatalogFilterElements/FilterTags.vue";
    import FilterResults from "~/components/CatalogFilterElements/FilterResults.vue";
    import Multiselect from 'vue-multiselect';
    //    import "~/components/FilterElements/FilterTab.vue";
    //    import "~/components/FilterElements/FilterType.vue";
    //    import "~/components/FilterElements/FilterTypes.vue";

    export default {
        name: 'CatalogFilter',
        components: {
            // 'vendor-types': VendorTypes,
            'multiselect': Multiselect,
            'catalog-calendar': CatalogCalendar,
            'filter-tab': FilterTab,
            'filter-tags': FilterTags,
            'filter-results': FilterResults,
            "no-ssr": NoSSR
        },
        data() {
            return {
                showFilter: false,
                filterParams: [],
                checkedTags: [],
                checkedPrice: {},
                checkedCity: {},
                filterResult: [],
                filterHeight: 0,
                currentOffset: 0,
                resultsHeight: 0,
                scrollLimit: 0,
                lastScrollValue: 0,
                sortList: [
                    {label: 'Горящие', value: 'hotDate'},
                    {label: 'Дороже', value: 'expensive'},
                    {label: 'Дешевле', value: 'cheaper'}
                ],
                sort: this.$route.query.sort || 'hotDate',
                date: {from: undefined, to: undefined},
                price: {
                    type: undefined,
                    from: null,
                    to: null
                }
            }
        },
        props: {
            specialities: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            checkedSpeciality: {
                type: Number,
                default: null
            },
            urlParams: {
                type: Array,
                default: function () {
                    return []
                }
            },
            vendorType: {
                type: Number
            },
            selectedSort: {
                default: function () {
                    return {};
                },
                type: Object
            }
        },
        methods: {
            checkSort(sort) {
                if(sort) {
                    this.sendSort(sort.value);
                }
            },
            sendSort(sort) {
                let city = null;
                if(this.checkedCity.hasOwnProperty('id')) {
                    city = this.checkedCity.id;
                } else if (this.$store.state.userCity.hasOwnProperty('id')) {
                    city = this.$store.state.userCity.id;
                }

                let price = {};
                if(this.$route.query.priceType) {
                    price.from = this.$route.query.priceFrom;
                    price.to = this.$route.query.priceTo;
                    price.type = this.$route.query.priceType;
                } else {
                    if (this.vendorType === 5) {
                        price.type = 'event';
                    } else if (this.vendorType === 2) {
                        price.type = 'hour';
                    } else if (this.vendorType === 6) {
                        price.type = 'person';
                    } else {
                        price.type = 'full';
                    }
                }

                this.$axios({
                    method: 'post',
                    url: `/api/catalog/`,
                    data: {
                        "speciality": this.vendorType,
                        "sort": sort,
                        "properties": this.urlParams,
                        "price": price,
                        "date": this.date,
                        "city": city
                    }
                }).then((response) => {
                    this.$router.push({
                        path: this.$route.fullPath,
                        query: {
                            sort: sort
                        }});
                    this.$emit('vendorResults', response.data.vendors);

                })
            },
            getToDate(event) {
              this.date.to = event;
            },
            fixFilter(event) {

                if (window.matchMedia("(min-width: 1200px)").matches) {
                    let documentTop = window.pageYOffset;
                    const catalogForm = this.$refs.catalogForm;

                    if (catalogForm) {
                        if(this.resultsHeight > this.filterHeight) {
                            if (window.pageYOffset > this.currentOffset) {
                                if (!catalogForm.classList.contains('catalog__form--fixed')) {
                                    catalogForm.classList.add('catalog__form--fixed');
                                }
                            } else {
                                if (catalogForm.classList.contains('catalog__form--fixed')) {
                                    catalogForm.classList.remove('catalog__form--fixed');
                                }
                            }
                            if (this.scrollLimit < documentTop) {
                                if (!catalogForm.classList.contains('catalog__form--bottom')) {
                                    catalogForm.classList.add('catalog__form--bottom');
                                }
                                // let diff = this.scrollLimit - documentTop;
                                // this.$refs.catalogForm.style.transform = `translateY(${diff}px)`;
                            } else {
                                if (catalogForm.classList.contains('catalog__form--bottom')) {
                                    catalogForm.classList.remove('catalog__form--bottom');
                                }
                                // this.$refs.catalogForm.style.transform = `translateY(0px)`;
                            }
                        }
                    }
                } else if(window.matchMedia("(max-width: 767px)").matches) {
                   const filterHolder = this.$refs.filterHolder;

                   if(filterHolder) {
                       if (window.pageYOffset > 160) {
                           if(window.pageYOffset < this.lastScrollValue) {
                               if (!filterHolder.classList.contains('catalog__filter-holder--fixed')) {
                                   filterHolder.classList.add('catalog__filter-holder--fixed');
                               }
                           } else {
                               if (filterHolder.classList.contains('catalog__filter-holder--fixed')) {
                                   filterHolder.classList.remove('catalog__filter-holder--fixed');
                               }
                           }
                       } else {
                           if (filterHolder.classList.contains('catalog__filter-holder--fixed')) {
                               filterHolder.classList.remove('catalog__filter-holder--fixed');
                           }
                       }
                   }
                    this.lastScrollValue = window.pageYOffset;
                }
            },
            getFromDate(event) {
                this.date.from = event;
            },
            handleDateAcceptation() {
                let city = null;
                let price = {};
                let urlDate = this.$route.path;
                if(this.checkedCity.hasOwnProperty('id')) {
                    city = this.checkedCity.id;
                } else if (this.$store.state.userCity.hasOwnProperty('id')) {
                    city = this.$store.state.userCity.id;
                }

                if(this.$route.query.priceType) {
                    price.from = +this.$route.query.priceFrom;
                    price.to = +this.$route.query.priceTo;
                    price.type = this.$route.query.priceType;
                } else {
                    if (this.vendorType === 5) {
                        price.type = 'event';
                    } else if (this.vendorType === 2) {
                        price.type = 'hour';
                    } else if (this.vendorType === 6) {
                        price.type = 'person';
                    } else {
                        price.type = 'full';
                    }
                }


                if(this.date.to !== undefined) {
                    urlDate += `dateFrom=${this.date.from}&dateTo=${this.date.to}`;

                    this.$axios({
                        method: 'post',
                        url: `/api/catalog/`,
                        data: {
                            "speciality": this.vendorType,
                            "properties": this.urlParams,
                            "date": this.date,
                            "sort": this.sort,
                            "price": price,
                            "city": city
                        }
                    }).then((response) => {
                        this.filterParams = response.data.props;
                        this.$emit('vendorResults', response.data.vendors);

                        this.$router.push({
                            path: this.$route.fullPath,
                            query: {
                                dateFrom: this.date.from,
                                dateTo: this.date.to
                            }});
                    })
                }
            },
            handleClearFilter(dateObj) {
              this.date = dateObj;
            },
            handleCheckedParams(event) {
                this.filterParams = event.checkedTags;
                this.checkedCity = event.checkedCity;
                this.checkedPrice = event.checkedPrice;
            },
            handleVendorResults(data) {
                this.$emit('vendorResults', data);
            },
            handleChangedTags(event) {
                this.getVendorProperties(this.vendorType, event.props);
                let resultUrl = 'filter_';
                let arrayToSend = event.props.slice();

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
                this.$router.push({path: resultUrl, query: this.$route.query});
            },
    // {
    //     "speciality": specialityId,
    //     "price": price,
    //     "city": city,
    //     "date": this.date,
    //     "properties": filterData,
    // }
            getVendorProperties(specialityId, filterParams) {
                let dataSend = {};
                let city = null;
                let price = {};
                let date = {from: '', to: ''};
                let filterData = [];
                if(this.$store.state.userCity.hasOwnProperty('id')) {
                    city = this.$store.state.userCity.id;
                } else if (this.$route.query.city && typeof this.$route.query.city === "number") {
                    city = this.$route.query.city;
                }

                if(this.$route.query.dateFrom && this.$route.query.dateTo) {
                    date.from = this.$route.query.dateFrom;
                    date.to = this.$route.query.dateTo;
                }
                if(this.$route.query.priceType) {
                    price.from = +this.$route.query.priceFrom;
                    price.to = +this.$route.query.priceTo;
                    price.type = this.$route.query.priceType;
                }
                if(filterParams.length > 0) {
                    filterData = filterParams;
                }
                if(!this.$route.query.priceType) {
                    if (specialityId === 5) {
                        price.type = 'event';
                    } else if (specialityId === 2) {
                        price.type = 'hour';
                    } else if (specialityId === 6) {
                        price.type = 'person';
                    } else {
                        price.type = 'full';
                    }
                }
                this.$axios({
                    method: 'post',
                    url: `/api/catalog/props/`,
                    data: {
                        "speciality": specialityId,
                        "price": price,
                        "city": city,
                        "date": date,
                        "properties": filterData,
                    }
                }).then((response) => {
//                 this.vendorParams = response.data.props;

                    this.filterParams = response.data.props;
                    // this.filterResult = response.data.vendors;
                    let checkedTags = [];
                    for(let i = 0; i < this.filterParams.length; i++) {
                        let checkedValues = [];
                        let checkedTagsTitles = [];
                        if(this.filterParams[i].values.length > 0) {
                            for(let k = 0; k < this.filterParams[i].values.length; k++) {
                                if (this.filterParams[i].values[k].checked) {
                                    checkedValues.push(this.filterParams[i].values[k].code);
                                    checkedTagsTitles.push({
                                        code: this.filterParams[i].values[k].code,
                                        title: this.filterParams[i].values[k].title
                                    });
                                }
                            }
                        }
                        checkedTags.push({code: this.filterParams[i].code, values: checkedTagsTitles});
                    }

                    this.checkedTags = checkedTags;
//                 for(let key in response.data.props) {
//                     console.log(key);
//                     this.paramsToSelect.push({code: response.data.props[key].code, values: []});
//                 }
//                 for(let i = 0; i < response.data.length; i++) {
//
//                 };
                });
            },
            handleCheckedSpeciality(event) {

                this.checkedSpeciality = event.checkedSpeciality;
                // this.getVendorProperties(this.vendorType, this.urlParams);
            },
            showFilterHandler() {
                if(this.showFilter) {
                    this.showFilter = false;
                } else {
                    this.showFilter = true;
                }
            },
            showingFilter: function(value) {
                this.showFilter = value;
            }

        },
        watch: {
            showFilter (value) {
                const bodyClassList = document.querySelector('body').classList;
                const mainClassList = document.querySelector('.main').classList;
                if (value) {
                    bodyClassList.add('-overflow-hidden');
                    mainClassList.add('main--date-opened');
                } else {
                    bodyClassList.remove('-overflow-hidden');
                    mainClassList.remove('main--date-opened');
                }
            },
            selectedSort (sort) {
                this.sendSort(sort.value);
            }
        },
        created() {
            if(this.$route.query.dateFrom && this.$route.query.dateTo) {
                this.date.from = new Date(this.$route.query.dateFrom.replace(/[,.]/g, '-'));
                this.date.to = new Date(this.$route.query.dateTo.replace(/[,.]/g, '-'));
            }
            if(this.$route.query.sort) {
                this.sort = this.$route.query.sort;
            }
          },
        updated() {
            this.filterHeight = this.$refs.catalogForm.clientHeight;
            this.resultsHeight = document.querySelector('.filter-results').clientHeight;
            this.scrollLimit = this.currentOffset + this.resultsHeight - this.filterHeight;
            if(this.resultsHeight > this.filterHeight) {
                if (this.$refs.catalogForm.classList.contains('catalog__form--bottom')) {
                    this.$refs.classList.remove('catalog__form--bottom');
                }
            }
        },
        mounted() {

            document.addEventListener('scroll', this.fixFilter);
            // this.checkedSpeciality = this.$store.state.specialities[0].id;
            if(this.currentOffset === 0) {
                console.log('parent ot', this.$refs.catalogForm.offsetParent.offsetTop);
                this.currentOffset = 80 + this.$refs.catalogForm.offsetParent.offsetTop + this.$refs.catalogForm.offsetTop;
            }
            if(Number.isInteger(this.vendorType)) {
                this.getVendorProperties(this.vendorType, this.urlParams);
            }
//         this.$router.push(`/catalog/VendorType=`)
        },
        destroyed() {
            document.removeEventListener('scroll', this.fixFilter);
        }
    }
</script>