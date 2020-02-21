-<template>
    <div>vk</div>
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
            const editedUrl = this.$route.fullPath.replace('vk#', 'vk?');
            let urlParams = this.getUrlVars(editedUrl);

            this.$axios({
                method: 'post',
                url: '/api/social/vk',
                data: {
                    access_token: urlParams.access_token,
                    user_id: urlParams.user_id
                },
            }).then((response) => {
                if(response.data.hasOwnProperty('access_token')) {
                    this.$auth.setToken('local', `Bearer ${response.data.access_token}`);
                    window.location.href = '/cabinet/';
                } else {
                    this.$store.commit('setState', {
                        type: 'socialParams',
                        data: {
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            id: response.data.userId,
                            social: 'vk'
                        }
                    });
                    this.$router.push('/registration/social')
                }
            })
        }
    }

</script>
