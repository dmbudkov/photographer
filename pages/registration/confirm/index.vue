<template>
    <div>confirm</div>
</template>
<script>

    export default {
        data() {

        },
        methods: {
          registrationConfirm() {
              this.$axios({
                  method: 'post',
                  url: '/api/registration/confirm',
                  data: {
                      email: this.$route.query.email,
                      code: this.$route.query.code
                  }
              }).then((response) => {
                  this.$router.push(`/login?type=${this.$route.query.type}`);
              })
          }
        },
        created() {
            this.registrationConfirm();
        }
    }

</script>