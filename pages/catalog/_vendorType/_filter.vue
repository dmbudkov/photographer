<template >

            <main class="main">
                <preview-gallery v-if="showPreview" @showGallery="handleShowPreview($event);" :currentIndex="previewIndex" :galleryItems="previewWatching">
                </preview-gallery>
                <div class="main__background main__background--short main__background--catalog">
                    <div class="main__logo">
                        <svg width="268px" height="190px" viewBox="0 0 268 190" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
                            <title>Combined Shape</title>
                            <desc>Created with Sketch.</desc>
                            <defs>
                                <!--<linearGradient x1="139.039332%" y1="6.48995536%" x2="0%" y2="100%" id="linearGradient-1">-->

                                <!--<stop stop-color="#00ADFF" offset="0%">-->
                                <!--<animate attributeName="stop-color" values="#7A5FFF; #01FF89; #7A5FFF" dur="4s" repeatCount="indefinite"></animate>-->
                                <!--</stop>-->
                                <!--<stop stop-color="#06F6E1" offset="100%">-->
                                <!--<animate attributeName="stop-color" values="#7A5FFF; #01FF89; #7A5FFF" dur="4s" repeatCount="indefinite"></animate>-->
                                <!--</stop>-->
                                <!--</linearGradient>-->
                                <linearGradient x1="3.00128483%" y1="98.0970982%" x2="136.164585%" y2="3.046875%" id="linearGradient-2">
                                    <stop stop-color="#02DAB1" offset="0%">
                                        <animate attributeName="stop-color" values="#02DAB1; #FF027D; #02DAB1;" dur="10s" repeatCount="indefinite"></animate>
                                    </stop>

                                    <stop stop-color="#FF027D" offset="100%">
                                        <animate attributeName="stop-color" values=" #8334F6; #FF027D; #02DAB1; #8334F6;" dur="10s" repeatCount="indefinite"></animate>
                                    </stop>
                                </linearGradient>
                                <path d="M0.00647789026,26.162599 C0.542118441,9.5577419 13.040398,3.48714899 13.040398,3.48714899 C26.9670523,-5.61874038 47.4999401,5.98680489 47.4999401,5.98680489 C47.4999401,5.98680489 227.122201,74.5487954 246.226714,83.4761379 C254.796962,87.5827155 260.867555,91.689293 263.902852,97.7598859 C267.652336,105.080307 267.295242,114.54329 267.295242,121.685164 C267.295242,134.540537 267.295242,222.271247 267.295242,244.23251 C267.295242,252.624212 265.68832,259.587539 262.831571,264.229757 C258.189353,271.550178 251.583119,273.69274 251.583119,273.69274 C251.583119,273.69274 49.4639554,372.967542 42.3220814,376.181385 C35.3587542,379.395228 24.1103027,382.609072 12.8618511,376.717026 C-0.707709511,369.575152 0.00647789026,363.863029 0.00647789026,353.863029 L0.00647789026,26.162599 Z M45.0415053,217.602384 C45.0415053,223.137336 45.2200522,326.044529 45.2200522,326.044529 C45.2200522,326.044529 44.5058648,332.472215 49.6837234,335.864606 C54.8615821,339.256996 59.8608939,335.686059 59.8608939,335.686059 C59.8608939,335.686059 226.980746,259.08946 235.015354,255.339976 C243.228509,251.411945 243.407056,243.912978 243.407056,239.092213 C243.407056,234.271448 243.407056,141.184332 243.407056,127.079131 C243.407056,112.97393 230.373136,117.794694 230.373136,117.794694 C219.481778,121.008538 210.911529,137.613395 193.949578,144.041081 C177.166175,150.468768 172.88105,142.43416 158.240208,147.969112 C143.599367,153.504065 135.921852,175.822421 114.317683,186.356685 C92.7135143,196.890949 76.8228447,182.250107 60.2179876,189.213435 C43.4345837,196.176762 45.0415053,212.067431 45.0415053,217.602384 Z"
                                      id="path-3"></path>
                            </defs>
                            <g id="main" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="фирменный-градиент">
                                    <g>
                                        <g id="logo_min" transform="translate(0.000000, -45.000000)">
                                            <!--<mask id="mask-4" fill="white">-->
                                            <!--<use xlink:href="#path-3"></use>-->
                                            <!--</mask>-->
                                            <g id="Combined-Shape" fill-rule="nonzero">
                                                <!--<use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-3"></use>-->
                                                <use fill="url(#linearGradient-2)" fill-rule="evenodd" xlink:href="#path-3"></use>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <section class="catalog">
                    <button ref="upButton" class="catalog__button-up" @click="scrollToTop">Наверх</button>
                    <div class="catalog__vendor-holder">
                    <vendor-types class="catalog__vendor-type" :specialities="$store.state.specialities" :currentType="vendorType" @checkedSpecialityEvent="handleCheckedSpeciality($event)"></vendor-types>
                    </div>
                    <div class="catalog__holder">
                    <catalog-filter :urlParams="urlParams" :vendorType="vendorType" :checkedSpeciality="checkedSpeciality" :specialities="$store.state.specialities" :selectedSort="sort" @vendorResults="handleVendorResults($event);"></catalog-filter>

                    <div class="catalog__results filter-results">
                        <multiselect
                                class="catalog__sort-desktop multiselect--sort"
                                placeholder="Сортировка"
                                :options="sortList"
                                :searchable="false"
                                @select="checkSort"
                                label="label"
                        >
                        </multiselect>
                        <ul class="filter-results__list">

                            <!-- /* -->
                            <!--$store.state.catalogVendorsList-->
                            <li v-for="(item, index) in vendorResults" :key="item.id" class="filter-results__item">
                                <div v-if="index === 5 || (index !== 0 && index % 15 === 0)" @click="handleBannerClick" class="tender-banner tender-banner--filter">
                                    <div class="tender-banner__holder">
                                        <h5 class="tender-banner__title">Создать заявку!</h5>
                                        <p class="tender-banner__text">Найдите исполнителя с лучшим предложением!</p>
                                        <div class="tender-banner__button" @click="analyticsEvent">Создать сейчас</div>
                                    </div>
                                </div>
                                <span class="vendor-card vendor-card--filter vendor-card--thumbs" :class="{'vendor-card--filter-hot': typeof item['nearestHotDate'].type !== 'undefined'}">
                                    <nuxt-link :to="{path: '/catalog/vendor/' + item.id + '/', query: {catalog: true}}" class="vendor-card__image" :style="{'background-image': 'url(' + item.profilePic +')'}"></nuxt-link>
                                    <nuxt-link :to="{path: '/catalog/vendor/' + item.id + '/', query: {catalog: true}}" class="vendor-card__arrow"></nuxt-link>
                                    <span class="vendor-card__descr">
                        <!--<span class="vendor-card__role">{{item.speciality.title}}</span>-->
                        <nuxt-link :to="{path: '/catalog/vendor/' + item.id + '/', query: {catalog: true}}" class="vendor-card__name" v-if="!item.placename">{{item.firstName}} {{item.lastName}}</nuxt-link>
                        <nuxt-link :to="{path: '/catalog/vendor/' + item.id + '/', query: {catalog: true}}" class="vendor-card__name" v-else>{{item.placename}}</nuxt-link>
                        <nuxt-link  :to="{path: '/catalog/vendor/' + item.id + '/', query: {catalog: true}}" class="vendor-card__prices" >
                            <span class="vendor-card__price" v-for="priceItem in item.prices" :key="priceItem.type">
                                <span v-if=" typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type" class="vendor-card__price-sum" v-text="prettifyPrice(item['nearestHotDate'].price)"></span>
                                <span v-else class="vendor-card__price-sum" v-text="prettifyPrice(priceItem.price)"></span><span class="vendor-card__price-sum">₽</span>
                                <span class="vendor-card__price-delimiter"> / </span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'full'">день</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'hour'">час</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'person'">за человека</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'event'">за выступление</span>
                                 <span v-if="typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type" class="vendor-card__price vendor-card__price--old">{{prettifyPrice(priceItem.price)}} ₽</span>
                            </span>
                            <!--<span class="vendor-card__price vendor-card__price&#45;&#45;old">60 000 руб.</span>-->
                        </nuxt-link>
                        <span class="vendor-card__hot-date hot-date hot-date--catalog" v-if="typeof item['nearestHotDate'].type !== 'undefined'">
                            <span class="hot-date__date" v-text="prettifyHotDate(item['nearestHotDate'].date)"></span>
                            <span class="hot-date__descr">горящая дата</span>
                        </span>
                                        <span v-else class="vendor-card__closest">
                                            <span class="vendor-card__closest-head">Ближайшая дата:</span>
                                            <span class="vendor-card__closest-date" v-text="prettifyFreeDate(item['nearestFreeDate'])"></span>
                                        </span>
                                        <span class="vendor-card__preview-holder" v-if="!item.allPreviewsEmpty">
                                        <ul class="vendor-card__preview preview-items preview-items--card">
                                                <li class="preview-items__item" :class="[{'preview-items__item--photo': preview.type === 'photo'}, {'preview-items__item--video': preview.type === 'video'}, {'preview-items__item--empty': preview.type === 'empty'}]" v-for="(preview, previewIndex) in item.previewItems" :key="previewIndex" :style="{'background-image': 'url(' + preview.preview + ')'}" @click="showPreviewGallery(previewIndex, item.previewItems)">
                                            <span class="preview-items__item-holder">
                                            <span class="preview-items__item-icon"></span>
                                            <span class="preview-items__item-text" v-if="item.type === 'photo'">Фото</span>
                                            <span class="preview-items__item-text" v-else-if="item.type === 'video'">Видео</span>
                                            <span class="preview-items__item-text" v-else>Фото/видео</span>
                                                </span>
                                        </li>
                                    </ul>
                                        </span>
                    </span>

                                </span>
                            </li>

                            <!--*/-->
                        </ul>
                        <!--<div class="filter-results__empty" v-else>-->
                        <!--Элементы не найдены-->
                        <!--</div>-->
                        <!--<button  @click="showNextPage" class="filter-results__show-more button button&#45;&#45;aqua">Загрузить еще <span>20</span></button>-->
                    </div>
                    </div>
                    <!--<filter-results :vendorResults="filterResult"></filter-results>-->
                </section>
            </main>

