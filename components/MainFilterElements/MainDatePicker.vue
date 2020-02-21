<template>
  <div class="datepicker datepicker--main" :class="`${ isOpen ? 'datepicker--main-open' : '' }`">
  <div class="datepicker__wrapper" v-if="show" v-on-click-outside="hideDatepicker">
    <div class="datepicker__close-button" v-if="isOpen && screenSize !== 'desktop'" @click="hideDatepicker">＋</div>
    <div class="datepicker__dummy-wrapper" @click="isOpen = !isOpen" :class="`${isOpen ? 'datepicker__dummy-wrapper--is-active' : ''}  ${checkIn ? 'datepicker__dummy-wrapper--filled': ''}` ">
      <span v-if="!checkIn" class="datepicker__wrapper-placeholder">Выберите диапазон дат</span>
      <input class="datepicker__dummy-input datepicker__input" data-qa="datepickerInput" :class="
    `${isOpen && checkIn == null ? 'datepicker__dummy-input--is-active' : ''}
    ${singleDaySelection ? 'datepicker__dummy-input--single-date' : ''}
   `
" :value="`${checkIn ? formatDate(checkIn) : ''}`"
                                                                                                                                                :placeholder="i18n['check-in']" type="text" readonly="readonly" /><input class="datepicker__dummy-input datepicker__input" v-if="!singleDaySelection" :class="`${isOpen && checkOut == null && checkIn !== null ? 'datepicker__dummy-input--is-active' : ''}`"
                                                                                                                                                                                                                         :value="`${checkOut ? formatDate(checkOut) : ''}`" :placeholder="i18n['check-out']" type="text" readonly="readonly" /></div><button v-if="screenSize !== 'desktop'" class="datepicker__clear-button" type="button" @click="clearSelection">Очистить выбор</button>
    <div class="datepicker" :class="`${ !isOpen ? 'datepicker--closed' : 'datepicker--open' }`">
      <div class="datepicker__close-button" v-if="isOpen && screenSize === 'desktop'" @click="hideDatepicker">Отмена</div>
      <button v-if="screenSize === 'desktop'" class="datepicker__clear-button" type="button" @click="clearSelection">Очистить</button>
      <div class="-hide-on-desktop">
        <div class="datepicker__dummy-wrapper datepicker__dummy-wrapper--no-border" @click="isOpen = !isOpen" :class="`${isOpen ? 'datepicker__dummy-wrapper--is-active' : ''}`" v-if="isOpen"><input class="datepicker__dummy-input datepicker__input" :class="`${isOpen && checkIn == null ? 'datepicker__dummy-input--is-active' : ''}`" :value="`${checkIn ? formatDate(checkIn) : ''}`" :placeholder="i18n['check-in']" type="text"
                                                                                                                                                                                                      readonly="readonly" /><input class="datepicker__dummy-input datepicker__input" :class="`${isOpen && checkOut == null && checkIn !== null ? 'datepicker__dummy-input--is-active' : ''}`" :value="`${checkOut ? formatDate(checkOut) : ''}`"
                                                                                                                                                                                                                                   :placeholder="i18n['check-out']" type="text" readonly="readonly" /></div>
      </div>
      <div class="datepicker__inner">
        <div class="datepicker__header"><span class="datepicker__month-button datepicker__month-button--prev -hide-up-to-tablet" @click="renderPreviousMonth"></span><span class="datepicker__month-button datepicker__month-button--next -hide-up-to-tablet" @click="renderNextMonth"></span></div>
        <div class="datepicker__months" ref="monthsContainerDesktop" id="swiperWrapper" v-if="screenSize === 'desktop'">
          <div class="datepicker__month" v-for="n in [0,1,2]" :key="n">
            <transition name="fadeIn">
            <h3 class="datepicker__month-name" v-text="getMonth(months[activeMonthIndex+n].days[15].date)"></h3>
            </transition>
            <div class="datepicker__week-row -hide-up-to-tablet">
              <div class="datepicker__week-name" v-for="dayName in i18n['day-names']" :key="dayName" v-text="dayName"></div>
            </div>
            <div class="square" v-for="(day,index) in months[activeMonthIndex+n].days" :key="index" @mouseover="hoveringDate = day.date">
              <Day :options="$props" @dayClicked="handleDayClick($event)" :date="day.date" :sortedDisabledDates="sortedDisabledDates" :nextDisabledDate="nextDisabledDate" :activeMonthIndex="activeMonthIndex" :hoveringDate="hoveringDate" :tooltipMessage="tooltipMessage"
                   :dayNumber="getDay(day.date)" :belongsToThisMonth="day.belongsToThisMonth" :checkIn="checkIn" :checkOut="checkOut"></Day>
            </div>
          </div>
          <div class="datepicker__show-more" @click="renderNextGroup" v-if="screenSize !== 'desktop'">
            Загрузить еще
          </div>
          <div class="datepicker__button button button--violet" v-if="checkIn" @click="confirmSelectionEvent">
            Применить
          </div>
        </div>
        <div class="datepicker__week-holder" v-if="screenSize !== 'desktop' && isOpen">
          <div class="datepicker__week-row">
            <div class="datepicker__week-name" v-for="dayName in this.i18n['day-names']" :key="dayName" v-text="dayName"></div>
          </div>
          <div class="datepicker__months" id="swiperWrapper" ref="monthsContainer">
            <div class="datepicker__month" v-for="(a, n) in months" v-bind:key="n">
              <h1 class="datepicker__month-name" v-text="getMonth(months[n].days[15].date)"></h1>
              <div class="datepicker__week-row -hide-up-to-tablet">
                <div class="datepicker__week-name" v-for="dayName in i18n['day-names']" :key="dayName" v-text="dayName"></div>
              </div>
              <div class="square" v-for="(day, index) in months[n].days" @mouseover="hoveringDate = day.date" v-bind:key="index">
                <Day :options="$props" @dayClicked="handleDayClick($event)" :date="day.date" :sortedDisabledDates="sortedDisabledDates" :nextDisabledDate="nextDisabledDate" :activeMonthIndex="activeMonthIndex" :hoveringDate="hoveringDate" :tooltipMessage="tooltipMessage"
                     :dayNumber="getDay(day.date)" :belongsToThisMonth="day.belongsToThisMonth" :checkIn="checkIn" :checkOut="checkOut"></Day>
              </div>
            </div>
            <div class="datepicker__show-more" v-if="screenSize !== 'desktop'" @click="renderNextGroup">
              Загрузить еще
            </div>

          </div>
          <div class="datepicker__button button button--violet" v-if="checkIn" @click="confirmSelectionEvent">
            Применить
          </div>
        </div>
      </div>
    </div>
  </div>
      <div class="datepicker__overlay popup-overlay"  v-if="screenSize !== 'mobile' && isOpen"></div>
  </div>

