<template><no-ssr>
    <transition name="fade">
        <vendor-notifications></vendor-notifications>
    </transition>
</no-ssr>
</template>


<script>
    import NoSSR from 'vue-no-ssr';
    import VendorNotifications from '~/components/Cabinet/Vendor/Notifications.vue';
    export default {
        components: {
            "no-ssr": NoSSR,
            "vendor-notifications": VendorNotifications
        },
        data() {
            return {

            }
        }
    }

</script>