<template>
    <div>test</div>
</template>

<script>

    export default {
        head: {
            title: 'Начинка вендор'
        },
        validate({params}) {
            if (isNaN(+params.vendorType)) {
                return;
            }
        },
        async asyncData({params, error}) {

        },
        data() {
            return {
                specialities: ''
            }
        },
        beforeCreate() {
            this.$axios({
                method: 'get',
                url: '/api/vendor/specialities'
            }).then((response) => {
                this.specialities = response.data
            })
            console.log('not empty params', this.$route.params.vendorType);
            if (this.$route.params.vendorType === '') {
                this.$router.push(`/catalog/${response.data[0].id}/filter_`);
            } else {
                for (let key in this.specialities) {
                    if (this.specialities[key].id === +this.$route.params.vendorType) {
                        this.$router.push(`/catalog/${+this.$route.params.vendorType}/filter_`);
                    } else {
                        this.$router.push(`/catalog/${response.data[0].id}/filter_`);
                    }
                }
            }
        }
    }
</script>

<style>

</style>