</template>

<script>
import { directive as onClickOutside } from 'vue-on-click-outside';

import fecha from 'fecha';
import _ from 'lodash';

import Day from './Day.vue';

const defaulti18n = {
  night: 'Night',
  nights: 'Nights',
  'day-names': ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  'check-in': 'Check-in',
  'check-out': 'Check-out',
  'month-names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export default {
  name: 'HotelDatePicker',

  directives: {
    'on-click-outside': onClickOutside
  },

  components: { Day, },

  props: {
    value: {
      type: String
    },
    startingDateValue: {
      default: null,
      type: [Date, String]
    },
    endingDateValue: {
      default: null,
      type: [Date, String]
    },
    format: {
      default: 'YYYY.MM.DD',
      type: String
    },
    startDate: {
      default: function() {
        return new Date()
      },
      type: [ Date, String ]
    },
    endDate: {
      default: Infinity,
      type: [ Date, String, Number ]
    },
    minNights: {
      default: 1,
      type: Number
    },
    maxNights: {
      default: null,
      type: Number
    },
    disabledDates: {
      default: function(){ return [] },
      type: Array
    },
    allowedDates: {
      default: function(){ return [] },
      type: Array
    },
    disabledDaysOfWeek: {
      default: function(){ return [] },
      type: Array
    },
    allowedRanges: {
      default: function(){ return [] },
      type: Array
    },
    hoveringTooltip: {
      default: true,
      type: [Boolean, Function]
    },
    tooltipMessage: {
      default: null,
      type: String
    },
    i18n: {
      default: () => defaulti18n,
      type: Object
    },
    enableCheckout: {
      default: false,
      type: Boolean
    },
    singleDaySelection: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      hoveringDate: null,
      checkIn: this.startingDateValue,
      checkOut: this.endingDateValue,
      currentDate: new Date(),
      months: [],
      activeMonthIndex: 0,
      nextDisabledDate: null,
      show: true,
      isOpen: false,
      yScrollTop: 0,
      xDown: null,
      confirmSelection: false,
      yDown: null,
      xUp: null,
      yUp: null,
      sortedDisabledDates: null,
      screenSize: this.handleWindowResize(),
    };
  },

  watch: {
    isOpen (value) {
        const bodyClassList = document.querySelector('body').classList;
        const mainClassList = document.querySelector('.main').classList;
        const mainFilterClassList = document.querySelector('.main-filter').classList;
      if (this.screenSize !== 'desktop') {

        if (value) {
          bodyClassList.add('-overflow-hidden');
          mainClassList.add('main--date-opened');
        } else {
          bodyClassList.remove('-overflow-hidden');
          mainClassList.remove('main--date-opened');
        }
      } else {
          if(value) {
              mainFilterClassList.add('main-filter--date-opened');
              bodyClassList.add('-overflow-hidden');
          } else {
              mainFilterClassList.remove('main-filter--date-opened');
              bodyClassList.remove('-overflow-hidden');
          }
      }
        this.$emit("calendarActivity", value);
    },

    checkIn(newDate) {
        if(newDate) {
            this.$emit("checkInChanged", fecha.format(newDate, 'YYYY.MM.DD'))
            this.reRenderAfterSelection();
        }
    },
    checkOut(newDate) {
      if(newDate) {
          if (this.checkOut !== null && this.checkOut !== null) {
              this.hoveringDate = null;
              this.nextDisabledDate = null;
              this.show = true;
              this.parseDisabledDates();
              this.reRenderAfterSelection();
              // this.isOpen = false;
          }
          this.$emit("checkOutChanged", fecha.format(newDate, 'YYYY.MM.DD'));
      }
    },

  },

  methods: {
      confirmSelectionEvent() {
          if(!this.checkOut) {
              this.checkOut = this.checkIn;
              this.$emit("checkOutChanged", fecha.format(this.checkIn, 'YYYY.MM.DD'))
          }
          this.isOpen = false;
      },
    getNextDate(datesArray, referenceDate){
      var now = new Date(referenceDate);
      var closest = Infinity;

      datesArray.forEach(function (d) {
        var date = new Date(d);
        if (date >= now && date < closest) {
          closest = d;
        }
      });

      if (closest === Infinity) {
        return null;
      } else {
        return closest;
      }
    },
    nextDateByDayOfWeek(weekDay, referenceDate) {
      referenceDate = new Date(referenceDate);
      weekDay = weekDay.toLowerCase();
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      let referenceDateDay = referenceDate.getDay();

      for (var i = 7; i--;) {
        if (weekDay === days[i]) {
          weekDay = (i <= referenceDateDay) ? (i + 7) : i;
          break;
        }
      }

      let daysUntilNext = weekDay - referenceDateDay;

      return referenceDate.setDate(referenceDate.getDate() + daysUntilNext);
    },
    nextDateByDayOfWeekArray(daysArray, referenceDate) {
      let tempArray = [];
      for (var i = 0; i < daysArray.length; i++) {
        tempArray.push(new Date(this.nextDateByDayOfWeek(daysArray[i], referenceDate)));
      }
      return this.getNextDate(tempArray, referenceDate);
    },
    isDateLessOrEquals(time1, time2) {
      return new Date(time1) <= new Date(time2);
    },
    countDays(start, end) {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(start);
      const secondDate = new Date(end);

      return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    },
    addDays(date, quantity) {
      let result = new Date(date);
      result.setDate(result.getDate() + quantity);
      return result;
    },
    getFirstMonday(date) {
          var firstDay = this.getFirstDayOfMonth(date);
          return new Date(
              firstDay.setDate(
                  firstDay.getDate()
                  - firstDay.getDay() + 1
              )
          );
      },
    getFirstSunday(date) {
          var firstDay = this.getFirstDayOfMonth(date);
          return new Date(
              firstDay.setDate(
                  firstDay.getDate()
                  - firstDay.getDay()
              )
          );
      },
    getFirstDayOfMonth(date) {
      return new Date(
              date.getFullYear(),
              date.getMonth(), 1
      );
    },
    getNextMonth(date){
      let nextMonth;

      if (date.getMonth() == 11) {
        nextMonth = new Date(date.getFullYear() + 1, 0, 1);
      } else {
        nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      }
      return nextMonth;
    },

    swipeAfterScroll(direction){
//      if (this.screenSize !== 'desktop' && this.isOpen) {
//        const swiperWrapper = document.getElementById('swiperWrapper');
//
//        // If wrapper has vertical scroll
//        if (swiperWrapper.scrollHeight > swiperWrapper.clientHeight) {
//          if (swiperWrapper.scrollTop === (swiperWrapper.scrollHeight - swiperWrapper.offsetHeight)) {
//            this.renderNextMonth();
//          }
//          else if (swiperWrapper.scrollTop === 0) {
//            this.renderPreviousMonth();
//          }
//          else {
//            return;
//          }
//        }
//        else if (direction == 'up') {
//
//          this.renderNextMonth();
//        }
//        else if (direction == 'down') {
//          this.renderPreviousMonth();
//        }
//      }
    },
    renderNextGroup() {
      for(let i = 0; i < 3; i++) {
        this.renderNextMonth();
      }
    },
    handleTouchStart(evt) {
      this.xDown = evt.touches[0].clientX;
      this.yDown = evt.touches[0].clientY;
    },

    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) {
        return;
      }
      this.xUp = evt.touches[0].clientX;
      this.yUp = evt.touches[0].clientY;

      let xDiff = this.xDown - this.xUp;
      let yDiff = this.yDown - this.yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          // swipe right
        } else {
          // swipe left
        }
      } else {
        if (yDiff > 0) {
          // swipe up
          this.swipeAfterScroll('up');
        } else {
          // swipe down
          this.swipeAfterScroll('down');
        }
      }
      this.xDown = null;
      this.yDown = null;
    },


    handleWindowResize() {
      let screenSizeInEm = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);

      if (screenSizeInEm < 31) {
        this.screenSize = 'smartphone';
      }
      else if (screenSizeInEm > 30 && screenSizeInEm < 49) {
        this.screenSize = 'tablet';
      }
      else if (screenSizeInEm > 48) {
        this.screenSize = 'desktop';
      }

      return this.screenSize;
    },

    onElementHeightChange(el, callback){
      let lastHeight = el.clientHeight;
      let newHeight = lastHeight;

      (function run() {
        newHeight = el.clientHeight;

        if (lastHeight !== newHeight) {
          callback();
        }

        lastHeight = newHeight;

        if (el.onElementHeightChangeTimer) {
          clearTimeout(el.onElementHeightChangeTimer);
        }

        el.onElementHeightChangeTimer = setTimeout(run, 1000);
      })();
    },

    emitHeighChangeEvent() {
      this.$emit('heightChanged');
    },

      reRender() {
          console.log('rerender');
          this.show = false;
          console.log(this);
          this.$nextTick(() => {
              this.show = true;
          })
      },
    reRenderAfterSelection() {
        const monthsNode = this.$refs.monthsContainer;
        if(monthsNode) {
            this.yScrollTop = monthsNode.scrollTop;
        }
        this.show = false;
        this.$nextTick(() => {
            this.show = true;
        })

    },
    clearSelection(){
      this.hoveringDate = null,
      this.checkIn = null;
      this.checkOut = null;
      this.nextDisabledDate = null;
      this.show = true;
      this.parseDisabledDates();
      this.reRender()
    },

    hideDatepicker() {
      this.isOpen = false;
    },

    showDatepicker() {
      this.isOpen = true;
    },

    toggleDatepicker() {
      this.isOpen = !this.isOpen;
    },

    handleDayClick(event) {

      if (this.checkIn == null && this.singleDaySelection == false) {
        this.checkIn = event.date;
      } else if (this.singleDaySelection == true) {
        this.checkIn = event.date
        this.checkOut = event.date
      }
      else if (this.checkIn !== null && this.checkOut == null) {
        this.checkOut = event.date;
      }
      else {
        this.checkOut = null;
        this.checkIn = event.date;
      }

      this.nextDisabledDate = event.nextDisabledDate
    },

    renderPreviousMonth() {
      if (this.activeMonthIndex >= 1) {
        this.activeMonthIndex--
      }
      else return
    },

    renderNextMonth() {
      let firstDayOfLastMonth;

      // if (this.screenSize !== 'desktop') {
        firstDayOfLastMonth = _.filter(this.months[this.months.length - 1].days, {
          'belongsToThisMonth': true
        });
      // } else {
      //   firstDayOfLastMonth = _.filter(this.months[this.activeMonthIndex + 1].days, {
      //     'belongsToThisMonth': true
      //   });
      // }

      if (this.endDate !== Infinity) {
        if (fecha.format(firstDayOfLastMonth[0].date, 'YYYYMM') ==
                fecha.format(new Date(this.endDate), 'YYYYMM')) {
          return
        }
      }

      this.createMonth(
              this.getNextMonth(
                      firstDayOfLastMonth[0].date
              )
      );

      this.activeMonthIndex++;

    },

    setCheckIn(date) {
      this.checkIn = date;
    },

    setCheckOut(date) {
      this.checkOut = date;
    },

    getDay(date) {
      return fecha.format(date, 'D')
    },

    getMonth(date) {

      return `${this.i18n["month-names"][fecha.format(date, 'M') - 1]}/${fecha.format(date, 'YYYY')}`
    },

    formatDate(date) {
      return fecha.format(date, this.format)
    },

    createMonth(date){

          // if first day of the month is Sunday
          if (date.getDay() === 0 && date.getDate() === 1) {

              const FirstSunday = this.getFirstSunday(date);

              let month = {
                  days: []
              };
              for(let i = 0; i < 6; i++) {
                  month.days.push({
                      date: this.addDays(FirstSunday, i),
                      belongsToThisMonth: false,
                      isInRange: false,
                  });
              }
              for (let i = 0; i < 36; i++) {
                  month.days.push({
                      date: this.addDays(FirstSunday, i),
                      belongsToThisMonth: this.addDays(FirstSunday, i).getMonth() === date.getMonth(),
                      isInRange: false,
                  });
              }
              this.months.push(month);
          } else {
              const FirstMonday = this.getFirstMonday(date);
              let month = {
                  days: []
              };
              for (let i = 0; i < 42; i++) {
                  month.days.push({
                      date: this.addDays(FirstMonday, i),
                      belongsToThisMonth: this.addDays(FirstMonday, i).getMonth() === date.getMonth(),
                      isInRange: false,
                  });
              }

              this.months.push(month);
          }
      },
    parseDisabledDates() {
      const sortedDates = [];

      for (let i = 0; i < this.disabledDates.length; i++) {
        sortedDates[i] = new Date(this.disabledDates[i]);
      }

      sortedDates.sort((a, b) => a - b);

      this.sortedDisabledDates = sortedDates;
    }
  },

  beforeMount() {
    this.createMonth(new Date(this.startDate));
    this.createMonth(this.getNextMonth(new Date(this.startDate)));
      let firstDay = '';
      for(let i = 0; i < this.months[this.months.length - 1].days.length; i++) {
          if(this.months[this.months.length - 1].days[i].belongsToThisMonth) {
              firstDay = this.months[this.months.length - 1].days[i].date;
              break;
          }
      }
    this.createMonth(this.getNextMonth(new Date(firstDay)));
      // this.createMonth(this.getNextMonth(new Date(this.months[this.months.length - 1].days[5].date)));
    this.parseDisabledDates();
  },

  mounted() {
    document.addEventListener('touchstart', this.handleTouchStart, false);
    document.addEventListener('touchmove', this.handleTouchMove, false);
    window.addEventListener('resize', this.handleWindowResize);

    this.onElementHeightChange(document.body, () => {
      this.emitHeighChangeEvent();
    });
  },
  updated() {
      if(this.$refs.monthsContainer) {
          this.$refs.monthsContainer.scrollTop = this.yScrollTop;
      }
  },
  destroyed() {
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('resize', this. handleWindowResize);
  }

};
</script>

