<template>
    <no-ssr>

   <date-picker :i18n="russian" @checkInChanged="handleDateFrom($event)" @checkOutChanged="handleDateTo($event)" format="D/MM"  @calendarActivity="handleCalendarActivity($event);" :enableCheckout="true"></date-picker>
    </no-ssr>
</template>
<script>
//    import HotelDatePicker from 'vue-hotel-datepicker'
    import DatePicker from '~/components/MainFilterElements/MainDatePicker.vue'
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
        methods: {
            handleDateFrom(event) {
                this.$emit("fromDate", event);
            },
            handleDateTo(event) {
                this.$emit("toDate", event);
            },
            handleCalendarActivity(data) {
                this.$emit("calendarActivity", data);
            },
        }
    }
</script>