<template>
    <div class="wrapper">
        <div class="page-wrapper">
            <preview-gallery v-if="showPreview" @showGallery="handleShowPreview($event);" :currentIndex="previewIndex" :galleryItems="previewWatching">
            </preview-gallery>
            <page-header></page-header>
            <main class="main ">
                <div class="main__background main__background--short">
                    <div class="main__logo">
                        <svg width="268px" height="190px" viewBox="0 0 268 190" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
                            <title>Combined Shape</title>
                            <desc>Created with Sketch.</desc>
                            <defs>
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
                        <!--<vendor-types class="vendor-type&#45;&#45;search" :specialities="$store.state.specialities"></vendor-types>-->

                <form action="" class="search-page" ref="searchForm">
                    <div class="search-page__input-holder">
                  <!--<input type="text" placeholder="Поиск в каталоге" v-model="searchValue" class="search-page__input input input&#45;&#45;full-width input&#45;&#45;search-page" @keydown="stopTyping" @keyup="filterVendors($event)"/> -->
                   <input type="text" placeholder="Поиск в каталоге" v-model="searchValue" class="search-page__input input input--full-width input--search-page" />
                    <i class="search-page__closer" v-show="searchValue" @click="resetForm"></i>
                    </div>
                    <p class="search-page__tip" v-show="!searchValue">
                        Поиск по имени или названию
                    </p>

                    <div class="search-page__results" >
                        <div class="search-page__empty" v-if="filteredVendors.length === 0 && searchValue">
                            <p class="search-page__empty-text">По вашему запросу ничего не найдено.
                                Попробуйте изменить формулировку
                                или воспользуйтесь каталогом.
                            </p>
                            <nuxt-link to="/catalog/1/filter_/" class="search-page__empty-button button button--violet">Перейти в каталог</nuxt-link>
                        </div>
                        <ul class="search-page__results-list" v-if="filteredVendors.length > 0 && searchValue">
                            <li v-for="item in filteredVendors" :key="item.id" class="search-page__results-item">
                                       <span class="vendor-card vendor-card--filter vendor-card--search"
                                             :class="{'vendor-card--filter-hot': typeof item['nearestHotDate'].type !== 'undefined'}">
                                           <nuxt-link
                                                   :to="{path: '/catalog/vendor/' + item.id + '/', query: {search: true}}"
                                                   class="vendor-card__image"
                                                   :style="{'background-image': 'url(' + item.profilePic +')'}"></nuxt-link>
                                           <nuxt-link
                                                   :to="{path: '/catalog/vendor/' + item.id + '/', query: {search: true}}"
                                                   class="vendor-card__arrow"></nuxt-link>
                                           <span class="vendor-card__descr">
                               <span class="vendor-card__role">{{item.speciality.title}}</span>
                               <nuxt-link :to="{path: '/catalog/vendor/' + item.id + '/', query: {search: true}}"
                                          class="vendor-card__name" v-if="!item.placename">{{item.firstName}} {{item.lastName}}</nuxt-link>
                               <nuxt-link :to="{path: '/catalog/vendor/' + item.id + '/', query: {search: true}}"
                                          class="vendor-card__name" v-else>{{item.placename}}</nuxt-link>
                               <span class="vendor-card__prices">
                                   <span class="vendor-card__price" v-for="(priceItem, index) in item.prices"
                                         :key="item.id + index">
                                       <span v-if=" typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type"
                                             class="vendor-card__price-sum"
                                             v-text="prettifyPrice(item['nearestHotDate'].price)"></span>
                                       <span v-else class="vendor-card__price-sum"
                                             v-text="prettifyPrice(priceItem.price)"></span><span
                                           class="vendor-card__price-sum">₽</span>
                                       <span class="vendor-card__price-delimiter"> / </span>
                                       <span class="vendor-card__price-for" v-if="priceItem.type === 'full'">день</span>
                                       <span class="vendor-card__price-for" v-if="priceItem.type === 'hour'">час</span>
                                       <span class="vendor-card__price-for" v-if="priceItem.type === 'person'">за человека</span>
                                       <span class="vendor-card__price-for" v-if="priceItem.type === 'event'">за выступление</span>
                                        <span v-if="typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type"
                                              class="vendor-card__price vendor-card__price--old">{{prettifyPrice(priceItem.price)}} ₽</span>
                                   </span>
                                   <!--<span class="vendor-card__price vendor-card__price&#45;&#45;old">60 000 руб.</span>-->
                               </span>
                               <span class="vendor-card__hot-date hot-date"
                                     v-if="typeof item['nearestHotDate'].type !== 'undefined'">
                                   <span class="hot-date__date"
                                         v-text="prettifyHotDate(item['nearestHotDate'].date)"></span>
                                   <span class="hot-date__descr">горящая дата</span>
                               </span>
                                               <span v-else class="vendor-card__closest">
                                                   <span class="vendor-card__closest-head">Ближайшая дата:</span>
                                                   <span class="vendor-card__closest-date"
                                                         v-text="prettifyFreeDate(item['nearestFreeDate'])"></span>
                                               </span>
                                               <ul class="vendor-card__preview preview-items preview-items--card">
                                                       <li class="preview-items__item"
                                                           :class="[{'preview-items__item--photo': preview.type === 'photo'}, {'preview-items__item--video': preview.type === 'video'}, {'preview-items__item--empty': preview.type === 'empty'}]"
                                                           v-for="(preview, previewIndex) in item.previewItems"
                                                           :key="previewIndex"
                                                           :style="{'background-image': 'url(' + preview.preview + ')'}"
                                                           @click="showPreviewGallery(previewIndex, item.previewItems)">
                                                   <span class="preview-items__item-holder">
                                                   <span class="preview-items__item-icon"></span>
                                                   <span class="preview-items__item-text" v-if="item.type === 'photo'">Фото</span>
                                                   <span class="preview-items__item-text"
                                                         v-else-if="item.type === 'video'">Видео</span>
                                                   <span class="preview-items__item-text" v-else>Фото/видео</span>
                                                       </span>
                                               </li>
                                           </ul>
                           </span>

                                       </span>
                            </li>

                        </ul>
                    </div>
                </form>
            </main>
        </div>
        <page-footer></page-footer>
    </div>
