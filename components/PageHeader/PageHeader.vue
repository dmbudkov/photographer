<template>
        <!--<header class="page-header" :class="{'page-header&#45;&#45;cabinet': $route.name === 'cabinet' || $route.name === 'login' || $route.name === 'registration-vendor'}">-->
        <header class="page-header page-header--cabinet" :class="{'page-header--index': $route.name === 'index'}">
            <nuxt-link to="/" class="page-header__logo-ext">
            </nuxt-link>
            <no-ssr>
                <transition name="fade">
            <cabinet-app @showCabinetMenu="handleShowCabinetMenu($event)" :userLogged="$auth.$state.loggedIn" :class="{'cabinet--active': showCabinetMenu}"></cabinet-app>
                </transition>
            </no-ssr>
            <vendor-types class="page-header__types vendor-type--header" :class="{'page-header__types--index': $route.name === 'index'}" :specialities="$store.state.specialities" :currentType="+$route.params.vendorType"></vendor-types>
            <!--<no-ssr>-->
            <!--<city-choice class="page-header__city" v-show="$route.name === 'index'" v-if="$store.state.desktop"></city-choice>-->
            <!--</no-ssr>-->
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
    import MenuCabinet from "~/components/PageHeaderItems/TheCabinetMenu.vue";
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
        methods: {
            handleShowCabinetMenu(data) {
                this.showCabinetMenu = data.showCabinetMenu
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

        },

    }
</script>
