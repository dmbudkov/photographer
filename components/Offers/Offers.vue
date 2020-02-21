<template>
    <section class="page-section page-section--offers" v-show="filterResult.length > 0">
            <div class="width-wrapper width-wrapper--offers">
                    <h2>
                        Горящие предложения
                    </h2>
                <offers-groups :availableSpecialities="availableSpecialities" @checkedSpeciality="handleSpeciality($event);"></offers-groups>
                <offers-items :filterResult="filterResult"></offers-items>
            </div>
    </section>
</template>

<script>
    import OffersGroups from "~/components/Offers/OffersGroups.vue";
    import OffersElements from "~/components/Offers/OffersItems.vue";
    export default {
        name: 'MainOffers',
        components: {
            'offers-groups': OffersGroups,
            'offers-items': OffersElements
        },
        data() {
            return {
                filterResult: [],
                checkedSpeciality: null,
                availableSpecialities: []
            }
        },
        computed: {
            cityId() {
                return this.$store.state.userCity.id;
            }
        },
        watch: {
            cityId (newVal, oldVal) {
                this.getVendors(this.checkedSpeciality);
            }
        },
        methods: {
            handleSpeciality(data) {
                    this.checkedSpeciality = data;
                    this.getVendors(this.checkedSpeciality);
            },
            getVendors(specialityId) {
                this.$axios({
                    method: 'post',
                    url: `/api/catalog/`,
                    data: {
                        "speciality": specialityId,
                        "properties": [],
                        "sort": "hotDateToday",
                        "city": this.cityId
                    }
                }).then((response) => {
                    this.filterResult = response.data.vendors;
                    if(specialityId === -1) {
                        let specArray = [];
                        for (let i = 0; i < this.filterResult.length; i++) {
                            specArray.push(this.filterResult[i].speciality.id);
                        }
                        this.availableSpecialities = new Set(specArray).toJSON()
                    }
                });
            },
        }
    }

</script>