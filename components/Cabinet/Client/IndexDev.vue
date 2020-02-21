<template>
    <div v-if="userInfo" class="page-wrapper">
        <div class="popup-overlay" v-if="openCreatePopup  || openEventCreation || openEventEditing || openEventChanging"  @click="openCreatePopup = false; openEditPostPopup = false; openPostPopup = false; openEventChanging = false;"></div>
        <transition name="fade">    <create-event v-if="openEventCreation" :date="{months: months, years: futureYears}" :openCreatePopup="openEventCreation" @eventCreation="handlePopupToggle($event)" @eventCreated="refreshEvents($event)"></create-event>
        </transition>
        <no-ssr>
            <transition name="fade">
                <vendor-password @showChangePassword="handleShowChangePassword($event)" v-if="showChangePassword"></vendor-password>
            </transition>
        </no-ssr>
        <transition name="fade">
            <edit-event v-if="openEventEditing"  :event="openedEvent" @eventChanging="handleEventChangingToggle($event)" @editionShow="handleEditionToggle($event)" @eventSaved="refreshEvents($event)"></edit-event>
        </transition>
        <transition name="fade">
            <change-event v-if="openEventChanging"  :event="openedEvent" :date="{months: months, years: futureYears}" @eventChanging="handleEventChangingToggle($event)" @eventChanged="refreshEvents($event)"></change-event>
        </transition>

        <page-header  @selectedMenuItem="handleSelection($event)" class="page-header--cabinet-page"></page-header>
        <main class="main">
            <div class="main__background main__background--short">
                <div class="main__logo">
                    <svg width="268px" height="190px" viewBox="0 0 268 190" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
                        <title>Combined Shape</title>
                        <desc>Created with Sketch.</desc>
                        <defs>
                            <linearGradient x1="139.039332%" y1="6.48995536%" x2="0%" y2="100%" id="linearGradient-1">
                                <stop stop-color="#00ADFF" offset="0%"></stop>
                                <stop stop-color="#06F6E1" offset="100%"></stop>
                            </linearGradient>
                            <linearGradient x1="3.00128483%" y1="98.0970982%" x2="136.164585%" y2="3.046875%" id="linearGradient-2">
                                <stop stop-color="#02DAB1" offset="0%"></stop>
                                <stop stop-color="#FF027D" offset="100%"></stop>
                            </linearGradient>
                            <path d="M0.00647789026,26.162599 C0.542118441,9.5577419 13.040398,3.48714899 13.040398,3.48714899 C26.9670523,-5.61874038 47.4999401,5.98680489 47.4999401,5.98680489 C47.4999401,5.98680489 227.122201,74.5487954 246.226714,83.4761379 C254.796962,87.5827155 260.867555,91.689293 263.902852,97.7598859 C267.652336,105.080307 267.295242,114.54329 267.295242,121.685164 C267.295242,134.540537 267.295242,222.271247 267.295242,244.23251 C267.295242,252.624212 265.68832,259.587539 262.831571,264.229757 C258.189353,271.550178 251.583119,273.69274 251.583119,273.69274 C251.583119,273.69274 49.4639554,372.967542 42.3220814,376.181385 C35.3587542,379.395228 24.1103027,382.609072 12.8618511,376.717026 C-0.707709511,369.575152 0.00647789026,363.863029 0.00647789026,353.863029 L0.00647789026,26.162599 Z M45.0415053,217.602384 C45.0415053,223.137336 45.2200522,326.044529 45.2200522,326.044529 C45.2200522,326.044529 44.5058648,332.472215 49.6837234,335.864606 C54.8615821,339.256996 59.8608939,335.686059 59.8608939,335.686059 C59.8608939,335.686059 226.980746,259.08946 235.015354,255.339976 C243.228509,251.411945 243.407056,243.912978 243.407056,239.092213 C243.407056,234.271448 243.407056,141.184332 243.407056,127.079131 C243.407056,112.97393 230.373136,117.794694 230.373136,117.794694 C219.481778,121.008538 210.911529,137.613395 193.949578,144.041081 C177.166175,150.468768 172.88105,142.43416 158.240208,147.969112 C143.599367,153.504065 135.921852,175.822421 114.317683,186.356685 C92.7135143,196.890949 76.8228447,182.250107 60.2179876,189.213435 C43.4345837,196.176762 45.0415053,212.067431 45.0415053,217.602384 Z"
                                  id="path-3"></path>
                        </defs>
                        <g id="main" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="фирменный-градиент">
                                <g>
                                    <g id="logo_min" transform="translate(0.000000, -45.000000)">
                                        <mask id="mask-4" fill="white">
                                            <use xlink:href="#path-3"></use>
                                        </mask>
                                        <g id="Combined-Shape" fill-rule="nonzero">
                                            <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-3"></use>
                                            <use fill="url(#linearGradient-2)" fill-rule="evenodd" xlink:href="#path-3"></use>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <ul class="vendor-type vendor-type--cabinet vendor-type--in-tabs" ref="vendorTabs">
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/chat/" class="vendor-type__label">Мои сообщения</nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1" type="radio"/>
                    <label for="tab1" class="vendor-type__label">
                        Быстрый подбор
                    </label>
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab2" class="vendor-type__input" v-model="openedTab" value="tab2" type="radio"/>-->
                <!--<label for="tab2" class="vendor-type__label">-->
                <!--Мои сообщения-->
                <!--</label>-->
                <!--</li>-->
                <!--<li class="vendor-type__item">-->
                    <!--<input name="vendor-type" id="tab3" class="vendor-type__input" v-model="openedTab" value="tab3" type="radio"/>-->
                    <!--<label for="tab3" class="vendor-type__label">-->
                        <!--Мои события-->
                    <!--</label>-->
                <!--</li>-->
                <li class="vendor-type__item">
                    <input name="vendor-type" id="tab4" class="vendor-type__input" v-model="openedTab" value="tab4" type="radio"/>
                    <label for="tab4" class="vendor-type__label">
                        Профиль
                    </label>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders/" class="vendor-type__label">Мои тендеры</nuxt-link>
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab5" class="vendor-type__input" v-model="openedTab" value="tab5" type="radio"/>-->
                <!--<label for="tab5" class="vendor-type__label">-->
                <!--Настройки-->
                <!--</label>-->
                <!--</li>-->
            </ul>
            <div class="tab-block tab-block--cabinet">
                <div class="tab-block__item" v-if="openedTab === 'tab1'">
                    <fast-filter></fast-filter>
                </div>
                <!--<div class="tab-block__item" v-if="openedTab === 'tab2'">-->
                <!--<div class="messages">-->
                <!--<nuxt-link to="/chat/1" class="messages__item message-item">-->
                <!--<div class="message-item__pic"><img src="/pic__vendor1.jpg" alt=""></div>-->
                <!--<div class="message-item__right">-->
                <!--<div class="message-item__name">-->
                <!--Константинопольский Константин-->
                <!--</div>-->
                <!--<time class="message-item__time">сегодня в 18:15</time>-->
                <!--<div class="message-item__missed">-->
                <!--2-->
                <!--</div>-->
                <!--</div>-->
                <!--</nuxt-link>-->
                <!--<nuxt-link to="/chat/1" class="messages__item message-item">-->
                <!--<div class="message-item__pic"><img src="/pic__vendor1.jpg" alt=""></div>-->
                <!--<div class="message-item__right">-->
                <!--<div class="message-item__name">-->
                <!--Константинопольский Константин-->
                <!--</div>-->
                <!--<time class="message-item__time">сегодня в 18:15</time>-->
                <!--</div>-->
                <!--</nuxt-link>-->
                <!--<nuxt-link to="/chat/1" class="messages__item message-item">-->
                <!--<div class="message-item__pic"><img src="/pic__vendor1.jpg" alt=""></div>-->
                <!--<div class="message-item__right">-->
                <!--<div class="message-item__name">-->
                <!--Константинопольский Константин-->
                <!--</div>-->
                <!--<time class="message-item__time">сегодня в 18:15</time>-->

                <!--</div>-->
                <!--</nuxt-link>-->
                <!--</div>-->
                <!--</div>-->
                <div class="tab-block__item" v-if="openedTab === 'tab3'">
                    <div class="tab-block__posts posts">
                        <div @click="eventEditing(event)" v-for="(event, index) in events" class="posts__item message-item message-item--profile message-item--event message-item--post" >

                            <div class="message-item__pic" v-text="getDay(event.date)">

                            </div>
                            <div class="message-item__right">
                                <div class="message-item__name" v-text="event.name">
                                </div>
                                <div class="message-item__descr" v-text="prettifyHotDate(event.date)">
                                </div>
                            </div>
                        </div>
                        <div class="tab-block__item-button tab-block__item-button--white tab-block__item-button--events">

                            <button @click.prevent="openEventCreation = true;" class="button button--violet">
                                Создать новое событие
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-block__item tab-block__item--profile" v-if="openedTab === 'tab4'">
                    <!--vendor-profile 100% filled-->
                    <!--<div class="tab-block__full" v-if="userInfo.progress === 100">-->
                    <!--<div class="tab-block__full-text">Вы полностью заполнили свой профиль теперь вы размещены в каталоге сервиса</div>-->
                    <!--<div class="tab-block__full-button button button&#45;&#45;aqua" @click="closeProgressNotification" >Хорошо</div>-->
                    <!--</div>-->



                    <form  action="" class="form form--profile form--client form--desktop-holder">
                        <!--vendor personal info tab-->
                        <div class="events events--vendor">
                            <div class="events__list">
                                <div @click="showTabEvent('showPersonalInfo')" class="events__item message-item message-item--profile events__item--desktop" :class="{'message-item--active': showPersonalInfoDesktop}">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__personal.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Личная информация
                                        </div>
                                    </div>
                                </div>
                                <div @click="showTabEvent('showChangePassword')" :class="{'message-item--active': showChangePasswordDesktop}" class="events__item message-item message-item--password message-item--profile events__item--desktop">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__pass.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Смена пароля
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  v-if="showPersonalInfoDesktop" class="form__group form__group--info personal">
                            <div class="form__group-name">Личная информация</div>
                            <div class="form__input-holder form__input-holder--email">
                                <input type="text" v-model="userInfo.email"   :class="{'form__input--filled': $store.state.auth.user.email.length > 0}"
                                       class="form__input input input--profile input--fillable"
                                />
                                <span class="form__input-placeholder">Логин/e-mail</span>
                            </div>

                            <div class="form__input-holder">
                                <input type="text"
                                       v-model="userInfo.firstName"
                                       :class="{'form__input--filled': $store.state.auth.user.firstName.length > 0}"
                                       class="form__input input input--profile input--fillable"
                                />
                                <span class="form__input-placeholder">Имя</span>
                            </div>


                            <div class="form__input-holder">
                                <input type="text"
                                       v-model="userInfo.lastName"
                                       :class="{'form__input--filled': $store.state.auth.user.lastName.length > 0}"
                                       class="form__input input input--profile input--fillable"/>
                                <span class="form__input-placeholder">Фамилия</span>
                            </div>


                            <no-ssr>
                                <div class="form__input-holder form__input-holder--city">
                                    <multiselect class="form__input multiselect--cabinet" :class="{'multiselect--filled':  currentCity.hasOwnProperty('id')}" v-model="currentCity"
                                                 placeholder="Город"
                                                 :options="cityList"
                                                 :searchable="true"
                                                 :allow-empty="false"
                                                 @select="cityChange"
                                                 label="title">
                                        <span slot="noResult">Город не найден</span>
                                    </multiselect>
                                </div>
                            </no-ssr>
                            <!--<div class="form__input-holder form__input-holder&#45;&#45;city">-->
                            <!--<input type="text"-->
                            <!--v-model="userInfo.cities[0].title"-->
                            <!--:class="{'form__input&#45;&#45;filled': $store.state.auth.user.cities[0].title.length > 0}"-->
                            <!--class="form__input input input&#45;&#45;profile input&#45;&#45;fillable"/>-->
                            <!--<span class="form__input-placeholder">Город</span>-->
                            <!--</div>-->
                            <!--<no-ssr>-->
                            <!--<multiselect class="form__input" v-model="$store.state.cityList"-->
                            <!--placeholder="Пол"-->
                            <!--:options="title"-->
                            <!--:searchable="false"-->
                            <!--label="title"-->
                            <!--&gt;-->
                            <!--</multiselect>-->
                            <!--</no-ssr>-->
                        </div>
                        <div v-if="showPersonalInfoDesktop" class="form__date form__date--bordered date personal">
                            <div class="date__name">Дата рождения</div>
                            <div class="date__element-holder">
                                <div class="date__element">
                                    <label for="day" class="date__element-label">
                                        {{date.day}}
                                    </label>
                                    <select name="day" id="day" v-model="date.day">
                                        <option disabled>День</option>
                                        <option v-for="day in daysCount" :value="day" :key="day">{{day}}</option>
                                    </select>
                                </div>

                                <div class="date__element">
                                    <label for="month" class="date__element-label">
                                        {{date.month}}
                                    </label>
                                    <select name="month" id="month" v-model="date.month">
                                        <option disabled>Мес.</option>
                                        <option v-for="(month, index) in months" :value="index + 1" :key="month">{{month}}
                                        </option>
                                    </select>
                                </div>
                                <div class="date__element">
                                    <label for="year" class="date__element-label">
                                        {{date.year}}
                                    </label>
                                    <select name="year" id="year" v-model="date.year">
                                        <option disabled>Год</option>
                                        <option v-for="year in years" :value="year" :key="year">{{year}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <no-ssr>
                            <transition name="fade">
                                <vendor-password @showChangePassword="handleShowChangePassword($event)" v-if="showChangePasswordDesktop"></vendor-password>
                            </transition>
                        </no-ssr>

                        <div class="profile-pic" :style="{'background-image': 'url(' + profilePic + ')'}" :class="{'profile-pic--default-pic': !profilePic}">
                            <div class="profile-pic__top">Фото профиля</div>
                            <drop-zone class="profile-pic__upload upload upload--profile" ref="userProfilePicClient" :include-styling="false" id="dropzoneClient" :options="dropPostOptions" v-on:vdropzone-max-files-exceeded="changeProfilePic" v-on:vdropzone-success="getProfileThumbNail"></drop-zone>
                            <div class="profile-pic__text">
                                <p v-if="userInfo.speciality">{{userInfo.speciality.title}}</p>
                                <p v-if="userInfo.placename">{{userInfo.placename}}</p>
                                <p v-else>{{userInfo.firstName}} {{userInfo.lastName}}</p>
                            </div>
                        </div>
                        <div @click="showChangePassword = true;" class="message-item message-item--password message-item--profile message-item--wide">
                            <div class="message-item__right">
                                <div class="message-item__name">
                                    Смена пароля
                                </div>
                            </div>
                        </div>

                        <transition name="fade">
                            <div  class="tab-block__fixed-item tab-block__fixed-item--cabinet"  v-if="showPersonalInfoDesktop">
                                <button v-show="showSaveButton" class="button button--fixed button--violet" @click.prevent="saveVendorPersonalInfo">Сохранить</button>
                            </div>
                        </transition>
                    </form>



                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import PageHeader from '~/components/PageHeader/PageHeaderCabinet.vue';
    import Filter from '~/components/Cabinet/Client/FastFilter.vue';
    import CreateEvent from '~/components/Cabinet/Client/CreateEvent.vue';
    import EditEvent from '~/components/Cabinet/Client/EditEvent.vue';
    import ChangeEvent from '~/components/Cabinet/Client/ChangeEvent.vue';
    import MaskedInput from 'vue-text-mask';
    import DatePicker from '~/components/Cabinet/Vendor/DatePicker.vue';
    import VendorPassword from '~/components/Cabinet/Vendor/ChangePassword.vue';
    import NoSSR from 'vue-no-ssr';
    import Multiselect from 'vue-multiselect';
    import axios from 'axios';
    export default {
        name: "ClientCabinet",
        auth: true,
        components: {
            'page-header': PageHeader,
            'fast-filter': Filter,
            "masked-input": MaskedInput,
            'multiselect': Multiselect,
            "no-ssr": NoSSR,
            "date-picker": DatePicker,
            'create-event': CreateEvent,
            "vendor-password": VendorPassword,
            'edit-event': EditEvent,
            'change-event': ChangeEvent,
        },

        data() {
            return {
                dropPostOptions: {
                    url: '/',
                    maxThumbnailFilesize: 15,
                    maxFiles: 1,
                    maxFilesize: 15
                },
                profilePicOptions: {
                    url: '/',
                    maxThumbnailFilesize: 4,
                    maxFilesize: 5,
                    maxFiles: 1,
                },

                openedTab: 'tab4',

                // user info
                oldUserInfo: {},
                cityList: [],
                userDescription: '',
                userProgress: 0,
                type: '',
                // client
                openCreatePopup: false,
                openEventCreation: false,
                openEventEditing: false,
                openEventChanging: false,
                events: [],
                openedEvent: {},
                // vendor



                //posts
                openEditPostPopup: false,
                editedPostId: null,
                openPostPopup: false,
                vendorPosts: [],

                //post creating
                postCreating: {
                    photo: '',
                    text: '',
                    thumb: '',
                },

                //post editing
                postEditing: {
                    id: '',
                    photo: '',
                    text: ''
                },

                // settings
                showNotifications: false,
                showNotificationsDesktop: false,
                // change password
                showChangePassword: false,
                showChangePasswordDesktop: false,
                // personal info
                showPersonalInfo: true,
                showPersonalInfoDesktop: true,
                genderPassed: true,

                paramsChecked: false,
                profilePic: '',

                showSaveButton: false,

                date: {
                    day: '10',
                    month: 'Март',
                    year: '1975'
                },
                vendorData: {
                    sex: {}
                },
                sex: [],
                currentCity: {},
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                years: [],
                futureYears: [],
                createEventInProcess: {
                    name: '',
                    date: '',
                    needs: []
                },
            }
        },
        props: {
            userInfo: {
                default: function () {
                    return this.$store.state.auth.user
                },
                type: Object
            }
        },
        computed: {
            daysCount: function () {
                const selectedDate = this.date;
                if (selectedDate.month) {
                    return this.getDaysInMonths(selectedDate.month, selectedDate.year);
                } else {
                    return 0;
                }
            }
        },
        watch: {

            currentCity: {
                handler: function (newValue) {
                    console.log(newValue)
                    this.userInfo.cities[0] = newValue.id
                }
            },
            userPic: {
                handler: function (newValue) {
                    if(this.userInfo.avatar !== newValue) {
                        this.userInfo.avatar = newValue;
                    }
                }
            },
            userInfo: {
                handler: function(newValue) {

                    if(newValue.prices) {
                        for (let i = 0; i < newValue.prices.length; i++) {
                            if(!newValue.prices[i].price) {
                                this.pricesPassed = false;
                                break;
                            } else {
                                this.pricesPassed = true;
                            }
                        }
                    }
                    if(this.oldUserInfo.avatar !== newValue.avatar ||
                        this.oldUserInfo.birthday !== newValue.birthday ||
                        this.oldUserInfo.email !== newValue.email ||
                        this.oldUserInfo.firstName !== newValue.firstName ||
                        this.oldUserInfo.lastName !== newValue.lastName ||
                        this.oldUserInfo.gender !== newValue.gender ||
                        this.oldUserInfo.phone !== newValue.phone) {
                        this.showSaveButton = true;
                    }
                    Object.assign(this.oldUserInfo, newValue)
                },
                deep: true
            },
            date: {
                handler: function (newValue) {
                    let month = newValue.month;
                    if(typeof newValue.month === 'string') {
                        month = this.months.indexOf(month) + 1;
                    } else {
                        if (+newValue.month < 10) {
                            month = `${newValue.month}`;
                        }
                    }
                    if (typeof newValue.day !== "undefined" && typeof newValue.month !== "undefined" && typeof newValue.year !== "undefined") {
                        this.userInfo.birthday = `${newValue.year}-${month}-${newValue.day}`;
                    }
                },
                deep: true

            },
        },
        methods: {
            getDaysInMonths(month, year) {
                // let month = month;
                // let year = year;
                if (typeof month !== 'number') {
                    month = this.months.indexOf(month) + 1;
                }
                return new Date(year, month, 0).getDate();
            },
            eventEditing(event) {
                this.openedEvent = event;
                this.openEventEditing = true;
            },
            prettifyHotDate(date) {
                // console.log(date);
                let resultDate = new Date(date);
                // console.log(resultDate);
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
            getDay(date) {
                let resultDate = new Date(date);
                // resultDate = resultDate.toLocaleDateString('ru', options);
                // console.log(resultDate);
                return resultDate.getDate();
            },
            handlePopupToggle(data) {
                this.openEventCreation = data;
            },
            handleEventChangingToggle(data) {
                this.openEventChanging = data.showPopup;
                this.openedEvent = data.event;


            },
            refreshEvents (changed) {
                if(changed) {
                    this.getEvents();
                }
            },
            handleEditionToggle(data) {
                this.openEventEditing = data;
            },
            genderChanged(selectedOption) {

                this.$axios({
                    method: 'patch',
                    url: `/api/vendors/properties?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: [{propertyId: selectedOption.groupId, values: [selectedOption.id]}]
                }).then((response) => {
                    if(response.data.result === 'ok')  {
                        this.showSaveButton = true;
                        this.genderPassed = true;
                    }
                })
            },
            getEvents() {
                this.$axios({
                    method: 'get',
                    url: `/api/client/events?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                }).then((response) => {
                    this.events = response.data.events;
                })
            },
            // patchEvent() {
            //     this.$axios({
            //         method: 'patch',
            //         url: `/api/client/events?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
            //     }).then((response) => {
            //         console.log(response);
            //     })
            // }
            getCities() {
                this.$axios({
                    method: 'get',
                    url: '/api/city'
                }).then((response) => {
                    this.cityList = response.data;

                    //  choose current city from list
                    for (let i = 0; i < this.cityList.length; i++) {
                        if(typeof this.userInfo.cities[0] === "object") {
                            if (this.cityList[i].id === this.userInfo.cities[0].id) {
                                this.currentCity = this.cityList[i];
                                break;
                            }
                        } else {
                            if (this.cityList[i].id === this.userInfo.cities[0]) {
                                this.currentCity = this.cityList[i];
                                break;
                            }
                        }
                    }
                })
            },
            cityChange(selected) {
                if(!this.showSaveButton) {
                    this.showSaveButton = true;

                }
            },
            handleSelection(tab) {
                this.openedTab = tab;
            },
            showTabEvent(tab) {
                let tabType = tab;
                if (this.$store.state.desktop) {
                    tabType += 'Desktop';
                    this.openParamsPopupDesktop = false;
                    this.showGalleryDesktop = false;
                    this.showVideoGalleryDesktop = false;
                    this.showNotificationsDesktop = false;
                    this.showSocialDesktop = false;
                    this.showPersonalInfoDesktop = false;
                    this.showDescriptionDesktop = false;
                    this.showChangePasswordDesktop = false;
                }
                this[tabType] = true;

            },


            // personal info saving

            saveVendorPersonalInfo() {

                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        id: this.userInfo.id,
                        email: this.userInfo.email,
                        avatar: this.userInfo.avatar,
                        name: this.userInfo.name,
                        settings: this.userInfo.settings,
                        firstName: this.userInfo.firstName,
                        lastName: this.userInfo.lastName,
                        type: this.userInfo.type,
                        birthday: this.userInfo.birthday,
                        profile_pic: this.userInfo.profile_pic,
                        phone: this.userInfo.phone,
                        gender: this.userInfo.gender,
                        confirmed: this.userInfo.confirmed,
                        cities: this.userInfo.cities
                    }
                }).then((response) => {
                    this.showSaveButton = false;
                });
            },
            //posts
            makeNewPost() {
                axios({
                    method: 'post',
                    url: `/api/posts/?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        text: this.postCreating.text,
                        photo: this.postCreating.photo,
                        token: this.$auth.$storage['_state']['_token.local'].split(' ')[1]
                    }
                }).then((response) => {
                    this.getVendorPosts();
                    this.openPostPopup = false;
                    this.postCreating = {
                        photo: '',
                        text: '',
                        thumb: ''
                    }
                });
            },
            closePostCreating() {
                this.openPostPopup = false;
                this.postCreating = {
                    photo: '',
                    text: '',
                    thumb: ''
                }
            },
            saveEditingPost(id) {
            },
            deleteEditingPost(id) {
            },



            changeUserPic(file) {
                this.$refs.userPic.removeAllFiles();
                this.$refs.userPic.addFile(file);
                this.userPic = file.dataURL;
            },
            getProfileThumbNail(file, xhr) {
                this.profilePic = xhr;
                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {profilePic: xhr}
                }).then((response) => {
                });
            },
            changeProfilePic(file) {
                this.$refs.userProfilePicClient.removeAllFiles();
                this.$refs.userProfilePicClient.addFile(file);
                this.profilePic = file.dataURL;
            },
            handleShowChangePassword(data) {
                this.showChangePassword = data.showChangePassword;
            },
            // posts
            handleOpenEditPost(data) {
                this.openEditPostPopup = data.openEditPostPopup;
                this.editedPostId = data.postIndex;
                this.postEditing = this.vendorPosts[data.postIndex];
            },
            createEvent() {
                this.openCreatePopup = true;
            },
            checkFromTenderBanner() {
                this.$router.push({name: 'cabinet-tenders', path: '/cabinet/tenders/',
                    params: {
                        showPopup: true
                    }})
            },
            startDialog(userInfo) {
                let chats = this.$store.state.availableChats;
                let itemInChats = chats.findIndex((el) => {
                    return el.id === userInfo.id;
                });
                if(itemInChats === -1) {
                    chats.push({
                        body: '',
                        created_at: new Date(),
                        id: userInfo.id,
                        interlocutor: {
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            profile_pic: userInfo.userPic
                        },
                        read: true,
                        selfMessage: true,
                        new: true,
                        user: this.$store.state.auth.user,
                        user_id: this.$store.state.auth.user.id,
                        user_to: userInfo.id
                    });
                    this.$store.commit({
                        type: 'setAvailableChats',
                        chats: chats
                    });
                    this.$store.commit({
                        type: 'setCurrentDialog',
                        userInfo: {
                            name: `${userInfo.firstName} ${userInfo.lastName}`,
                            userPic: userInfo.userPic
                        }
                    });
                }
                this.$router.push(`/cabinet/chat/${userInfo.id}`);
            },

        },
        created() {


            if(this.$route.params.hasOwnProperty('tab')) {
                this.openedTab = this.$route.params.tab;
            }
            const today = new Date();
            const year = today.getFullYear();
            // const futureYears = new Date().setFullYear(year + 2).getFullYear(); // plus 2 years

            for (let i = 0; i < 5; i++) {
                this.futureYears.push(year + i);
            }


            for (let i = 0; i < 100; i++) {
                this.years.push(year - i);
            }

            if(this.$auth.loggedIn) {


                if(window) {
                    let interlocutor = JSON.parse(localStorage.getItem('openChat'));
                    if (window.localStorage.getItem('showTenderTab')) {
                        this.checkFromTenderBanner();
                        window.localStorage.removeItem('showTenderTab');
                    }
                    if (interlocutor) {
                        if (interlocutor.hasOwnProperty('id')) {
                            this.startDialog(interlocutor);
                            window.localStorage.removeItem('openChat');
                        }
                    }
                }



                this.getCities();
                this.getEvents();

                if(this.$store.state.auth.user.birthday.length > 0) {
                    const date = this.$store.state.auth.user.birthday
                    const dateSplited = date.split('-');
                    let day = dateSplited[2];
                    let month = dateSplited[1];
                    let year = dateSplited[0];
                    day = day.replace(/^0+/i, '');
                    month = month.replace(/^0+/i, '');
                    this.date.day = day;
                    this.date.month = this.months[month - 1];
                    this.date.year = year;
                }

                const token = this.$auth.$storage['_state']['_token.local'].split(' ')[1];
                this.profilePicOptions.url = `/api/users?token=${token}`;
                this.dropPostOptions.url = `/api/posts/photo?token=${token}`;
                this.profilePic = this.$store.state.auth.user.profile_pic;
                this.userPic = this.$store.state.auth.user.avatar;
                this.type = this.$store.state.auth.user.type;

            } else {
                this.$router.push('/login/');
            }
        },
        mounted() {
            if(this.$refs.vendorTabs) {
                const selectedTab = this.$refs.vendorTabs.querySelector('input:checked + label');
                this.$refs.vendorTabs.scrollLeft = selectedTab.offsetLeft - 20;
            }
        },
        updated() {

            const bodyClassList = document.querySelector('body').classList;
            if(this.showGallery  ||
                this.showHotEvents ||
                this.showSocial ||
                this.showDescription ||
                this.showNotifications ||
                this.showVideoGallery ||
                this.showChangePassword) {
                bodyClassList.add('no-scroll');
            } else {
                bodyClassList.remove('no-scroll');
            }
            if(this.openPostPopup ||
                this.openEditPostPopup) {

            }
        }
    }
</script>

