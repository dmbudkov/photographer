<template>
        <form action="" class="form form--new" @submit.prevent="registr">
                <div class="form__group">
                        <div class="form__group-name">Персональные данные</div>
                        <div class="form__input-holder">
                                <input type="text"
                                       v-model="formData.firstName"
                                       @focus="focusField(['firstName'], $event)"
                                       @change="focusField(['firstName'], $event)"
                                       :class="{'input--error': vendorErrors.indexOf('firstName') !== -1,
                               'form__input--filled': formData.firstName.length > 0}"
                                       class="form__input input input--fillable"
                                />
                                <span class="form__input-placeholder">Имя</span>
                                <transition name="fade"> <div class="form__input-error" v-if="errorMessages.firstName">
                                        Укажите имя
                                </div></transition>
                        </div>
                        <div class="form__input-holder">
                                <input type="text"
                                       v-model="formData.lastName"
                                       @focus="focusField(['lastName'], $event)"
                                       @change="focusField(['lastName'], $event)"
                                       :class="{'input--error': vendorErrors.indexOf('lastName') !== -1, 'form__input--filled': formData.lastName.length > 0}"
                                       class="form__input input input--fillable"/>
                                <span class="form__input-placeholder">Фамилия</span>
                                <transition name="fade"> <div class="form__input-error" v-if="errorMessages.lastName">Укажите фамилию</div></transition>
                        </div>
                        <!--<div class="form__input-holder">-->
                        <!--<no-ssr>-->
                        <!--<multiselect class="form__input"-->
                        <!--v-model="city"-->
                        <!--:class="{'multiselect&#45;&#45;required': vendorErrors.indexOf('cityPrimary') !== -1}"-->
                        <!--placeholder="Ваш город"-->
                        <!--:options="cityList"-->
                        <!--:searchable="false"-->
                        <!--label="title"-->
                        <!--&gt;-->
                        <!--<span slot="noResult">Выберите город</span>-->
                        <!--</multiselect>-->
                        <!--</no-ssr>-->
                        <!--<transition name="fade"> <div class="form__input-error" v-if="errorMessages.cityPrimary">-->
                        <!--Укажите свой город-->
                        <!--</div></transition>-->
                        <!--</div>-->
                        <!--<input type="text" placeholder="Город" class="form__input input"/>-->
                </div>
                <div class="form__group form__group--no-border">
                        <div class="form__group-name">
                                Учетная запись
                        </div>
                        <div class="form__input-holder">
                                <input type="text"
                                       v-model="formData.email"
                                       ref="email"
                                       class="form__input input input--fillable"
                                       @focus="focusField(['email', 'emailInvalid', 'emailTaken'], $event)"
                                       @change="focusField(['email', 'emailInvalid', 'emailTaken'], $event)"
                                       :class="{
                              'input--error': vendorErrors.indexOf('email') !== -1 || vendorErrors.indexOf('emailInvalid') !== -1 || vendorErrors.indexOf('emailTaken') !== -1,
                              'form__input--filled': formData.email.length > 0,
                              'input--invalid': vendorErrors.indexOf('emailInvalid') !== -1,
                              'input--success': formDataSent && vendorErrors.indexOf('email')  === -1 && vendorErrors.indexOf('emailInvalid')  === -1 && vendorErrors.indexOf('emailTaken') === -1}"
                                />
                                <span class="form__input-placeholder">Логин/e-mail</span>
                                <transition name="fade">   <div class="form__input-error" v-if="errorMessages.email">{{errorMessages.email[0]}}</div>
                                        <div class="form__input-error" v-if="errorMessages.emailInvalid">{{errorMessages.emailInvalid[0]}}</div>
                                        <div class="form__input-error" v-if="errorMessages.emailTaken">{{errorMessages.emailTaken[0]}}</div></transition>
                        </div>
                        <div class="form__input-holder">
                                <input type="password"
                                       v-model="formData.password"
                                       class="form__input input input--fillable"
                                       :class="{
                               'input--success': formData.password.length >=6,
                               'input--error': vendorErrors.indexOf('password') !== -1 || vendorErrors.indexOf('passwordConfirmation') !== -1 || (formData.password.length > 0 && formData.password.length < 6),
                               'form__input--filled': formData.password.length > 0
                               }"
                                />

                                <span class="form__input-placeholder">Пароль (не менее 6 знаков)</span>
                                <!--<transition name="fade"> <div class="form__input-error" v-if="errorMessages.password && formData.password.length < 1">{{errorMessages.password[0]}}</div>-->
                                <!--<div class="form__input-error" v-if="errorMessages.passwordConfirmation">{{errorMessages.passwordConfirmation[0]}}</div></transition>-->
                        </div>
                        <div class="form__input-holder">
                                <input type="password"
                                       v-model="formData.password_confirmation"
                                       :class="{
                               'input--error': vendorErrors.indexOf('passwordConfirmation') !== -1,
                               'input--success': formData.password.length >=6 && formData.password === formData.password_confirmation,
                               'form__input--filled': formData.password_confirmation.length > 0,
                               'input--invalid': vendorErrors.indexOf('passwordConfirmation') !== -1
                               }"

                                       class="form__input input input--fillable"
                                />

                                <span class="form__input-placeholder">Пароль повторно</span>
                                <transition name="fade"> <div class="form__input-error" v-if="errorMessages.passwordConfirmation">{{errorMessages.passwordConfirmation[0]}}</div></transition>
                        </div>
                </div>

                <div class="form__group form__group--no-border">
                        <div class="form__group-descr">
                                Указанные данные будут использоваться для входа на сайт.
                        </div>
                        <!--<vue-recaptcha sitekey="Your key here"></vue-recaptcha>-->
                        <button @click="analyticsEvent" class="form__button button button--aqua">Начать работу</button>
                        <div class="form__agreement">
                                Нажимая на кнопку «Зарегистрироваться»
                                я даю согласие на обработку личной
                                информации и соглашаюсь с
                                <nuxt-link class="link link--aqua" to="/rules/"> правилами сервиса</nuxt-link>.
                        </div>
                </div>

        </form>
