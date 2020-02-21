<template>
    <no-ssr>
    <div class="wrapper cabinet-page" v-if="$store.state.auth.loggedIn">

       <cabinet-dev v-if="$store.state.auth.user.type === 'vendor'" :userInfo="userInfo"></cabinet-dev>

        <client-dev v-else :userInfo="userInfo"></client-dev>
        <page-footer v-if="$store.state.desktop"></page-footer>
    </div>
        <!--<div class="wrapper" v-else>-->
            <!--<vendor-cabinet v-if="this.$store.state.auth.user.type === 'vendor'" :userInfo="userInfo"></vendor-cabinet>-->
            <!--<client-cabinet v-else :userInfo="userInfo"></client-cabinet>-->

        <!--</div>-->
    </no-ssr>
</template>

<script>

    import PageFooter from '~/components/PageFooter.vue';
    import VendorCabinet from '~/components/Cabinet/Vendor/Index.vue';
    import VendorCabinetDev from '~/components/Cabinet/Vendor/IndexDev.vue';
    import ClientCabinet from '~/components/Cabinet/Client/Index.vue';
    import ClientCabinetDev from '~/components/Cabinet/Client/IndexDev.vue';


    const  components = {
        VendorCabinet,
        'cabinet-dev': VendorCabinetDev,
        ClientCabinet,
        'page-footer': PageFooter,
        'client-dev': ClientCabinetDev
    };

    export default {
        name: 'Cabinet',
        auth: true,
        components,
        asyncData({ params, error, store, query, app, redirect }) {
            console.log(store.state.auth);
               if(!store.state.auth.loggedIn) {
                   redirect('302', '/login/');
               }
        },
        data() {
            return {
                // user info
                userInfo: this.$store.state.auth.user
            }
        },




    }

</script>