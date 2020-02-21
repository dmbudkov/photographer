<template>
    <div id="app-holder" ref="appHolder" :class="{'mobile': $store.state.mobileView}">
    <div class="wrapper wrapper--visible">
        <div class="page-wrapper">
            <page-header></page-header>
            <!--<transition name="fade">-->
                <nuxt></nuxt>
            <!--</transition>-->
        </div>
        <page-footer></page-footer>

    </div>
    </div>

    <!--<div class="container">-->
    <!--<h1 v-if="error.statusCode === 404"></h1>-->
    <!--<h1 v-else>An error occurred</h1>-->
    <!--<nuxt-link to="/">Home page</nuxt-link>-->
    <!--</div>-->
</template>

<script>
    import PageHeader from '~/components/PageHeader/PageHeader.vue';
    import PageFooter from '~/components/PageFooter.vue';
    import VendorTypes from "~/components/FilterElements/CatalogVendorType.vue";

    export default {
        components: {
            'page-header': PageHeader,
            'page-footer': PageFooter,
        },
        data() {
            return {
                showPreloader: false
            }
        },
        mounted() {
            if (JSON.parse(window.localStorage.getItem('isDesktopView'))) {
                this.$store.commit('setDesktopView', true)
            } else {
                this.$store.commit('setDesktopView', false)
            }
        }

    }
</script>