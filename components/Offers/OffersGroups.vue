<template>

    <div class="offers-groups">
        <ul class="offers-groups__list">
            <li class="offers-groups__item">
                <input id="all" name="offers-filter" type="radio" class="offers-groups__item-input" value="all" checked/>
                <label for="all" class="offers-groups__item-label" @click="getAllVendors">

                </label>
                <span class="offers-groups__item-text">
                    Все
                </span>
            </li>
            <li class="offers-groups__item" v-for="(speciality, index) in $store.state.specialities" :key="speciality.id" v-show="availableSpecialities.indexOf(speciality.id) !== -1">
                <input :id="'specialityOffers' + speciality.id" name="offers-filter" type="radio" class="offers-groups__item-input" @change="currentSpeciality(speciality.id)" :value="speciality.id"/>
                <label :for="'specialityOffers' + speciality.id" class="offers-groups__item-label" ></label>
                <span class="offers-groups__item-text" v-text="speciality.title"></span>
            </li>

        </ul>

    </div>

</template>

<script>

    export default {
        name: 'OffersGroups',
        data() {
            return {
                specialities: [],
            }
        },
        props: {
            availableSpecialities: {
                type: Array,
                default: []
            }
        },
        methods: {
            currentSpeciality(val) {
                    this.$emit('checkedSpeciality', val);
            },
            getAllVendors() {
                this.$emit('checkedSpeciality', -1);
            }
        },
        created() {
            this.$emit('checkedSpeciality', -1);
        }

    }
</script>