</template>

<script>
    import axios from 'axios';
    import NoSSR from 'vue-no-ssr';
    import Multiselect from 'vue-multiselect';
    import MaskedInput from 'vue-text-mask';
    import PageHeader from '~/components/PageHeader/PageHeader.vue';
    import PageFooter from '~/components/PageFooter.vue';
    import VendorTypes from "~/components/FilterElements/CatalogVendorType.vue";
    import vendorRecoveryPass from '~/components/Login/RecoveryPassword.vue';
    //    import MaskedInput from 'vue-masked-input';
    let components = {
        Multiselect,
        "no-ssr": NoSSR,
        MaskedInput,
        'vendor-recovery': vendorRecoveryPass,
    };
    //    if (process.browser) {
    ////    import vueSlider from 'vue-slider-component';
    //        const MaskedInput = require('vue-masked-input');
    //        components['masked-input'] = MaskedInput;
    //    }
    export default {
        layout: 'registration',
        auth: false,
        components,
//        validate({params}) {
////            return !isNaN(params.id)
//        },
//        async asyncData({ params, error }) {
//            try {
//                const { data } = await axios.post(`/login/`)
//                return data;
//            } catch (e) {
//                error({ message: 'User not found', statusCode: 404 })
//            }
//        },
        data() {
            return {
                vendorErrors: [],
                regSuccess: false,
                errorMessages: {},
                formDataSent: false,
                formData: {
                    type: 'vendor',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    birthday: '',
                    placename: '',
                    phone: '',
                    vendorType: '',
                    gender: ''
                },
                sex: [{label:'Мужской', name: "m"}, {label:'Женский', name: 'f'}],
                city: '',
                date: {
                    day: '01',
                    month: '01',
                    year: '2000'
                },
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                years: [],
                cityList: [],
                vendorCategories: []

            }
        },
        computed: {
            dateResult() {
                return `${this.date.day}-${this.date.month}-${this.date.year}`
            }
        },
        watch: {
            city: function (newValue, oldValue) {
                if(!oldValue && typeof newValue === "object") {
                    delete this.vendorErrors[this.vendorErrors.indexOf('cityPrimary')];
                    // this.vendorErrors.splice(1, this.vendorErrors.indexOf('cityPrimary'));
                }
            },
            formData: {
                handler: function (value) {
                    if(value.vendorType) {
                        delete this.vendorErrors[this.vendorErrors.indexOf('vendorType')];
                        // this.vendorErrors.splice(1, this.vendorErrors.indexOf('vendorType'));
                    }
                },
                deep: true
            }
        },
        methods: {
            analyticsEvent() {
                if(window) {
                    window.yaCounter48643421.reachGoal('click_on_registration');
                }
                this.$ga.event({
                    eventCategory: 'click_on_registration',
                    eventAction: 'click',
                })
            },
            registr()  {
                axios({
                    method: 'post',
                    url: '/api/registration',
                    data:  {...this.formData, birthday: this.dateResult, cityPrimary: this.city.id, gender: this.formData.gender.name }
                }).then((response) => {
                    if(response.data.id) {
                        this.regSuccess = true;
                    } else {
                        this.vendorErrors = [];
                        for(let key in response.data) {
                            this.vendorErrors.push(key);
                            this.errorMessages = response.data;
                        }
                        this.formDataSent = true;
                        setTimeout(() => {
                            this.scrollToAnchor(document.querySelector('.filter-tab__items'), 0, 500);
                        }, 700);
                        // document.
                        // this.vendorErrors = response.data;
                    }
                });
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
            getCities: function() {
                axios({
                    method: 'get',
                    url: '/api/city',
                }).then((response) => {
                    this.cityList = response.data;
                });
            },
            finishRegistration() {
                if(window) {
                    window.yaCounter48643421.reachGoal('finish_registration_thanks');
                }
                this.$ga.event({
                    eventCategory: 'finish_registration_thanks',
                    eventAction: 'click',
                })
                this.$router.push({path: '/'});

            },
            focusField(fieldsArray, event) {
                let hasError = false;
                if(event.target.classList.contains('input--remarked')) {
                    event.target.classList.remove('input--remarked');
                }
                if(event.target.classList.contains('input--error')) {
                    event.target.classList.add('input--remarked');
                }
            },
            getVendorTypes: function () {
                axios({
                    method: 'get',
                    url: '/api/vendor/specialities',
                }).then((response) => {
                    this.vendorCategories = response.data;
                });
            }
        },
        created() {
            const today = new Date();
            const year = today.getFullYear();
            for (let i = 0; i < 100; i++) {
                this.years.push(year - i);
            }
            this.getCities();
            this.getVendorTypes();
        },
    }
</script>