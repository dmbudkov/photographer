<template>
    <div>fb</div>
</template>

<script>

    export default {
        data() {
            return {

            }
        },
        methods: {
            getUrlVars(link) {
                var vars = {};
                var parts = link.replace(/[?&]+([^=&]+)=([^&]*)/gi,
                    function(m,key,value) {
                        vars[key] = value;
                    });
                return vars;
            }
        },
        created() {
            const editedUrl = this.$route.hash.replace('#', '?');
            let urlParams = this.getUrlVars(editedUrl);
            this.$axios({
                method: 'POST',
                url: '/api/social/fb',
                data: {
                    token: urlParams.access_token,
                },
            }).then((response) => {
                console.log(response);
                if(response.data.hasOwnProperty('access_token')) {
                    this.$auth.setToken('local', `Bearer ${response.data.access_token}`);
                    window.location.href = '/cabinet/';
                } else if(response.data.status !== 'error'){
                    this.$store.commit('setState', {
                        type: 'socialParams',
                        data: {
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            id: response.data.userId,
                            social: 'fb'
                        }
                    });
                    this.$router.push('/registration/social')
                } else [

                ]

            })
        }
    }

</script>