</template>

<script>
    import PageHeader from '~/components/PageHeader/PageHeader.vue';
    import PageFooter from '~/components/PageFooter.vue';
    import CatalogFilter from '~/components/CatalogFilter.vue';
    import VendorTypes from "~/components/FilterElements/CatalogVendorType.vue";
    import PreviewGallery from "~/components/CatalogFilterElements/PreviewVendorGallery.vue";
    import Multiselect from 'vue-multiselect';
    import axios from 'axios';

    export default {
        watchQuery: ['page'],
        layout: 'catalog',
        components: {
            'page-header': PageHeader,
            'page-footer': PageFooter,
            'catalog-filter': CatalogFilter,
            'vendor-types': VendorTypes,
            'preview-gallery': PreviewGallery,
            'multiselect': Multiselect,
        },
        head: {
            title: 'Начинка каталог'
        },

        asyncData ({ params, query, app, store }) {

            let city = query.city;
            let page = +query.page || 0;
            let filterUrl = params.filter;
            let currentCatalogList = store.state.catalogVendorsList;
            let sort = 'hotDate';
            let filterResult = [];
            let checkedTags = [];
            let filterData = [];
            let price = {};
            let date = {
                from: query.dateFrom,
                to: query.dateTo
            };

            if(query.sort) {
               sort = query.sort;
            }
            if(query.priceFrom && query.priceTo) {
                price.from = +query.priceFrom;
                price.to = +query.priceTo;
            }
            if (!query.priceType) {
                if (+params.vendorType === 5) {
                    price.type = 'event';
                } else if (+params.vendorType === 2) {
                    price.type = 'hour';
                } else if (+params.vendorType === 6) {
                    price.type = 'person';
                } else {
                    price.type = 'full';
                }
            } else {
                price.type = query.priceType;
            }
            if (filterUrl.toLowerCase().indexOf('filter_') >= -1) {
                filterUrl = filterUrl.substring(7);
            }
            const categories = filterUrl.split('_i_');
            const paramsToSend = [];
            if (categories[0] !== '' && categories[0].indexOf("date") === -1) {
                categories.forEach((el, ind) => {
                    let dirtyValues = el.split('_ili_');
                    let firstValue = dirtyValues[0].split('_')[1];
                    let valuesToSet = dirtyValues.slice();
                    valuesToSet.shift();
                    valuesToSet.unshift(firstValue);

                    paramsToSend.push({
                        code: dirtyValues[0].split('_')[0],
                        values: valuesToSet
                    })
                });
            }


            if(paramsToSend.length > 0) {
                filterData = paramsToSend;
            };
            // https://nachinka.me
            return app.$axios({
                method: 'post',
                url: "https://nachinka.me/api/catalog/",
                data: {
                    "speciality": +params.vendorType,
                    "properties": filterData,
                    "price": price,
                    "date": date,
                    "city": city,
                    "page": page,
                    "sort": sort
                }
            }).then((response) => {
                let props = response.data.props;
                let newArray = [];
                filterResult = response.data.vendors;
                if(currentCatalogList.length > 0) {
                    if (+params.vendorType === currentCatalogList[0].speciality.id) {
                        newArray = currentCatalogList.concat(filterResult);
                    }  else {
                        newArray = filterResult;
                    }

                }  else {
                    newArray = filterResult;
                }
                for(let i = 0; i < filterResult.length; i++) {
                    let photosArray = filterResult[i].photos_in_list;
                    let videosArray = filterResult[i].videos_in_list;
                    let mergedArray = [];
                    let emptyValuesCount = 0;
                    mergedArray.length = 3;
                    photosArray.forEach((el, ind) => {
                        el.type = 'photo';
                        el.preview = el.media.preview;
                        el.detail = el.media.link;
                        mergedArray[el.sort] = el;
                    })
                    videosArray.forEach((el, ind) => {
                        el.type = 'video';
                        mergedArray[el.sort] = el;
                    })

                    if(mergedArray.includes(undefined)) {
                        for (let i = 0; i < mergedArray.length; i++) {
                            if (typeof mergedArray[i] === "undefined") {
                                emptyValuesCount++;
                                mergedArray[i] = {type: 'empty', preview: '', sort: i};
                            }
                        }
                    }
                    if(emptyValuesCount > 2) {
                        filterResult[i].allPreviewsEmpty = true;
                    } else {
                        filterResult[i].allPreviewsEmpty = false;
                    }
                    filterResult[i].previewItems = mergedArray;
                }

                store.commit('setCatalogVendorsList', newArray);

                for(let key in props) {
                    let checkedValues = [];
                    let checkedTagsTitles = [];
                    if(Object.keys(props[key].values).length > 0) {
                        for (let value in props[key].values) {
                            if (props[key].values[value].checked) {
                                checkedValues.push(props[key].values[value].code);
                                checkedTagsTitles.push({
                                    code: props[key].values[value].code,
                                    title: props[key].values[value].title
                                });
                            }
                        }
                    }
                    checkedTags.push({code: props[key].code, values: checkedTagsTitles});
                }
                return {
                    urlParams: paramsToSend,
                    vendorType: +params.vendorType,
                    checkedTags: checkedTags,
                    vendorResults: filterResult
                }
            });
        },
        data() {
            return {
                specialities: [],
                vendorsList: [],
                checkedSpeciality: null,
                showPreview: false,
                previewWatching: [],
                previewIndex: 0,
                sortList: [
                    {label: 'Горящие', value: 'hotDate'},
                    {label: 'Дороже', value: 'expensive'},
                    {label: 'Дешевле', value: 'cheaper'}
                ],
                sort: {}
                // pageNumber: 0,
                // vendorResults: []
            }
        },
        computed: {
            pageNumber: {
               get: function () {
                    let currentNumber = this.$route.query.page || 0;
                    return currentNumber;
               },
               set: function (newValue) {

               }
            }
        },
        methods: {
            checkSort(sort) {
                this.sort = sort;
            },
            scrollToTop: function (event) {

                this.scrollToAnchor(document.scrollingElement || document.documentElement, 0, 100);
            },
            scrollToAnchor: function scrollTo(element, to, duration) {
                if (duration <= 0) {
                    return;
                };
                var difference = to - element.scrollTop;
                var perTick = difference / duration * 10;
                setTimeout(function() {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop  === to) {

                        return;
                    };
                    scrollTo(element, to, duration - 10);
                }, 10);
            },
            handleBannerClick() {
                if(this.$store.state.auth.loggedIn) {
                    this.$router.push({name: 'cabinet-tenders', path: '/cabinet/tenders/',
                        params: {
                            showPopup: true
                        }})
                } else {
                    if(window) {
                        window.localStorage.setItem('showTenderTab', true);
                    }
                    this.$router.push(
                        {
                            path: '/login/',
                            query: {
                                type: 'client'
                            }
                        });
                }
            },
            handleScroll(event) {
                const upButton = this.$refs.upButton;
                if (window.pageYOffset > 180) {
                    upButton.classList.add('catalog__button-up--show');
                    upButton.classList.remove('catalog__button-up--hide');
                } else {
                    upButton.classList.remove('catalog__button-up--show');
                    upButton.classList.add('catalog__button-up--hide');
                }
            },

            showNextPage() {
                this.$router.push({query: Object.assign({}, this.$route.query, { page: +this.pageNumber + 1 })})
            },
            handleCheckedSpeciality(event) {
                this.checkedSpeciality = event.checkedSpeciality;
            },
            handleShowPreview(event) {
                this.showPreview = event;
            },
            showPreviewGallery(index, previewItems) {
              this.previewWatching = previewItems;
              this.previewIndex = index;
              this.showPreview = true;
            },
            prettifyPrice(value) {
                let val = (value/1).toFixed(0).replace('.', ' ');
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            },
            prettifyFreeDate(date) {
                let correctDate = date;
                if(typeof date === "string") {
                    if (date.indexOf('.') > -1) {
                        correctDate = correctDate.replace(/[.]/g, '-');
                    }
                }
                let resultDate = new Date(correctDate);
                let options = {
                    year: '2-digit',
                    month: 'long',
                    day: 'numeric',
                };
                resultDate = resultDate.toLocaleDateString('ru', options);
                resultDate = resultDate.substr(0, resultDate.length - 2);
                resultDate = resultDate.split(' ');
                const month = resultDate[1];
                const slash = '/' + resultDate[2];
                resultDate[1] = month + slash;
                resultDate[2] = '';
                resultDate = resultDate.join(' ');
            return resultDate;

            },
            prettifyHotDate(date) {
                let resultDate = new Date(date);
                let options = {
                    year: '2-digit',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short',
                };
                resultDate = resultDate.toLocaleDateString('ru', options).replace(', ', ' — ');
                resultDate = resultDate.substr(0, resultDate.length - 2);
                resultDate = resultDate.split(' ');
                const month = resultDate[3];
                const slash = '/' + resultDate[4];
                resultDate[3] = month + slash;
                resultDate[4] = '';
                resultDate = resultDate.join(' ');

              return  resultDate;
            },
            handleVendorResults(data) {
                let filterResult = data;

                for(let i = 0; i < filterResult.length; i++) {
                    let photosArray = filterResult[i].photos_in_list;
                    let videosArray = filterResult[i].videos_in_list;
                    let mergedArray = [];
                    let emptyValuesCount = 0;
                    mergedArray.length = 3;
                    photosArray.forEach((el, ind) => {
                        el.type = 'photo';
                        el.preview = el.media.preview;
                        mergedArray[el.sort] = el;
                    })
                    videosArray.forEach((el, ind) => {
                        el.type = 'video';
                        mergedArray[el.sort] = el;
                    })

                    if(mergedArray.includes(undefined)) {
                        for (let i = 0; i < mergedArray.length; i++) {
                            if (typeof mergedArray[i] === "undefined") {
                                emptyValuesCount++;
                                mergedArray[i] = {type: 'empty', preview: '', sort: i};
                            }
                        }
                    }
                    if(emptyValuesCount > 2) {
                        filterResult[i].allPreviewsEmpty = true;
                    } else {
                        filterResult[i].allPreviewsEmpty = false;
                    }
                    filterResult[i].previewItems = mergedArray;
                }
                this.vendorResults = filterResult;

            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ' ');
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            },
            analyticsEvent() {
                if(window) {
                    if(+this.$route.params.vendorType === 6) {
                        window.Marquiz.showModal('5c8b8a1f2c49700044bc45a6');
                    }
                    window.yaCounter48643421.reachGoal('click_on_tender');

                }
            },
        },
        beforeCreate() {
            this.vendorsList = this.vendorResults;
        },
        mounted() {
            document.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            document.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>

<style>

</style>