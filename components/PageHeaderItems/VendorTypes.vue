<template>

    <ul class="vendor-type">
        <li class="vendor-type__item" v-for="speciality in specialities" :key="speciality.id">

            <input name="vendor-type" :id="'specialityHeader' + speciality.id" :value="speciality.id" @change="checkedSpecialityEvent(speciality.id, speciality.code)" class="vendor-type__input" type="radio" v-model="checkedSpeciality" :checked="+$route.params.vendorType == speciality.id"/>
            <label :for="'specialityHeader' + speciality.id" class="vendor-type__label" :class="{'vendor-type__label--current': +$route.params.vendorType == speciality.id}" v-text="speciality.title">
            </label>
        </li>
    </ul>
</template>
<script>
    export default {
        name: "VendorType",
        data() {
            return {
                checkedSpeciality: this.currentType,
            }
        },
        computed: {

//          checkedSpeciality: {
//              get: function () {
//                  return this.specialities[0].id;
//              },
//              set: function (newValue) {
//                    return newValue;
//              }
//          }
        },
        props: {
            specialities: {
                default: function () {
                    return []
                },
                type: Array
            },
            currentType: {
                type: Number
            }

        },
        methods: {
            checkedSpecialityEvent(specialityId, specialityCode) {
                let query = {};
                this.$emit('checkedSpecialityEvent', {
                    checkedSpeciality: specialityId,
                })
                if(typeof this.$store.state.userCity !== 'undefined') {
                    query.city = this.$store.state.userCity.id;
                }
                if(typeof this.$route.query.dateFrom !== "undefined" && typeof this.$route.query.dateTo !== "undefined") {
                    query.dateFrom = this.$route.query.dateFrom;
                    query.dateTo = this.$route.query.dateTo;
                }
                this.$router.push({path: `/catalog/${specialityId}/filter_`, query: query});
            }
        },
    }
</script>