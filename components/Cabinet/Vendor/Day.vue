<template>
  <div>
    <span>
      <div class="datepicker__tooltip" v-if='showTooltip && this.options.hoveringTooltip'></div>
      <div class="datepicker__month-day"  @click='dayClicked(date)'
           v-text='`${dayNumber}`'
           :class='{
           "datepicker__month-day--hot": hotDayType,
           "datepicker__month-day--selected": busyDayType && !hotDayType || dayInActiveSelection,
           "datepicker__month-day--selected-faded": dayInActiveBusySelection,
           "datepicker__month-day--hidden": !belongsToThisMonth,
           "datepicker__month-day--disabled": isDisabled,
           "datepicker__month-day--prevent-action": dayInActiveSelection && editionMode}' ></div>
    </span>
  </div>
  <!--"datepicker__month-day&#45;&#45;selected-faded": firstTimeSelected === false && busyAndChecked && !hotDay || dayInActiveSelection && firstTimeSelected === false && (busyDay && editionMode && !hotDay),-->

  <!--"datepicker__month-day&#45;&#45;selected-faded": (firstTimeSelected === false && busyAndChecked && busyDay) || (busyDay && dayInActiveBusySelection && firstTimeSelected === false),-->
</template>

<script>
import fecha from 'fecha';

import Helpers from './helpers.js'

