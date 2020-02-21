<template>
    <div class="wrapper">
        <div class="page-wrapper">
            <vendor-gallery v-if="showAlbumDetail" @showGallery="handleShowAlbum($event);" :galleryItems="openedAlbum">
            </vendor-gallery>

            <page-header  :phone="phone" :userInfo="{pic: profilePic, firstName: firstName, lastName: lastName, id: id}" :speciality="speciality.id"></page-header>
            <!--<general-header v-else></general-header>-->
            <main class="main main--detail">
                <!--<div v-if="$store.state.desktop" class="main__background main__background&#45;&#45;short">-->
                    <!--<div class="main__logo">-->
                        <!--<svg width="268px" height="190px" viewBox="0 0 268 190" version="1.1" xmlns="http://www.w3.org/2000/svg"-->
                             <!--xmlns:xlink="http://www.w3.org/1999/xlink">-->
                            <!--&lt;!&ndash; Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch &ndash;&gt;-->
                            <!--<title>Combined Shape</title>-->
                            <!--<desc>Created with Sketch.</desc>-->
                            <!--<defs>-->
                                <!--<linearGradient x1="139.039332%" y1="6.48995536%" x2="0%" y2="100%" id="linearGradient-1">-->
                                    <!--<stop stop-color="#00ADFF" offset="0%"></stop>-->
                                    <!--<stop stop-color="#06F6E1" offset="100%"></stop>-->
                                <!--</linearGradient>-->
                                <!--<linearGradient x1="3.00128483%" y1="98.0970982%" x2="136.164585%" y2="3.046875%" id="linearGradient-2">-->
                                    <!--<stop stop-color="#02DAB1" offset="0%"></stop>-->
                                    <!--<stop stop-color="#FF027D" offset="100%"></stop>-->
                                <!--</linearGradient>-->
                                <!--<path d="M0.00647789026,26.162599 C0.542118441,9.5577419 13.040398,3.48714899 13.040398,3.48714899 C26.9670523,-5.61874038 47.4999401,5.98680489 47.4999401,5.98680489 C47.4999401,5.98680489 227.122201,74.5487954 246.226714,83.4761379 C254.796962,87.5827155 260.867555,91.689293 263.902852,97.7598859 C267.652336,105.080307 267.295242,114.54329 267.295242,121.685164 C267.295242,134.540537 267.295242,222.271247 267.295242,244.23251 C267.295242,252.624212 265.68832,259.587539 262.831571,264.229757 C258.189353,271.550178 251.583119,273.69274 251.583119,273.69274 C251.583119,273.69274 49.4639554,372.967542 42.3220814,376.181385 C35.3587542,379.395228 24.1103027,382.609072 12.8618511,376.717026 C-0.707709511,369.575152 0.00647789026,363.863029 0.00647789026,353.863029 L0.00647789026,26.162599 Z M45.0415053,217.602384 C45.0415053,223.137336 45.2200522,326.044529 45.2200522,326.044529 C45.2200522,326.044529 44.5058648,332.472215 49.6837234,335.864606 C54.8615821,339.256996 59.8608939,335.686059 59.8608939,335.686059 C59.8608939,335.686059 226.980746,259.08946 235.015354,255.339976 C243.228509,251.411945 243.407056,243.912978 243.407056,239.092213 C243.407056,234.271448 243.407056,141.184332 243.407056,127.079131 C243.407056,112.97393 230.373136,117.794694 230.373136,117.794694 C219.481778,121.008538 210.911529,137.613395 193.949578,144.041081 C177.166175,150.468768 172.88105,142.43416 158.240208,147.969112 C143.599367,153.504065 135.921852,175.822421 114.317683,186.356685 C92.7135143,196.890949 76.8228447,182.250107 60.2179876,189.213435 C43.4345837,196.176762 45.0415053,212.067431 45.0415053,217.602384 Z"-->
                                      <!--id="path-3"></path>-->
                            <!--</defs>-->
                            <!--<g id="main" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
                                <!--<g id="фирменный-градиент">-->
                                    <!--<g>-->
                                        <!--<g id="logo_min" transform="translate(0.000000, -45.000000)">-->
                                            <!--<mask id="mask-4" fill="white">-->
                                                <!--<use xlink:href="#path-3"></use>-->
                                            <!--</mask>-->
                                            <!--<g id="Combined-Shape" fill-rule="nonzero">-->
                                                <!--<use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-3"></use>-->
                                                <!--<use fill="url(#linearGradient-2)" fill-rule="evenodd" xlink:href="#path-3"></use>-->
                                            <!--</g>-->
                                        <!--</g>-->
                                    <!--</g>-->
                                <!--</g>-->
                            <!--</g>-->
                        <!--</svg>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="banner banner--detail" v-if="banner"  :style="{'background-image': 'url('  + banner.previewLink  + ')'}"></div>

                <div class="banner banner--detail" v-else></div>
                <!--<div class="banner" v-else="" :style="{'background-image': 'url(' + banner.link + ')'}"></div>-->
                <div class="main__detail-holder">
                <!--<catalog-filter v-if="$store.state.desktop" :specialities="specialities"></catalog-filter>-->
                    <section class="detail-card">
                        <div class="detail-card__photo" :style="{'background-image': 'url(' + profilePic + ')'}">

                        </div>

                        <div class="detail-card__description">
                            <h2 class="detail-card__role" v-text="speciality.title"></h2>
                            <h1 class="detail-card__name" v-if="!placename">{{firstName}} {{lastName}}</h1>
                            <h1 class="detail-card__name" v-else v-text="placename"></h1>
                        </div>
                    </section>
                    <section class="hot-dates hot-dates--detail" v-if="hotDates.length > 0">
                        <ul class="hot-dates__list" :class="{'hot-dates__list--scrollable': hotDates.length > 2}"
                            ref="hotDatesList">
                            <li class="hot-dates__item" v-for="(date, index) in dates" :key="index"
                                v-if="date.priceType">
                                <div class="hot-dates__item-top">
                                    <div class="hot-dates__item-price" v-text="prettifyPrice(date.price)">39 000</div>
                                    <div class="hot-dates__item-currency"> ₽</div>
                                    <div class="hot-dates__item-delimiter"> /</div>
                                    <div class="hot-date__item-per-what" v-if="date.priceType === 'full'">за день</div>
                                    <div class="hot-date__item-per-what" v-if="date.priceType === 'hour'"> за час</div>
                                    <div class="hot-date__item-per-what" v-if="date.priceType === 'event'">выступление
                                    </div>
                                    <div class="hot-date__item-per-what" v-if="date.priceType === 'person'">за
                                        человека
                                    </div>
                                </div>
                                <div class="hot-dates__item-bottom">
                                    <time class="hot-dates__item-time">
                                        <span class="hot-dates__item-day" v-text="prettifyHotDate(date.date)"></span>
                                        <!--— <span class="hot-dates__item-date">5 февраля</span>-->
                                        <!--<span class="hot-dates__date-delimiter">/</span>-->
                                        <!--<span class="hot-dates__item-year">18</span>-->
                                    </time>
                                </div>
                            </li>
                        </ul>
                        <div class="hot-dates__arrows" v-if="hotDates.length > 2">
                            <span class="hot-dates__arrow hot-dates__arrow--prev" @click="slidePrev"></span>
                            <span class="hot-dates__arrow hot-dates__arrow--next" @click="slideNext"></span>
                        </div>
                    </section>
                    <div class="vendor-prices">
                    <h3 class="vendor-prices__title">Стоимость услуг</h3>
                    <ul class="vendor-prices__list">
                        <li class="vendor-prices__item" v-for="price in prices" :key="price.id">
                            <div class="vendor-prices__item-top">
                                <div class="vendor-prices__item-price" v-text="prettifyPrice(price.price)">50 000</div>
                                <div class="vendor-prices__item-currency">₽</div>
                            </div>
                            <div class="vendor-prices__item-bottom" v-if="price.type === 'full'">
                                за день
                            </div>
                            <div class="vendor-prices__item-bottom" v-if="price.type === 'hour'">
                                за час
                            </div>
                            <div class="vendor-prices__item-bottom" v-if="price.type === 'person'">
                                за человека
                            </div>
                            <div class="vendor-prices__item-bottom" v-if="price.type === 'event'">
                                выступление
                            </div>

                        </li>
                    </ul>
                </div>
                    <ul class="vendor-type vendor-type--detail">
                    <li class="vendor-type__item">
                        <input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1"
                               type="radio"/>
                        <label for="tab1" class="vendor-type__label">

                            О<span v-show="speciality.id === 5">б</span> <span> {{specialitiesModified[speciality.id - 1]}}</span>

                        </label>
                    </li>

                    <!--<li class="vendor-type__item">-->
                        <!--<input name="vendor-type" id="tab2" class="vendor-type__input" v-model="openedTab" value="tab2"-->
                               <!--type="radio"/>-->
                        <!--<label for="tab2" class="vendor-type__label">-->
                            <!--Календарь-->
                        <!--</label>-->
                    <!--</li>-->
                    <li class="vendor-type__item">
                        <input name="vendor-type" id="tab3" class="vendor-type__input" v-model="openedTab" value="tab3"
                               type="radio"/>
                        <label for="tab3" class="vendor-type__label" v-if="speciality.id !== 6">
                            Лента событий
                        </label>
                        <label for="tab3" class="vendor-type__label" v-else v-text="$store.state.editableContent['detail_place_tab2']">
                            Услуги
                        </label>
                    </li>
                </ul>

                    <div class="tab-block tab-block--vendor-card">
                    <div class="tab-block__item" v-if="openedTab === 'tab1'">
                     <p class="tab-block__description" :class="{'tab-block__description--rolled': !descrExpanded}" ref="description" v-html="description" :style="{'height': `${descrExpanded ? descrExpandedHeight : descrStartHeight}px`}">
                     </p>
                        <button v-if="descrExpandedHeight > 72" class="tab-block__description-more link" @click.prevent="expandDescription"><span v-if="!descrExpanded">Развернуть</span><span v-else>Свернуть</span> описание </button>
                        <div class="media-holder" v-if="albums.length > 0">
                            <h4 class="media-holder__name">Альбомы</h4>

                        <div class="media-holder__items">
                        <div class="media-element media-element--photo" v-for="album in albums" :key="'album' + album.id" @click="showGallery(album.title, album.photos)">
                            <div class="media-element__pic" :style="{'background-image': 'url(' + album.cover.link || album.photos[0].link + ')'}"></div>
                            <div class="media-element__layer"></div>
                            <div class="media-element__icon-holder">
                                <div class="media-element__icon"></div>
                                <div class="media-element__icon-text" v-text="album.title"></div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div class="media-holder" v-if="videos.length">
                            <h4 class="media-holder__name">Видео</h4>
                            <div class="media-holder__items">
                        <div v-if="videos" v-for="video in videos" class="media-element media-element--video" :key="video.id">
                            <div class="media-element__frame-holder">
                            <iframe class="media-element__frame" :data-src="!$store.state.desktop ? video.link : video.link.replace('controls=0', 'controls=1')" src="" :ref="'frame' + video.id" frameborder="0"  :allowfullscreen="true"></iframe>
                                </div>
                            <div class="media-element__pic" :style="{'background-image': 'url(' + video.preview + ')'}"></div>
                            <div class="media-element__layer"></div>
                            <div class="media-element__icon-holder"  @click="playVideo(video.id);">
                                <div class="media-element__icon"></div>
                                <div class="media-element__icon-text">Смотреть видео</div>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-block__item" v-if="openedTab === 'tab2'">
                        <date-picker :hotDates="hotDates"
                                     :disabledDates="busyDates"></date-picker>
                    </div>
                    <div class="tab-block__item" v-if="openedTab === 'tab3'">
                        <div class="event" v-for="post in posts" :key="post.id">
                            <span class="event__pic" :style="{'background-image': 'url(' + post.photo + ')'}"></span>
                            <span class="event__descr" v-text="post.text"></span>
                            <time class="event__date" v-text="post.date"></time>
                        </div>
                        <p v-if="posts.length === 0">Пока нет публикаций</p>
                    </div>


                </div>
                    <div class="media-block">
                        <!--<div v-if="$store.state.auth.user" class="media-block__item media-block__item&#45;&#45;chat" @click="startDialog"><span class="media-block__item-text">Написать сообщение</span></div>-->
                        <!--<div @click="goToLogin" v-else class="media-block__item media-block__item&#45;&#45;chat">-->
                            <!--<span class="media-block__item-text">Написать сообщение</span>-->
                        <!--</div>-->
                        <button v-if="speciality.id === 6" class="call-button button button--aqua button--date" @click="handleFirstClick" v-text="$store.state.editableContent['detail_place_tab1']">
                        </button>
                        <span @click="clickPhone" v-if="!fullNumber" class="media-block__item media-block__item--phone-hidden"><span>{{phoneNumber}}</span>
                        <span class="media-block__item-button" v-if="!fullNumber" @click="fullNumber = true;" >Показать телефон</span>
                    </span>
                        <a :href="'tel:' + phone" v-else class="media-block__item media-block__item--phone" v-text="phoneNumber">
                        </a>




                    <!--<a v-if="vk" @click="clickVk" target="_blank" :href="vk" class="media-block__item">Vkontakte</a>-->
                    <a v-if="vimeo" @click="clickVimeo" target="_blank" :href="vimeo" class="media-block__item">Vimeo</a>
                    <!--<a v-if="fb" @click="clickFb" target="_blank" :href="fb" class="media-block__item">Facebook</a>-->
                    <a v-if="yt" @click="clickYoutube" target="_blank" :href="yt" class="media-block__item">Youtube</a>
                        <a v-if="site &&  speciality.id === 6" target="_blank" :href="site" class="media-block__item">Сайт площадки</a>
                </div>
                </div>
                <!--<a :href="'tel:' + phone" class="call-button button button&#45;&#45;aqua button&#45;&#45;date">Узнать свободную дату</a>-->
            </main>
        </div>
        <page-footer v-if="$store.state.desktop"></page-footer>
    </div>
