<template>

    <header class="page-header">
         <cabinet :userLogged="$auth.$state.loggedIn"></cabinet>
        <menu-app></menu-app>
    </header>
</template>
<script type="text/javascript">
    import Cabinet from "~/components/PageHeaderItems/TheCabinet.vue"
    import Menu from "~/components/PageHeaderItems/TheMenu.vue"
    export default {
        name: 'PageHeaderGeneral',
        components: {
            'cabinet': Cabinet,
            'menu-app': Menu
        },
        data() {
            return {

            }
        }
    }
</script>