export default {
  name: 'Day',

  props: {
    sortedDisabledDates: {
      type: Array
    },
    currentSelection: {
      default: function () {
        return [];
      },
      type: Array
    },
    currentBusySelection: {
      default: function () {
        return [];
      },
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
    mouseOverFunction: {
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
    fadedDate: {
      type: Date
    },
    busyDay: {
      default: function () {
        return {};
      },
      type: Object
    },
    hotDay: {
      default: function () {
        return {};
      },
      type: Object
    },
    nextDisabledDate: {
      type: [Date, Number, String]
    },
    hoveringTooltip: {
      default: true,
      type: Boolean
    },
    editionMode: {
      default: false,
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
      busyDayType: false,
      isDisabled: false,
      hotDayType: false,
      showEditPanel: false,
      firstTimeSelected: true,
      allowedCheckoutDays: [],
    };
  },

  computed: {
    nightsCount: function() {
      return this.countDays(this.checkIn, this.hoveringDate);
    },
    busyAndChecked: function () {
       if(this.busyDayType && !this.firstTimeSelected && (new Date(this.date).getTime() === new Date(this.hoveringDate).getTime())) {
           return true;
       } else {
           return false;
       }
    },
    dayInActiveSelection: function() {
      let currentSelectionArray = []
      for (let i = 0; i < this.currentSelection.length; i++) {
        currentSelectionArray.push(this.currentSelection[i].date);
      }
      if(currentSelectionArray.length && currentSelectionArray.indexOf(fecha.format(this.date, 'YYYY.MM.DD')) !== -1) {
        return true;
      } else {
        return false;
      }
    },
    dayInActiveBusySelection: function () {
      let currentSelectionArray = []
      for (let i = 0; i < this.currentBusySelection.length; i++) {
        currentSelectionArray.push(this.currentBusySelection[i].date);
      }
      if(currentSelectionArray.length && currentSelectionArray.indexOf(fecha.format(this.date, 'YYYY.MM.DD')) !== -1) {
        return true;
      } else {
        return false;
      }

    },
    tooltipMessageDisplay: function() {
      return this.tooltipMessage
      ? this.tooltipMessage
      : `${this.nightsCount} ${this.nightsCount !== 1 ?
              this.options.i18n['nights'] : this.options.i18n['night']}`
    },
    showTooltip: function() {
      return  !this.isDisabled &&
              this.date == this.hoveringDate &&
              this.checkIn !== null &&
              this.checkOut == null;
    },

    dayClass: function(){
      if (this.belongsToThisMonth) {

        // If the calendar has a minimum number of nights
        if ( !this.isDisabled &&
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
          if ( !this.isDisabled && this.checkIn !== null && this.checkOut == null ) {
            // If the day is one of the allowed check out days and is not highlighted
            if ( _.some(  this.allowedCheckoutDays, (i) => this.compareDay(i, this.date) == 0 && !this.isHighlighted) ) {
              return 'datepicker__month-day--allowed-checkout'
            }
            // If the day is one of the allowed check out days and is highlighted
            if ( _.some(  this.allowedCheckoutDays, (i) => this.compareDay(i, this.date) == 0 && this.isHighlighted) ) {
              return 'datepicker__month-day--selected datepicker__month-day--allowed-checkout'
            }
            // If the day is not one of the allowed Checkout Days and is highlighted
            if ( !(_.some(  this.allowedCheckoutDays, (i) => this.compareDay(i, this.date) == 0 )) && this.isHighlighted) {
              return 'datepicker__month-day--out-of-range datepicker__month-day--selected'
            }
            else {
              return 'datepicker__month-day datepicker__month-day--out-of-range'
            }
          }
        }
        // Highlight the selected dates and prevent the user from selecting
        // the same date for checkout and checkin
        if ( this.checkIn !== null &&
            ( fecha.format(this.checkIn, 'YYYYMMDD') == fecha.format(this.date, 'YYYYMMDD') )
          ) {
//          if (this.options.minNights == 0) {
//            return "datepicker__month-day--first-day-selected"
//          } else {
//            return "datepicker__month-day--disabled datepicker__month-day--first-day-selected"
//          }
        }
        if ( this.checkOut !== null ) {
          if ( fecha.format(this.checkOut, 'YYYYMMDD') == fecha.format(this.date, 'YYYYMMDD') ) {
            return "datepicker__month-day--disabled datepicker__month-day--last-day-selected"
          }
        }
        // Only highlight dates that are not disabled
        if ( this.isHighlighted && !this.isDisabled) { return " datepicker__month-day--selected"}
        if ( this.isDisabled ) { return "datepicker__month-day--disabled" }
        if(this.busyDayType) {
          if  (new Date(this.hoveringDate).getTime() === new Date(this.fadedDate).getTime()) {
                return " datepicker__month-day--selected datepicker__month-day--selected-faded";
            } else {
              return " datepicker__month-day--selected";
          }
        }
        if(this.hotDay) {
          return " datepicker__month-day--hot";
        }
      }

      else if ( !this.belongsToThisMonth ) { return "datepicker__month-day--hidden" }
      else {  return "datepicker__month-day--valid" }
    },
  },

  watch: {
    hoveringDate: function(date) {
      if ( this.checkIn !== null  && this.checkOut == null && this.isDisabled == false) {
        this.isDateLessOrEquals(this.checkIn, this.date) &&
        this.isDateLessOrEquals(this.date, this.hoveringDate) ?
        this.isHighlighted = true : this.isHighlighted = false
      }
      if( this.checkIn !== null  && this.checkOut == null && this.allowedCheckoutDays.length !== 0){
      }
    },

    activeMonthIndex: function(index) {
      this.checkIfDisabled()
      this.checkIfHighlighted()
      if ( this.checkIn !== null  && this.checkOut !== null ) {
          this.isDateLessOrEquals(this.checkIn, this.date) &&
          this.isDateLessOrEquals(this.date, this.checkOut) ?
          this.isHighlighted = true : this.isHighlighted = false
      } else if ( this.checkIn !== null  && this.checkOut == null ) {
        this.disableNextDays()
      } else {
        return
      }

    },
    nextDisabledDate: function() {
      this.disableNextDays();
    },
    checkIn: function(date) {
      this.createAllowedCheckoutDays(date);
    }
  },

  methods: {
    ...Helpers,

    compareDay(day1, day2) {
      const date1 = fecha.format(new Date(day1), 'YYYYMMDD');
      const date2 = fecha.format(new Date(day2), 'YYYYMMDD');

      if (date1 > date2) { return 1; }

      else if (date1 == date2) { return 0; }

      else if (date1 < date2) { return -1; }
    },

    dayClicked(date) {
      if (this.isDisabled) {
        return
      }
      else {
        if (this.options.allowedRanges.length !== 0) {
          this.createAllowedCheckoutDays(date);
        }
        if(this.showEditPanel) {
          this.showEditPanel = false;
        } else {
          this.showEditPanel = true;
        }
        let showEditPanel = this.showEditPanel;

//        let nextDisabledDate =
//          (this.options.maxNights ? this.addDays(this.date, this.options.maxNights) : null) ||
//          this.allowedCheckoutDays[this.allowedCheckoutDays.length-1] ||
//          this.getNextDate(this.sortedDisabledDates, this.date) ||
//          this.nextDateByDayOfWeekArray(this.options.disabledDaysOfWeek, this.date) ||
//          Infinity;
//
//        if (this.options.enableCheckout) { nextDisabledDate = Infinity; }
        if(this.hotDayType) {

          this.$emit('dayClicked', {
            date,
            showEditPanel,
            hotDay: this.hotDayType,
            busyDay: this.busyDay,
            firstTimeSelected: this.firstTimeSelected,
            hotDayData: this.hotDay
          });
        } else {
          this.$emit('dayClicked', {
            date,
            showEditPanel,
            hotDay: this.hotDayType,
            busyDay: this.busyDay,
            firstTimeSelected: this.firstTimeSelected
          });
        }
      }
    },

    compareEndDay() {
      if (this.options.endDate !== Infinity) {
        return ( this.compareDay(this.date, this.options.endDate) == 1 )
      }
    },

    checkIfDisabled() {
      this.isDisabled =
        // If this day is equal any of the disabled dates
        _.some(
          this.sortedDisabledDates, (i) =>
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
        if ( this.options.enableCheckout ) {
          if ( this.compareDay(this.date, this.checkIn) == 1 &&
               this.compareDay(this.date, this.checkOut) == -1 ) {
                this.isDisabled = false;
          }
        }
    },

    checkIfHighlighted(){
      if ( this.checkIn !== null  && this.checkOut !== null && this.isDisabled == false) {
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
      this.allowedCheckoutDays.sort((a, b) =>  a - b );
    },

    disableNextDays(){
      if ( !this.isDateLessOrEquals(this.date, this.nextDisabledDate)
            && this.nextDisabledDate !== Infinity) {
              this.isDisabled = true;
      }
      else if ( this.isDateLessOrEquals(this.date, this.checkIn) ) {
        this.isDisabled = true;
      }
      if ( this.compareDay(this.date, this.checkIn) == 0 && this.options.minNights == 0) {
        this.isDisabled = false;
      }
      if (this.isDateLessOrEquals(this.checkIn, this.date) && this.options.enableCheckout ){
        this.isDisabled = false
      }
      else {
        return
      }
    },
  },
  created(){
      if(this.busyDay.hasOwnProperty('date')) {
        this.busyDayType = true;
      }
      if(this.busyDayType && this.dayInActiveSelection) {
          this.firstTimeSelected = false;
      }
    if(this.hotDay.hasOwnProperty('date') && this.hotDay.date.length > 0) {
      this.hotDayType = true;
    }
    this.checkIfDisabled()
    this.checkIfHighlighted()
  },
}
</script>
