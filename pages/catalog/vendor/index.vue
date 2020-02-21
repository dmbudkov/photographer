<template>
    <div>vendor</div>
</template>

<script>

    export default {
        head: {
            title: 'Начинка каталог'
        },
        async asyncData({params, error}) {
            console.log(params);
        },
        created() {
            this.$router.push('/catalog/')
        }
    }

</script>

<style>

</style>
