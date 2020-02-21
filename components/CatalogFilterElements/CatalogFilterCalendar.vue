<template>
    <no-ssr>

        <date-picker :i18n="russian" format="D/MM" @checkInChanged="handleCheckInChange($event);"
                     @checkOutChanged="handleCheckOutChange($event);" :enableCheckout="true"
                     :startingDateValue="date.from"
                     :endingDateValue="date.to">
        </date-picker>
    </no-ssr>
</template>
<script>
    //    import HotelDatePicker from 'vue-hotel-datepicker'
    import DatePicker from '~/components/CatalogFilterElements/DatePicker.vue'
    import NoSSR from 'vue-no-ssr';
    export default {
        name: 'FilterCalendar',
        components: {
            'date-picker': DatePicker,
            'no-ssr': NoSSR
        },
        data() {
            return {
                russian: {
                    'day-names': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                    'month-names': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                }
            }
        },
        props: {
          date: {
              default: {},
              type: Object
          }
        },
        methods: {
            handleCheckInChange(event) {
                this.$emit("fromDate", event);
            },
            handleCheckOutChange(event) {
                this.$emit("toDate", event);
            },

        },
    }
</script>