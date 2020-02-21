<template>
    <div class="offers-elements-holder">
        <div v-if="screenSize === 'smartphone'" class="offers-elements">
            <ul class="offers-elements__list" >
                <li class="offers-elements__item"  v-for="(item, index) in filterResult" :key="index">
                    <router-link :to="'/catalog/vendor/' + item.id + '/'" class="vendor-card">
                        <span class="vendor-card__image" :style="{'background-image': 'url(' + item.profilePic + ')'}"></span>
                        <span class="vendor-card__descr">
                        <span class="vendor-card__role" v-text="item.speciality.title"></span>
                        <span class="vendor-card__name" v-if="[2,5,6].indexOf(item.speciality.id) === -1">{{item.firstName}}
{{item.lastName}}</span>
                        <span class="vendor-card__name" v-else v-text="item.placename"></span>
                        <span class="vendor-card__prices" v-if="item.prices.length > 0">
                          <span class="vendor-card__price" v-for="priceItem in item.prices" :key="priceItem.type">
                                <span v-if=" typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type" class="vendor-card__price-sum" v-text="prettifyPrice(item['nearestHotDate'].price)"></span>
                                <span v-else class="vendor-card__price-sum" v-text="prettifyPrice(priceItem.price)"></span>
                                <span class="vendor-card__price-sum">₽</span>
                                <span class="vendor-card__price-delimiter"> / </span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'full'">день</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'hour'">час</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'person'">за человека</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'event'">выступление</span>
                                 <span v-if="typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type" class="vendor-card__price vendor-card__price--old">{{prettifyPrice(priceItem.price)}} ₽</span>
                            </span>

                            <!--<span v-if="item['nearestHotDate'].type === item.prices[0].type" class="vendor-card__price vendor-card__price&#45;&#45;old">{{item.prices[0].price}} ₽</span>-->
                            <!--<span class="vendor-card__price vendor-card__price&#45;&#45;old">60 000 руб.</span>-->
                        </span>

                        <span class="vendor-card__hot-date hot-date" v-if="typeof item['nearestHotDate'] === 'object' && typeof item['nearestHotDate'].date !== 'undefined'">
                            <span class="hot-date__date" v-text="prettifyHotDate(item['nearestHotDate'].date)">Пн — 5 февраля/18</span>
                            <span class="hot-date__descr">горящая дата</span>
                        </span>
                    </span>
                    </router-link>
                </li>
            </ul>
        </div>
    <div v-else class="offers-elements" v-swiper:mySwiper="swiperOption" :class="{'offers-elements--slider': screenSize === 'tablet' || 'desktop'}" ref="mySwiper">
        <ul class="offers-elements__list" :class="{'swiper-wrapper': screenSize === 'tablet' || 'desktop'}">
            <li class="offers-elements__item" :class="{'swiper-slide': screenSize === 'tablet' || 'desktop'}" v-for="(item, index) in filterResult" :key="index">
                <router-link :to="'/catalog/vendor/' + item.id + '/'" class="vendor-card">
                    <span class="vendor-card__image" :style="{'background-image': 'url(' + item.profilePic + ')'}"></span>
                    <span class="vendor-card__descr">
                        <span class="vendor-card__role" v-text="item.speciality.title"></span>
                        <span class="vendor-card__name" v-if="[2,5,6].indexOf(item.speciality.id) === -1">{{item.firstName}}
{{item.lastName}}</span>
                        <span class="vendor-card__name" v-else v-text="item.placename"></span>
                        <span class="vendor-card__prices" v-if="item.prices.length > 0">
                          <span class="vendor-card__price" v-for="priceItem in item.prices" :key="priceItem.type">
                                <span v-if=" typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type" class="vendor-card__price-sum" v-text="prettifyPrice(item['nearestHotDate'].price)"></span>
                                <span v-else class="vendor-card__price-sum" v-text="prettifyPrice(priceItem.price)"></span>
                                <span class="vendor-card__price-sum">₽</span>
                                <span class="vendor-card__price-delimiter"> / </span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'full'">день</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'hour'">час</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'person'">за человека</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'event'">выступление</span>
                                 <span v-if="typeof item['nearestHotDate'] === 'object' && item['nearestHotDate'].type === priceItem.type" class="vendor-card__price vendor-card__price--old">{{prettifyPrice(priceItem.price)}} ₽</span>
                            </span>

                            <!--<span v-if="item['nearestHotDate'].type === item.prices[0].type" class="vendor-card__price vendor-card__price&#45;&#45;old">{{item.prices[0].price}} ₽</span>-->
                            <!--<span class="vendor-card__price vendor-card__price&#45;&#45;old">60 000 руб.</span>-->
                        </span>

                        <span class="vendor-card__hot-date hot-date" v-if="typeof item['nearestHotDate'] === 'object' && typeof item['nearestHotDate'].date !== 'undefined'">
                            <span class="hot-date__date" v-text="prettifyHotDate(item['nearestHotDate'].date)">Пн — 5 февраля/18</span>
                            <span class="hot-date__descr">горящая дата</span>
                        </span>
                    </span>
                </router-link>
            </li>
        </ul>
    </div>
        <div class="offers-elements__arrow offers-elements__arrow--prev"></div>
        <div class="offers-elements__arrow offers-elements__arrow--next"></div>
        <div class="offers-elements__pagination pagination"></div>
    </div>

