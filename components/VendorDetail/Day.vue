<template>
    <div>
    <span>

      <div class="datepicker__month-day datepicker__month-day--disabled" @click='dayClicked(date)'
           v-text='`${dayNumber}`'
           :class='dayClass'></div>
         <div class="datepicker__tooltip"
              v-html='tooltipMessageDisplay'></div>
    </span>
    </div>

</template>

<script>
    import fecha from 'fecha';

    import Helpers from './helpers.js'

    export default {
        name: 'Day',

        props: {
            sortedAllowedDates: {
                type: Array
            },
            sortedHotDates: {
                type: Array
            },
            options: {
                type: Object
            },
            checkIn: {
                type: Date
            },
            checkOut: {
                type: Date
            },
            hoveringDate: {
                type: Date
            },
            mounseOverFunction: {
                type: Function
            },
            belongsToThisMonth: {
                type: Boolean
            },
            activeMonthIndex: {
                type: Number
            },
            date: {
                type: Date
            },
            dayNumber: {
                type: String
            },
            nextDisablDate: {
                type: [Date, Number, String]
            },
            hoveringTooltip: {
                default: true,
                type: Boolean
            },
            tooltipMessage: {
                default: null,
                type: String
            }
        },

        data() {
            return {
                isHighlighted: false,
                isAllowed: false,
                isHot: false,
                showToolTip: false,
                allowedCheckoutDays: [],
            };
        },

        computed: {
            nightsCount: function () {
                return this.countDays(this.checkIn, this.hoveringDate);
            },
            tooltipMessageDisplay: function () {
                const freeDate = 'Свободная дата';
                const hotDate = 'Горящая дата';
                const busyDate = 'Занятая дата';
                let message = '';
                if(this.isHot) {
                    message = hotDate;
                } else if (this.isAllowed) {
                    message = busyDate;
                } else {
                    message = freeDate;
                }
                return message;
            },
            // showTooltip: function () {
            //     return !this.isAllowed &&
            //             this.date == this.hoveringDate &&
            //             this.checkIn !== null &&
            //             this.checkOut == null;
            // },

            dayClass: function () {
                if (this.belongsToThisMonth) {

                    // If the calendar has a minimum number of nights
                    if (!this.isAllowed &&
                            this.compareDay(this.date, this.checkIn) == 1 &&
                            this.options.minNights > 0 &&
                            this.compareDay(
                                    this.date,
                                    this.addDays(this.checkIn, this.options.minNights)
                            ) == -1) {
                        return 'datepicker__month-day--selected datepicker__month-day--out-of-range'
                    }
                    // If the calendar has allowed ranges
                    if (this.options.allowedRanges.length !== 0) {
                        if (!this.isAllowed && this.checkIn !== null && this.checkOut == null) {
                            // If the day is one of the allowed check out days and is not highlighted
                            if (_.some(this.allowedCheckoutDays, (i) => this.compareDay(i, this.date) == 0 && !this.isHighlighted)) {
                                return 'datepicker__month-day--allowed-checkout'
                            }
                            // If the day is one of the allowed check out days and is highlighted
                            if (_.some(this.allowedCheckoutDays, (i) => this.compareDay(i, this.date) == 0 && this.isHighlighted)) {
                                return 'datepicker__month-day--selected datepicker__month-day--allowed-checkout'
                            }
                            // If the day is not one of the allowed Checkout Days and is highlighted
                            if (!(_.some(this.allowedCheckoutDays, (i) => this.compareDay(i, this.date) == 0)) && this.isHighlighted) {
                                return 'datepicker__month-day--out-of-range datepicker__month-day--selected'
                            }
                            else {
                                return 'datepicker__month-day datepicker__month-day--out-of-range'
                            }
                        }
                    }
                    // Highlight the selected dates and prevent the user from selecting
                    // the same date for checkout and checkin
                    if (this.checkIn !== null &&
                            ( fecha.format(this.checkIn, 'YYYYMMDD') == fecha.format(this.date, 'YYYYMMDD') )
                    ) {
                        if (this.options.minNights == 0) {
                            return "datepicker__month-day--first-day-selected"
                        } else {
                            return "datepicker__month-day--disabled datepicker__month-day--first-day-selected"
                        }
                    }
                    if (this.checkOut !== null) {
                        if (fecha.format(this.checkOut, 'YYYYMMDD') == fecha.format(this.date, 'YYYYMMDD')) {
                            return "datepicker__month-day--disabled datepicker__month-day--last-day-selected"
                        }
                    }
                    // Only highlight dates that are not disabled
                    if (this.isHighlighted && !this.isAllowed && !this.isHot) {
                        return " datepicker__month-day--selected"
                    }
                    if (this.isAllowed && !this.isHot) {
                        return "datepicker__month-day--allowed"
                    }
                    if ((this.isHot && !this.isAllowed) || (this.isHot && this.isAllowed)) {
                        return "datepicker__month-day--hot"
                    }
                }

                else if (!this.belongsToThisMonth) {
                    return "datepicker__month-day--hidden"
                }
                else {
                    return "datepicker__month-day--valid"
                }
            },
        },

        watch: {
            hoveringDate: function (date) {
                if (this.checkIn !== null && this.checkOut == null && this.isAllowed == false) {
                    this.isDateLessOrEquals(this.checkIn, this.date) &&
                    this.isDateLessOrEquals(this.date, this.hoveringDate) ?
                            this.isHighlighted = true : this.isHighlighted = false
                }
                if (this.checkIn !== null && this.checkOut == null && this.allowedCheckoutDays.length !== 0) {

                }
            },
            activeMonthIndex: function (index) {
                this.checkIfAllowed()
                this.checkIfHighlighted()
                if (this.checkIn !== null && this.checkOut !== null) {
                    this.isDateLessOrEquals(this.checkIn, this.date) &&
                    this.isDateLessOrEquals(this.date, this.checkOut) ?
                            this.isHighlighted = true : this.isHighlighted = false
                } else if (this.checkIn !== null && this.checkOut == null) {
                    this.disableNextDays()
                } else {
                    return
                }

            },
            nextAllowedDate: function () {
                this.disableNextDays();
            },
            checkIn: function (date) {
                this.createAllowedCheckoutDays(date);
            }
        },

        methods: {
            ...Helpers,

            compareDay(day1, day2) {
                const date1 = fecha.format(new Date(day1), 'YYYYMMDD');
                const date2 = fecha.format(new Date(day2), 'YYYYMMDD');

                if (date1 > date2) {
                    return 1;
                }

                else if (date1 == date2) {
                    return 0;
                }

                else if (date1 < date2) {
                    return -1;
                }
            },

            dayClicked(date) {
                let toolTipNodes = document.querySelectorAll('.datepicker__tooltip');
                let dayTooltipNode = this.$el.querySelector('.datepicker__tooltip');
                let isShowing = dayTooltipNode.classList.contains('datepicker__tooltip--showed');
                toolTipNodes.forEach((el, ind) => {
                    if(el.classList.contains('datepicker__tooltip--showed')) {
                        el.classList.remove('datepicker__tooltip--showed');
                    }
                });
                if(!isShowing) {
                    dayTooltipNode.classList.add('datepicker__tooltip--showed');
                } else {
                    dayTooltipNode.classList.remove('datepicker__tooltip--showed');
                }


                // this.showToolTip = true;
                // if (this.isAllowed) {
                //     // return
                // }
                // else {
                //     if (this.options.allowedRanges.length !== 0) {
                //         this.createAllowedCheckoutDays(date);
                //     }
                //
                //     let nextAllowedDate =
                //             (this.options.maxNights ? this.addDays(this.date, this.options.maxNights) : null) ||
                //             this.allowedCheckoutDays[this.allowedCheckoutDays.length - 1] ||
                //             this.getNextDate(this.sortedAllowedDates, this.date) ||
                //             this.nextDateByDayOfWeekArray(this.options.disabledDaysOfWeek, this.date) ||
                //             Infinity;
                //
                //     if (this.options.enableCheckout) {
                //         nextAllowedDate = Infinity;
                //     }
                //     let nextHotDate =
                //             (this.options.maxNights ? this.addDays(this.date, this.options.maxNights) : null) ||
                //             this.allowedCheckoutDays[this.allowedCheckoutDays.length - 1] ||
                //             this.getNextDate(this.sortedHotDates, this.date) ||
                //             this.nextDateByDayOfWeekArray(this.options.disabledDaysOfWeek, this.date) ||
                //             Infinity;
                //
                //
                //
                //     this.$emit('dayClicked', {date, nextAllowedDate});
                //     this.$emit('dayClicked', {date, nextHotDate});
                // }
            },

            compareEndDay() {
                if (this.options.endDate !== Infinity) {
                    return ( this.compareDay(this.date, this.options.endDate) == 1 )
                }
            },

            checkIfAllowed() {
                this.isAllowed =
                        // If this day is equal any of the disabled dates
                        _.some(
                                this.sortedAllowedDates, (i) =>
                                this.compareDay(i, this.date) == 0
                        )
                        // Or is before the start date
                        || this.compareDay(this.date, this.options.startDate) == -1
                        // Or is after the end date
                        || this.compareEndDay()
                        // Or is in one of the disabled days of the week
                        || _.some(
                                this.options.disabledDaysOfWeek, (i) =>
                                i == fecha.format(this.date, 'dddd')
                        );
                // Handle checkout enabled
                if (this.options.enableCheckout) {
                    if (this.compareDay(this.date, this.checkIn) == 1 &&
                            this.compareDay(this.date, this.checkOut) == -1) {
                        this.isAllowed = false;
                    }
                }
            },
            checkIfHot() {
                this.isHot =
                        // If this day is equal any of the disabled dates
                        _.some(
                                this.sortedHotDates, (i) =>
                                this.compareDay(i, this.date) == 0
                        )
                        // Or is before the start date
                        // || this.compareDay(this.date, this.options.startDate) == -1
                        // Or is after the end date
                        || this.compareEndDay()
                        // Or is in one of the disabled days of the week
                        || _.some(
                                this.options.disabledDaysOfWeek, (i) =>
                                i == fecha.format(this.date, 'dddd')
                        );
                // Handle checkout enabled
                if (this.options.enableCheckout) {
                    if (this.compareDay(this.date, this.checkIn) == 1 &&
                            this.compareDay(this.date, this.checkOut) == -1) {
                        this.isHot = false;
                    }
                }
            },

            checkIfHighlighted(){
                if (this.checkIn !== null && this.checkOut !== null && this.isAllowed == false) {
                    this.isDateLessOrEquals(this.checkIn, this.date) &&
                    this.isDateLessOrEquals(this.date, this.checkOut) ?
                            this.isHighlighted = true : this.isHighlighted = false
                }
            },

            createAllowedCheckoutDays(date){
                this.allowedCheckoutDays = [];
                _.forEach(
                        this.options.allowedRanges, (i) =>
                                this.allowedCheckoutDays.push(this.addDays(date, i))
                )
                this.allowedCheckoutDays.sort((a, b) => a - b);
            },

            disableNextDays(){
                if (!this.isDateLessOrEquals(this.date, this.nextAllowedDate)
                        && this.nextAllowedDate !== Infinity) {
                    this.isAllowed = true;
                }
                else if (this.isDateLessOrEquals(this.date, this.checkIn)) {
                    this.isAllowed = true;
                }
                if (this.compareDay(this.date, this.checkIn) == 0 && this.options.minNights == 0) {
                    this.isAllowed = false;
                }
                if (this.isDateLessOrEquals(this.checkIn, this.date) && this.options.enableCheckout) {
                    this.isAllowed = false
                }
                else {
                    return
                }
            },
        },

        beforeMount(){
            this.checkIfAllowed()
            this.checkIfHot()
            this.checkIfHighlighted()
        },
    }
</script>
