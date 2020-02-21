<template>
        <!--<header class="page-header" :class="{'page-header&#45;&#45;cabinet': $route.name === 'cabinet' || $route.name === 'login' || $route.name === 'registration-vendor'}">-->
        <header class="page-header page-header--cabinet" :class="{'page-header--index': $route.name === 'index'}">
            <nuxt-link to="/" class="page-header__logo-ext">
            </nuxt-link>

                <transition name="fade">
            <cabinet-app @showCabinetMenu="handleShowCabinetMenu($event)" :userLogged="$auth.$state.loggedIn" :class="{'cabinet--active': showCabinetMenu}"></cabinet-app>
                </transition>
            <ul v-if="$auth.$state.user.type === 'client'" class="page-header__types vendor-type  vendor-type--header">
                <li class="vendor-type__item">

                    <div
                            @click="handleParam('tab1')" :class="{'vendor-type__label--current': selectedTab === 'tab1'}"  class="vendor-type__label"> Быстрый подбор</div>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/chat" class="vendor-type__label" :class="{'vendor-type__label--current': $route.name === 'cabinet-chat'}">Мои сообщения</nuxt-link>
                    <span class="vendor-type__item--event" v-show="hasUnread"></span>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders" class="vendor-type__label" :class="{'vendor-type__label--current': $route.name === 'cabinet-tenders'}">Мои тендеры</nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <div
                            @click="handleParam('tab4')" :class="{'vendor-type__label--current': selectedTab === 'tab4'}"  class="vendor-type__label">Профиль</div>
                </li>
            </ul>
            <ul v-else class="page-header__types vendor-type  vendor-type--header">
                <li class="vendor-type__item">
                    <nuxt-link :class="{'vendor-type__label--current': $route.name === 'cabinet-chat'}" to="/cabinet/chat" class="vendor-type__label"> Мои сообщения</nuxt-link>
                    <span class="vendor-type__item--event" v-show="hasUnread"></span>
                </li>
                <li class="vendor-type__item">
                    <div
                            @click="handleParam('tab3')" :class="{'vendor-type__label--current': selectedTab === 'tab3'}"  class="vendor-type__label">Профиль</div>
                </li>
                <li class="vendor-type__item" v-if="$auth.user.speciality.id !== 6">
                    <div
                            @click="handleParam('tab1')" :class="{'vendor-type__label--current': selectedTab === 'tab1'}"  class="vendor-type__label">Лента событий</div>
                </li>
                <li class="vendor-type__item">
                    <div @click="handleParam('tab2')" :class="{'vendor-type__label--current': selectedTab === 'tab2'}"  class="vendor-type__label"> Мой календарь</div>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders" :class="{'vendor-type__label--current': $route.name === 'cabinet-tenders'}" class="vendor-type__label">Мои тендеры</nuxt-link>
                </li>
            </ul>

            <no-ssr>
            <city-choice class="page-header__city" v-show="this.$route.name === 'index'" v-if="$store.state.desktop"></city-choice>
            </no-ssr>
            <nuxt-link  to="/search/" class="page-header__search">
            </nuxt-link>
            <!--<city-choice></city-choice>-->
            <no-ssr>
            <menu-app></menu-app>
            </no-ssr>
            <no-ssr>
            <menu-cabinet v-if="showCabinetMenu" :class="{'menu--cabinet-opened': showCabinetMenu}" @showCabinetMenu="handleShowCabinetMenu($event);"></menu-cabinet>
            </no-ssr>
        </header>
</template>
<script type="text/javascript">
    import NoSSR from 'vue-no-ssr';
    import Cabinet from "~/components/PageHeaderItems/TheCabinet.vue";
    import CityChoice from "~/components/PageHeaderItems/TheCityChoice.vue";
    import Menu from "~/components/PageHeaderItems/TheMenu.vue";
    import MenuCabinet from "~/components/PageHeaderItems/TheCabinetMenuInsideCabinet.vue";
    import VendorTypes from "~/components/PageHeaderItems/VendorTypes.vue";
    export default {
        name: 'PageHeader',
        components: {
           'cabinet-app': Cabinet,
           'city-choice': CityChoice,
           'menu-app': Menu,
           'menu-cabinet': MenuCabinet,
           'no-ssr': NoSSR,
            'vendor-types': VendorTypes,
        },
        data() {
            return {
                showCabinetMenu: false
            }
        },
        props: {
          selectedTab: {
              default: '',
              type: String
          }
        },
        methods: {
            handleShowCabinetMenu(data) {
                this.showCabinetMenu = data.showCabinetMenu;
                if(data.tabId) {
                    this.handleParam(data.tabId);
                }
                const pageHeaderClassList = document.querySelector('.page-header').classList;
                const bodyClassList = document.querySelector('body').classList;
                if (this.showCabinetMenu) {
                    pageHeaderClassList.add('page-header--opened');
                //     bodyClassList.add('no-scroll');
                } else {
                    pageHeaderClassList.remove('page-header--opened');
                //     bodyClassList.remove('no-scroll');
                }
            },
            handleParam(param) {

                this.$emit('selectedMenuItem', param)
             this.$router.push({name: 'cabinet', path: '/cabinet/', params: {tab: param}})
            },
        },
        computed: {
            hasUnread: function () {

                if(typeof this.$store.state.availableChats != 'undefined' && this.$store.state.availableChats.length != 0){
                    for (let el of this.$store.state.availableChats){
                        if(el.read === 0)
                            return true;
                    }
                }

                return false;
            }
        }

    }
</script>