</template>

<script>

    export default {
        name: "VendorsList",
        components: {},
        data() {
            return {
                screenSize: 'desktop',
                swiperOption: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    grabCursor: true,
                    spaceBetween: 20,
                    speed: 500,
                    setWrapperSize: true,
                    watchOverflow: true,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        // when window width is <= 640px
                        768: {
                            slidesPerView: 'auto',
                            slidesPerGroup: 3,
                            spaceBetween: 20,
                            // centeredSlides: true
                        }
                    },
                    navigation: {
                        nextEl: '.offers-elements__arrow--next',
                        prevEl: '.offers-elements__arrow--prev',
                        disabledClass: 'offers-elements__arrow--disabled'
                    },
                    pagination: {
                        el: '.offers-elements__pagination.pagination',
                        clickable: true,
                        type: 'bullets',
                        bulletClass: 'pagination__dot',
                        renderBullet: function (index, className) {
                            return '<span class="pagination__dot ' + className + '"></span>';
                        },
                        bulletActiveClass: 'pagination__dot--active'
                    },
                }
            }
        },

        props: {
            filterResult: {
                default: function () {
                    return [];
                },
                type: Array
            }
        },
        watch: {
          filterResult: function (val) {
              if(val) {
                  const vendorsList = document.querySelector('.offers-elements__list');
                  if(this.mySwiper) {
                      this.mySwiper.slideTo(0, 0);
                  }
                  this.scrollToAnchor(vendorsList, 0, 10);
              }
          },
          screenSize: function (val) {

              // if(val === 'smartPhone' || 'tablet') {
              //     this.mySwiper.destroy(true, true);
              // } else {
              //     this.mySwiper.reInit();
              // }
          }
        },
        methods: {
            handleWindowResize() {
                let screenSizeInEm = window.innerWidth;
                console.log(screenSizeInEm)
                if (screenSizeInEm < 768) {
                    this.screenSize = 'smartphone';
                }
                else if (screenSizeInEm > 767 && screenSizeInEm < 1024) {
                    this.screenSize = 'tablet';
                }
                else if (screenSizeInEm > 1023) {
                    this.screenSize = 'desktop';
                }

                return this.screenSize;
            },
            prettifyHotDate(date) {
                let correctDate = date.replace(/[.]/g, '-');
                let resultDate = new Date(correctDate);
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
            prettifyPrice(value) {
                let val = (value/1).toFixed(0).replace('.', ' ');
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            },
            scrollToAnchor: function scrollTo(element, to, duration) {

                if (duration <= 0) {
                    return;
                };
                var difference = to - element.scrollLeft;

                var perTick = difference / duration * 10;
                setTimeout(function() {
                    element.scrollLeft = element.scrollLeft + perTick;
                    if (element.scrollLeft  === to) {
                        return;
                    };
                    scrollTo(element, to, duration - 10);
                }, 10);
            },
        },
        updated() {
                const breakpoint = window.matchMedia( '(min-width:1023)' );
                let mySwiper;

                const breakpointChecker = () => {
                    if ( breakpoint.matches === true ) {
                        if ( this.mySwiper !== undefined ) this.mySwiper.destroy( true, true );
                        return;
                    } else if ( breakpoint.matches === false ) {
                        // return enableSwiper();
                    }

                };
                // const enableSwiper = () => {
                //             console.log('my swiper', this.mySwiper)
                //     // mySwiper = new Swiper ('.swiper-container', this.swiperOption);
                //
                // };
                // keep an eye on viewport size changes
                breakpoint.addListener(breakpointChecker);
                // kickstart
                breakpointChecker();
        },
        mounted() {
            this.handleWindowResize();
            window.addEventListener('resize', this.handleWindowResize);

            setTimeout(() => {
                this.mySwiper.navigation.update();
                //this.mySwiper.pagination.update();
            }, 400);
        },
        destroyed() {
            window.removeEventListener('resize', this.handleWindowResize);
        }
    }

</script>