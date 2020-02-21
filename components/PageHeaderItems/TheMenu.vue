<template>
    <div class="page-header__menu-holder" :class="{'page-header__menu-holder--opened': menuOpened}">
    <nav class="page-header__menu menu" :class="{'menu--opened': menuOpened, 'menu--search-opened': searchFieldShowed}">
        <div class="menu__top">
           <search @showSearchField="searchIsShowing" @searchResults="handleSearchResult($event)"></search>
        </div>
        <div class="menu__search-results" v-if="filteredVendors.length > 0 && searchValue && hideBurger">
            <ul class="menu__search-list">
                <li v-for="item in filteredVendors" :key="item.id" class="menu__search-item">
                                       <span class="vendor-card vendor-card--filter"
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
                               <nuxt-link :to="{path: '/catalog/vendor/' + item.id + '/', query: {catalog: true}}"
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
        <div class="menu__list-holder">
            <ul class="menu__list">
                <li class="menu__item menu__item--black" @click="closeMenu" v-if="!$auth.loggedIn">
                    <nuxt-link to="/login/">Вход / Регистрация</nuxt-link>
                </li>
                <li class="menu__item" v-for="speciality in $store.state.specialities" :key="speciality.id" @click="closeMenu">
                    <nuxt-link :to="{path:'/catalog/' + speciality.id + '/filter_',
                    query: {
                     city: $store.state.userCity.id
                    }}" v-text="speciality.title"></nuxt-link>
                </li>
                <li class="menu__item menu__item--black" @click="closeMenu">
                    <nuxt-link to="/">Главная</nuxt-link>
                </li>
                <li class="menu__item menu__item--black" @click="closeMenu">
                    <nuxt-link to="/about/">О проекте</nuxt-link>
                </li>
                <li class="menu__item menu__item--black" @click="closeMenu" v-if="$auth.loggedIn">
                    <nuxt-link to="/cabinet/">Личный кабинет</nuxt-link>
                </li>
                <li class="menu__item menu__item--black" @click="logout" v-if="$auth.loggedIn">
                    <div>Выйти</div>
                </li>
            </ul>
        </div>
    </nav>
    <div class="page-header__burger burger" :class="{'burger--open': menuOpened, 'burger--hide': hideBurger}" @click="openMenu">
        <span class="burger__bar"></span>
    </div>
    </div>
</template>

<script>
    import AppSearch from "../Utils/TheAppSearch.vue"
    export default {
        name: 'AppMenu',
        components: {
            'search': AppSearch

        },
        data() {
            return {
                menuOpened: false,
                hideBurger: false,
                searchFieldShowed: false,
                searchValue: '',
                specialities: [],
                vendorsList: this.$store.state.vendorsList
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
        watch: {
            searchValue(value) {
                this.$store.commit('setSearchQuery', value);
            },
            menuOpened (value) {
                const pageHeaderClassList = document.querySelector('.page-header').classList;
                const bodyClassList = document.querySelector('body').classList;
                if (value) {
                    pageHeaderClassList.add('page-header--opened');
                    // pageHeaderClassList.add('no-scroll');
                } else {
                    pageHeaderClassList.remove('page-header--opened');
                    // pageHeaderClassList.remove('no-scroll');
                }
            },
        },
        methods: {
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
            openMenu()  {
                this.menuOpened = !this.menuOpened;
            },
            handleSearchResult(value) {
                this.searchValue = value;

            },
            closeMenu() {
              this.menuOpened = false;
                const pageHeaderClassList = document.querySelector('.page-header').classList;
                const bodyClassList = document.querySelector('body').classList;
                if (this.menuOpened) {
                    pageHeaderClassList.add('page-header--opened');
                    // pageHeaderClassList.add('no-scroll');
                }
                else {
                    pageHeaderClassList.remove('page-header--opened');
                    // pageHeaderClassList.remove('no-scroll');
                }
            },
            logout() {
                this.$axios({
                    method: 'post',
                    url: '/api/logout/',
                    data: {
                        token: this.$auth.$storage['_state']['_token.local'].split(' ')[1]
                    }
                }).then((response) => {
                    this.menuOpened = false;
                    this.$auth.logout();
                    this.$store.commit({
                        type: 'setAvailableChats',
                        chats: []
                    });
                });

            },
            clickEvent: function () {
            },
            searchIsShowing: function (obj) {
                this.searchFieldShowed = obj.searchFieldVisible;
                this.hideBurger = obj.hideBurger;
            },

        },

    }
</script>
