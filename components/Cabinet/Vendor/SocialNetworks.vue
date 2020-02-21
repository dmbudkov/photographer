<template>
    <div class="filter-tab filter-tab--centered" :class="{'filter-tab--desktop': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__back back back--black" @click="showSocial"></div>
            <div class="filter-tab__name">Социальные сети</div>
        </div>
        <div class="filter-tab__items">
            <form class="form form--change-password">
                <div class="form__group">
                    <div class="form__group-name">Ссылки на социальные сети</div>
                    <input type="text" placeholder="https://vk.com" v-model="social.vk" class="form__input input input--profile" @keyup="handleChanging"/>
                    <input type="text" placeholder="https://vimeo.com" v-model="social.vimeo" class="form__input input input--profile" @keyup="handleChanging"/>
                    <input type="text" placeholder="https://facebook.com" v-model="social.fb" class="form__input input input--profile" @keyup="handleChanging"/>
                    <input type="text" placeholder="https://youtube.com" v-model="social.yt" class="form__input input input--profile" @keyup="handleChanging"/>
                    <input v-if="$auth.user.speciality.id === 6" type="text" placeholder="https://mysite.com" v-model="social.site" class="form__input input input--profile" @keyup="handleChanging"/>
                </div>
            </form>
        </div>
        <div class="filter-tab__button-holder">
            <div class="button button--violet" @click="saveFields" v-if="showSaveButton">
                 <!--<span class="preloader-interactive" v-if="showPreloader">-->
                            <!--<span class="preloader-interactive__dot preloader-interactive__dot&#45;&#45;first"></span>-->
                            <!--<span class="preloader-interactive__dot preloader-interactive__dot&#45;&#45;second"></span>-->
                            <!--<span class="preloader-interactive__dot preloader-interactive__dot&#45;&#45;third"></span>-->
                            <!--<span class="preloader-interactive__dot preloader-interactive__dot&#45;&#45;fourth"></span>-->
                        <!--</span>-->
                Сохранить</div>
            <!--<button class="button button&#45;&#45;violet">-->
            <!--Добавить фото-->
            <!--</button>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VendorShowSocial',
        components: {},
        props: {
//            showGallery: {
//                default: false,
//                type: Boolean
//            }
        },
        data() {
            return {
                social: {
                    vk: '',
                    vimeo: '',
                    fb: '',
                    yt: '',
                    site: ''
                },
                showPreloader: false,
                showSaveButton: false
            }
        },
        methods: {
            handleChanging(event) {
                this.showSaveButton = true;
            },
            saveFields() {
                this.showPreloader = true;
                this.$axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        vk: this.social.vk,
                        fb: this.social.fb,
                        yt: this.social.yt,
                        vimeo: this.social.vimeo,
                        site: this.social.site
                    }
                }).then((response) => {
                    this.showSaveButton = false;
                    this.showSocial();
                });
            },
            showSocial() {
                this.$emit('showSocial', {
                    showSocial: false,
                    social: this.social
                });
            },
        },
        created() {
            this.social.vk = this.$store.state.auth.user.vk;
            this.social.fb = this.$store.state.auth.user.fb;
            this.social.yt = this.$store.state.auth.user.yt;
            this.social.vimeo = this.$store.state.auth.user.vimeo;
            this.social.site = this.$store.state.auth.user.site;
        }
    }
</script>