<template>
    <div class="filter-tab filter-tab--reg">
        <div v-if="!regSuccess" class="filter-tab__top">
            <div class="filter-tab__name">Регистрация</div>
            <div class="filter-tab__sub-title">Тип пользователя</div>
            <div class="filter-tab__tabs">


                    <div class="filter-tab__tabs-item" :class="{'filter-tab__tabs-item--active': tab === 'client'}">
                        <input name="regTab" value="client" v-model="tab" id="client" type="radio"/><label for="client">Заказчик</label>
                    </div>
                <div class="filter-tab__tabs-item" :class="{'filter-tab__tabs-item--active': tab === 'vendor'}">
                    <input name="regTab" value="vendor" v-model="tab" id="vendor"  type="radio"/><label for="vendor">Исполнитель</label>
                </div>
            </div>
            <p class="filter-tab__description" v-if="tab === 'client'">
                Пользователь отбирающий исполнителей для своих проектов.
            </p>
            <p v-else class="filter-tab__description">
                Пользователь предлагающий свои услуги заказчикам.
                (Фотограф, Оператор, Ведущий и др.)
            </p>
        </div>
        <div class="filter-tab__items">
            <div class="reg-success" v-if="regSuccess">
                <h3>Письмо отправлено вам на почту</h3>
                <p>Необходимо подтвердить электронную почту для успешного завершения регистрации</p>
                <div class="reg-success__button-holder">
                    <div @click="finishRegistration" class="reg-success__button button button--violet">Хорошо</div>
                </div>
            </div>
            <form action="" v-if="tab === 'client' && !regSuccess" class="form form--new" @submit.prevent="registr">
                <div class="form__group form__group--top-border">
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
                        <transition name="fade"> <div class="form__input-error" v-if="errorMessages.password && formData.password.length < 1">{{errorMessages.password[0]}}</div>
                        <div class="form__input-error" v-if="errorMessages.passwordConfirmation">{{errorMessages.passwordConfirmation[0]}}</div></transition>
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
                        информации и соглашаюсь
                        с
                        <nuxt-link class="link link--aqua" to="/rules/">правилами сервиса</nuxt-link>.
                    </div>
                </div>

            </form>
            <form  action="" v-else-if="tab === 'vendor' && !regSuccess" class="form form--new" @submit.prevent="registr">
                <div class="form__group">
                    <div class="form__input-holder">
                        <multiselect class="multiselect--speciality"
                                     v-model="vendorType"
                                     placeholder="Ваша специализация*"
                                     :options="vendorCategories"
                                     :searchable="false"
                                     label="title"
                                     @select="chooseSpeciality"
                        >

                        </multiselect>
                    </div>
                    <!--<div class="select-tags" :class="{'select-tags&#45;&#45;required': vendorErrors.indexOf('vendorType') !== -1}">-->
                    <!--<div class="select-tags__item select-tag" v-for="(vendor, index) in vendorCategories" :key="index">-->
                    <!--<input :id="'tag' + index" name="vendor-type" :value="vendor.id" type="radio" class="select-tag__input" v-model="formData.vendorType">-->
                    <!--<label :for="'tag' + index" class="select-tag__label"><span-->
                    <!--class="select-tag__type" v-text="vendor.title"></span>-->
                    <!--</label>-->
                    <!--</div>-->
                    <!--</div>-->
                    <div class="form__group-descr" :class="{'form__group-descr--red': vendorErrors.indexOf('vendorType') !== -1}">
                        Внимание! <span v-if="vendorErrors.indexOf('vendorType') !== -1">Выберите кто вы.</span> В дальнейшем тип вендера невозможно изменить на другой.
                    </div>
                </div>
                <transition name="fade">
                    <div class="form__group" v-if="[2,5,6].indexOf(formData.vendorType) !== -1">
                        <div class="form__input-holder">
                            <input type="text"
                                   v-model="formData.placename"
                                   @focus="focusField(['placename'], $event)"
                                   @change="focusField(['placename'], $event)"
                                   :class="{'input--error': vendorErrors.indexOf('placename') !== -1, 'form__input--filled': formData.placename.length > 0}"
                                   class="form__input input input--fillable"/>
                            <span class="form__input-placeholder">Название</span>
                        </div>
                    </div>
                </transition>
                <div class="form__group">
                    <div class="form__group-name">Учетные данные</div>
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
                        <transition name="fade"> <div class="form__input-error" v-if="errorMessages.password && formData.password.length < 1">{{errorMessages.password[0]}}</div>
                        <div class="form__input-error" v-if="errorMessages.passwordConfirmation">{{errorMessages.passwordConfirmation[0]}}</div></transition>
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
                    <!--<no-ssr>-->
                    <!--<masked-input v-model="formData.phone" mask="+7(111)111-11-11" placeholder="+7(XXX)XXX-XX-XX" />-->
                    <!--</no-ssr>-->

                </div>

                <div class="form__group form__group--no-border" :class="{'form__group--top-border': fromSocial}">
                    <div class="form__group-descr">
                        Указанные данные будут использоваться для входа на сайт.
                    </div>
                    <button  @click="analyticsEvent" class="form__button button button--aqua ">Начать работу</button>
                    <div class="form__agreement">
                        Нажимая на кнопку «Зарегистрироваться»
                        я даю согласие на <a href="/files/PrivacyPolicy.pdf" target="_blank">обработку персональных данных</a> и соглашаюсь с <a href="/files/agreement-new.docx" target="_blank">правилами сервиса</a>. Письма приходят сразу, если нет во входящих проверьте папку со спамом.
                    </div>
                </div>

            </form>
        </div>
    </div>
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
        layout: 'registrationSocial',
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
                vendorType: null,
                formDataSent: false,
                fromSocial: false,
                tab: 'client',
                vendorTypeId: null,
                formData: {
                    firstName: this.$store.state.socialParams.firstName,
                    lastName: this.$store.state.socialParams.lastName,
                    email: '',
                    password: '',
                    password_confirmation: '',
                    birthday: '',
                    placename: '',
                    phone: '',
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
            chooseSpeciality(item, id) {},
            registr()  {
                let data = {...this.formData, type: this.tab, cityPrimary: this.city.id, gender: this.formData.gender.name };
                if(this.tab === 'vendor') {
                    data.vendorType = this.vendorType ? this.vendorType.id : null;
                }
                if(this.$store.state.socialParams.social) {
                    data[`${this.$store.state.socialParams.social}Id`] = this.$store.state.socialParams.id;
                }
                axios({
                    method: 'post',
                    url: '/api/registration',
                    data: data
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
            if(this.$route.query.hasOwnProperty('social')) {
                this.fromSocial = true;
            }
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