</template>

<script>
    import PageHeader from '~/components/PageHeader/PageHeader.vue';
    import PageFooter from '~/components/PageFooter.vue';
    import PreviewGallery from "~/components/CatalogFilterElements/PreviewVendorGallery.vue";
    import VendorTypes from "~/components/FilterElements/CatalogVendorType.vue";
    export default {
        name: "Search",
        head: {
            title: "Страница поиска"
        },

        components: {
            'page-header': PageHeader,
            'page-footer': PageFooter,
            'vendor-types': VendorTypes,
            'preview-gallery': PreviewGallery
        },
        async asyncData({ params, error, store, app }) {
            if(!store.state.vendorsList.length) {
                const vendors = await app.$axios.post('/api/catalog/', {
                    speciality: -1,
                    properties: [],
                    // sort: "hotDateToday"
                })
                store.commit('setVendors', vendors.data.vendors);
            }
        },
        data() {
            return {
                vendorsList: this.$store.state.vendorsList,
                searchValue: this.$store.state.searchQuery,
                showEmptyMessage: false,
                typingTimer: '',
                vendorsFilteredList: [],
                showPreview: false,
                previewWatching: [],
                previewIndex: 0
            }
        },
        watch: {
          searchValue: function (newVal) {
              if(!newVal) {
                  // this.vendorsFilteredList = [];
              }
          },
            filteredVendors: function (newVal) {
                if(newVal) {
                    this.handleVendorResults(newVal)
                }
            }
        },
        computed: {
            filteredVendors() {

                return this.vendorsList.filter(vendor => {
                    if ([2, 5, 6].indexOf(vendor.speciality.id) + 1) {
                        if (vendor.placename) {
                            return vendor.placename.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) !== -1;
                        }
                    } else {
                        if (vendor.firstName && vendor.lastName) {
                            return `${vendor.firstName} ${vendor.lastName}`.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) === 0 || `${vendor.lastName} ${vendor.firstName}`.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) === 0;
                        }
                    }
                })
            }
        },
        methods: {
            stopTyping() {
                clearTimeout(this.typingTimer);
            },
            handleShowPreview(event) {
                this.showPreview = event;
            },
            handleVendorResults(results) {
                let filterResult = results;

                for(let i = 0; i < filterResult.length; i++) {
                    let photosArray = filterResult[i].photos_in_list;
                    let videosArray = filterResult[i].videos_in_list;
                    let mergedArray = [];
                    mergedArray.length = 3;
                    photosArray.forEach((el, ind) => {
                        el.type = 'photo';
                        el.preview = el.media.link;
                        mergedArray[el.sort] = el;
                    })
                    videosArray.forEach((el, ind) => {
                        el.type = 'video';
                        mergedArray[el.sort] = el;
                    })

                    if(mergedArray.includes(undefined)) {
                        for (let i = 0; i < mergedArray.length; i++) {
                            if (typeof mergedArray[i] === "undefined") {
                                mergedArray[i] = {type: 'empty', preview: '', sort: i};
                            }
                        }
                    }
                    filterResult[i].previewItems = mergedArray;
                }

            },
            // filterVendors() {
            //     clearTimeout(this.typingTimer);
            //     this.vendorsFilteredList = [];
            //     let filterTemporary = this.vendorsList.filter(vendor => {
            //         if ([2, 5, 6].indexOf(vendor.speciality.id) + 1) {
            //             if (vendor.placename) {
            //                 return vendor.placename.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) !== -1;
            //             }
            //         } else {
            //             if (vendor.firstName && vendor.lastName) {
            //                 return `${vendor.firstName} ${vendor.lastName}`.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) === 0 || `${vendor.lastName} ${vendor.firstName}`.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) === 0;
            //             }
            //         }
            //     })
            //     this.typingTimer = setTimeout(() => {
            //         this.vendorsFilteredList = filterTemporary;
            //         if(this.vendorsFilteredList.length === 0) {
            //             this.showEmptyMessage = true;
            //         } else {
            //             this.showEmptyMessage = false;
            //         }
            //     }, 600)
            // },
            // print: debounce(function() {
            //     console.log(this)
            //     this.vendorsFilteredList = this.vendorsList.filter(vendor => {
            //         if ([2, 5, 6].indexOf(vendor.speciality.id) + 1) {
            //             if (vendor.placename) {
            //                 return vendor.placename.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) !== -1;
            //             }
            //         } else {
            //             if (vendor.firstName && vendor.lastName) {
            //                 return `${vendor.firstName} ${vendor.lastName}`.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) === 0 || `${vendor.lastName} ${vendor.firstName}`.toLowerCase().indexOf(this.searchValue.toLowerCase().trim()) === 0;
            //             }
            //         }
            //     })
            // }, 100),
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
            resetForm() {
                this.$refs.searchForm.reset();
                this.searchValue = '';
            }
        },

    }
</script>

<style scoped>

</style>