</template>

<script>
    import PageHeader from '~/components/PageHeader/PageHeaderCard.vue';
    import PageHeaderGeneral from '~/components/PageHeader/PageHeader.vue';
    import DatePicker from '~/components/VendorDetail/DatePicker.vue';
    import vendorGallery from '~/components/VendorDetail/Gallery.vue';
    import VendorTypes from "~/components/FilterElements/CatalogVendorType.vue";
    import PageFooter from '~/components/PageFooter.vue';
    import axios from 'axios';
    export default {
        // scrollToTop: true,
        components: {
            'page-header': PageHeader,
            'general-header': PageHeaderGeneral,
            'date-picker': DatePicker,
            'vendor-gallery': vendorGallery,
            'vendor-types': VendorTypes,
            'page-footer': PageFooter
        },
//        validate({ params }) {
//            if(!isNaN(+params.id)) {
//                return;
//            }
//        },
//         asyncData({ params, error, app }) {
//                 return app.$axios({
//                     method: 'get',
//                     url: `/api/vendors/${+params.id}/`
//                 }).then((response) => {
//                     console.log('resp', response);
//                     return {
//                         data: response.data,
//                         // title: response.data.firstName
//                     }
//                 })
//                 // const { data } = await axios.get(`/api/vendors/${+params.id}/`);
//                 // console.log(data);
//                 // return data;
//
//         },
        async asyncData({ params, error }) {
            try {
                const { data } = await axios.get(`/api/vendors/${+params.id}/`);
                return data;
            } catch (e) {
            } finally {

            }
        },
        head () {
            let title = `${this.speciality.title} ${this.firstName} ${this.lastName}`;
            if([5,6].indexOf(this.speciality.id) + 1) {
                title = `${this.placename}`;
            }
            return {
                title: title,
                meta: [
                    {hid: 'description', name: 'description', content: title}
                ]
            }
        },
        data() {
            return {
                posts: [],
                albums: [],
                openedTab: 'tab1',
                name: '',
                busyDates: [],
                hotDates: [],
                specialitiesModified: ['ведущем', 'месте', 'фотографе', 'видеооператоре', 'артисте', 'площадке'],
                showAlbumDetail: false,
                dates: [],
                openedAlbum: {
                  title: '',
                  photos: []
                },
                swiperOption: {
                    on: {
                    }
                },
                phone: '',
                descrExpandedHeight: null,
                descrStartHeight: 70,
                descrExpanded: false,
                fullNumber: false,
            }
        },
        computed: {
            phoneNumber: function () {
                if(this.fullNumber) {
                    return this.phone;
                } else {
                    return `${this.phone.substring(0, this.phone.length - 4)}****`;
                }
            },
            directShowNumber() {
                // if([1, 3, 4, 5, 6].indexOf(this.speciality.id) + 1) {
                //     return true
                // } else {
                //     return false
                // }
                return false;
            }
        },
        methods: {
            goToLogin() {
                this.clickSendMessage();
                this.saveUserInfo();
                this.$router.push({path: '/login/', query: {type: 'client'}})
            },
            saveUserInfo() {
                if(window) {
                    window.localStorage.setItem('openChat', JSON.stringify({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userPic: this.profile_pic,
                        id: this.id
                    }));
                }
            },
            handleFirstClick() {
                this.$fb.track('Lead');
                if(window) {
                    if(+this.speciality.id === 6) {
                        window.yaCounter48643421.reachGoal('booking_place', {'vendorId': +this.$route.params.id});
                        window.Marquiz.showModal('5c98bbc6256e560044ae5f57');

                    }
                }
            },
            clickPhone() {
                if(window) {
                    // this.handleFirstClick();
                    window.yaCounter48643421.reachGoal('click_on_phone_number', {'vendorId': +this.$route.params.id});
                }
                this.$ga.event({
                    eventCategory: 'category',
                    eventAction: 'click',
                    eventLabel: 'vendorId',
                    eventValue: +this.$route.params.id
                })
            },
            clickVimeo() {

                if(window) {
                    window.yaCounter48643421.reachGoal('click_on_social_network', {vendorId: +this.$route.params.id, social: 'vimeo'});
                }
                this.$ga.event({
                    eventCategory: 'click_on_social_network',
                    eventAction: 'click',
                    eventLabel: 'clicked vimeo link',
                    eventValue: +this.$route.params.id
                })
            },
            clickSendMessage() {
                if(window) {
                    window.yaCounter48643421.reachGoal('click_on_message', {vendorId: +this.$route.params.id});
                }
            },
            clickVk() {
                if(window) {
                    window.yaCounter48643421.reachGoal('click_on_social_network', {vendorId: +this.$route.params.id, social: 'vk'});
                }
                this.$ga.event({
                    eventCategory: 'click_on_social_network',
                    eventAction: 'click',
                    eventLabel: 'clicked vkontakte link',
                    eventValue: +this.$route.params.id
                })
            },
            clickFb() {
                // this.$ym('48643421')
                // this.$metrika.hit(`${$route.params.id}`);
                if(window) {
                    window.yaCounter48643421.reachGoal('click_on_social_network', {
                        vendorId: +this.$route.params.id,
                        social: 'facebook'
                    });
                }
                this.$ga.event({
                    eventCategory: 'click_on_social_network',
                    eventAction: 'click',
                    eventLabel: 'clicked facebook link',
                    eventValue: +this.$route.params.id
                })
            },
            clickYoutube() {
                if(window) {
                    window.yaCounter48643421.reachGoal('click_on_social_network', {
                        vendorId: +this.$route.params.id,
                        social: 'youtube'
                    });
                }
                this.$ga.event({
                    eventCategory: 'click_on_social_network',
                    eventAction: 'click',
                    eventLabel: 'clicked youtube link',
                    eventValue: +this.$route.params.id
                })
            },
            startDialog() {
                let chats = this.$store.state.availableChats;
                let itemInChats = chats.findIndex((el) => {
                    return el.id === this.id;
                });
                if(itemInChats === -1) {
                    chats.push({
                        body: '',
                        created_at: new Date(),
                        id: this.id,
                        interlocutor: {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            profile_pic: this.profile_pic
                        },
                        read: true,
                        selfMessage: true,
                        new: true,
                        user: this.$store.state.auth.user,
                        user_id: this.$store.state.auth.user.id,
                        user_to: this.id
                    });
                    this.$store.commit({
                        type: 'setAvailableChats',
                        chats: chats
                    });
                    this.$store.commit({
                        type: 'setCurrentDialog',
                        userInfo: {
                            name: `${this.firstName} ${this.lastName}`,
                            userPic: this.profile_pic
                        }
                    });
                }
                this.clickSendMessage();
                this.$router.push(`/cabinet/chat/${this.id}`);
            },
            slideNext() {
                const hotDatesList = this.$refs.hotDatesList;
                const hotDatesListWidth = hotDatesList.scrollWidth;
                let hotDatesListScrollPosition = hotDatesList.scrollLeft;
                if (hotDatesListScrollPosition < hotDatesListWidth) {
                    hotDatesList.scrollLeft = hotDatesListScrollPosition + 295;
                }
            },
            slidePrev() {
                const hotDatesList = this.$refs.hotDatesList;
                const hotDatesListWidth = hotDatesList.scrollWidth;
                let hotDatesListScrollPosition = hotDatesList.scrollLeft;
                if(hotDatesListScrollPosition < hotDatesListWidth) {
                    hotDatesList.scrollLeft = hotDatesListScrollPosition - 295;
                }
            },
            getVendorPosts() {
                axios({
                    method: 'get',
                    url: `/api/vendor/${this.id}/posts/`,
                }).then((response) => {
                    this.posts = response.data;
                });
            },
            getVendorAlbums() {
              axios({
                  method: 'get',
                  url: `/api/vendor/${this.id}/albums`
              }).then((response) => {
                  this.albums = response.data;
              })
            },
            checkDescription() {
                const descrRef = this.$refs.description;
                const descrBlockStartHeight = descrRef.scrollHeight;
                this.descrExpandedHeight = descrBlockStartHeight;
            },
            expandDescription() {

                // const descrRef = this.$refs.description;
                // descrRef.removeAttribute('style');
                if(!this.descrExpanded) {
                    // descrRef.style.height = `${this.descrExpandedHeight}px`;
                    this.descrExpanded = true;
                } else {
                    // descrRef.style.height = `${this.descrStartHeight}px`;
                    this.descrExpanded = false;
                }
            },
            getVendorDates() {
                axios({
                    method: 'get',
                    url: `/api/vendor/${this.id}/calendar/`,
                }).then((response) => {
                    this.dates = response.data;
                    for(let i = 0; i < this.dates.length; i++) {
                        if(this.dates[i].priceType) {
                            this.hotDates.push(this.dates[i].date);
                        } else {
                            this.busyDates.push(this.dates[i].date);
                        }
                    }
                });
            },
            playVideo(index) {
                const url = this.$refs[`frame${index}`][0].dataset.src;
                this.$refs[`frame${index}`][0].src = url;
               this.$refs[`frame${index}`][0].parentElement.classList.add('media-element__frame-holder--play');
//                const url = new URL(this.$refs[`frame${index}`][0].src);
//                const autoplay = url.searchParams.get("autoplay");
//                if(!autoplay) {
//                    this.$refs[`frame${index}`][0].src += "&autoplay=1";
//                }
            },
            handleShowAlbum(data) {
                this.showAlbumDetail = data;
            },
            showGallery(title, photos) {
                this.openedAlbum.title = title;
                this.openedAlbum.photos = photos;
                this.showAlbumDetail = true;
            },
            prettifyPrice(value) {
                let val = (value/1).toFixed(0).replace('.', ' ');
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
        },
        created() {
            this.getVendorPosts();
            this.getVendorDates();
            this.getVendorAlbums();

        },
        mounted() {
            this.$nextTick(function() {
                this.checkDescription();
            });
            // set default number for all users from Yaroslavl
            // console.log('cities');
            let number = ['+79657263251', '+79201029130'];
            var rand = number[Math.floor(Math.random() * number.length)];
            console.log('rand', rand)
           if([1, 3, 61].indexOf(this.cities[0].id) + 1 > 0) {
                setTimeout(() => {

                    this.phone = rand;
                }, 300)
            }
//            axios({
//                method: 'get',
//                url: '/api/vendors/2',
//
//            }).then((response) => {
////                console.log(response);
//            });
        }

    }
</script>
