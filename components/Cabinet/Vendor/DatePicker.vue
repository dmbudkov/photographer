<template>
  <div class="datepicker datepicker--open datepicker--vendor datepicker--vendor-cabinet">
  <div class="datepicker__wrapper" ref="monthsContainer" v-if="show" v-on-click-outside="hideDatepicker">

    <div class="datepicker__dummy-wrapper" @click="isOpen = !isOpen" :class="`${isOpen ? 'datepicker__dummy-wrapper--is-active' : ''}` "></div>

    <div class="datepicker" :class="`${ !isOpen ? 'datepicker--closed' : 'datepicker--open' }`">
      <div class="-hide-on-desktop">
        <div class="datepicker__dummy-wrapper datepicker__dummy-wrapper--no-border" @click="isOpen = !isOpen" :class="`${isOpen ? 'datepicker__dummy-wrapper--is-active' : ''}`" v-if="isOpen">

        </div>
      </div>

      <div class="datepicker__inner">
        <div class="datepicker__header"><span class="datepicker__month-button datepicker__month-button--prev -hide-up-to-tablet" @click="renderPreviousMonth"></span><span class="datepicker__month-button datepicker__month-button--next -hide-up-to-tablet" @click="renderNextMonth"></span></div>

        <div class="datepicker__week-holder" >
          <div class="datepicker__week-row">
            <div class="datepicker__week-name" v-for="dayName in this.i18n['day-names']" :key="dayName" v-text="dayName"></div>
          </div>
          <div class="datepicker__months" id="swiperWrapper">
            <div class="datepicker__month" v-for="(a, n) in months" v-bind:key="n">
              <h1 class="datepicker__month-name" v-text="getMonth(months[n].days[15].date)"></h1>
              <div class="datepicker__week-row -hide-up-to-tablet">
                <div class="datepicker__week-name" v-for="dayName in i18n['day-names']" :key="dayName" v-text="dayName"></div>
              </div>
              <div class="square" v-for="(day, index) in months[n].days" @click="hoveringDate = day.date" v-bind:key="index">
                <Day
                        :options="$props"
                        @dayClicked="handleDayClick($event)"
                        :date="day.date"
                        :fadedDate="fadedDate"
                        :editionMode="showCalendarAction"
                        :sortedDisabledDates="sortedDisabledDates"
                        :activeMonthIndex="activeMonthIndex"
                        :hoveringDate="hoveringDate"
                        :tooltipMessage="tooltipMessage"
                        :busyDay="getBusyDay(day.date)"
                        :hotDay="getHotDay(day.date)"
                        :currentSelection="checkedDates"
                        :currentBusySelection="checkedBusyDates"
                        :dayNumber="getDay(day.date)"
                        :belongsToThisMonth="day.belongsToThisMonth"
                        :checkIn="checkIn"
                        :checkOut="checkOut">

                </Day>
              </div>
            </div>
            <div class="datepicker__show-more" @click="renderOnTap">
              Загрузить еще
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!--empty day checked-->
    <transition name="fade" mode="out-in">
    <div class="datepicker__calendar-action calendar-action" v-if="showCalendarAction && !busyDayChecked">
      <div @click="reRenderBusyDates" class="calendar-action__item calendar-action__item--normal button button--aqua">Занято</div>
      <div  @click="makeHotEvent" class="calendar-action__item calendar-action__item--hot button button--violet">Горящая</div>
      <div @click="clearSelectActions" class="calendar-action__item calendar-action__item--remove button button--gray"></div>
    </div>
    </transition>

    <!--busy day checked-->
    <transition name="fade" mode="out-in">
    <div class="datepicker__calendar-action calendar-action" v-if="showCalendarAction && busyDayChecked">
      <div  @click="removeFromBusyDates" class="calendar-action__item calendar-action__item--normal button button--aqua">Свободно</div>
      <div  @click="makeHotEvent" class="calendar-action__item calendar-action__item--hot button button--violet">Горящая</div>
      <div class="calendar-action__item calendar-action__item--remove button button--gray" @click="clearSelectActions"></div>
    </div>
    </transition>

  </div>

</template>

<script>
import { directive as onClickOutside } from 'vue-on-click-outside';
import axios from 'axios';
import fecha from 'fecha';
import _ from 'lodash';
import NoSSR from 'vue-no-ssr';
import Multiselect from 'vue-multiselect';
import Day from './Day.vue';

const defaulti18n = {
  night: 'Night',
  nights: 'Nights',
  'day-names': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  'check-in': 'Check-in',
  'check-out': 'Check-out',
  'month-names': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
};

export default {
  name: 'HotelDatePicker',

  directives: {
    'on-click-outside': onClickOutside,
  },

  components: { Day, Multiselect, NoSSR},

  props: {
    value: {
      type: String
    },
    startingDateValue: {
      default: null,
      type: Date
    },
    availableHotDates: {
        default: 2,
        type: Number
    },
    endingDateValue: {
      default: null,
      type: Date 
    },
    format: {
      default: 'YYYY-MM-DD',
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
    makedHotEvent: {
      default: '',
      type: String
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
    busyDays: {
      default: function(){ return [] },
      type: Array
    },
    hotDays: {
      default: function () {
        return []
      },
      type: Array
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
  computed: {
      availableHotCreateDates() {
          return this.availableHotDates;
      },
      busyDaysChangeable: {
          get() {
             return  this.busyDays;
          },
          // сеттер:
          set(newValue) {
          }
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
      // availableHotCreateDates: 2,
      nextDisabledDate: null,
      busyDayChecked: false,
      hotDayChecked: false,
      fadedDate: null,
      show: true,
      isOpen: false,
      xDown: null,
      yDown: null,
      currentDateSelection: null,
      xUp: null,
      yUp: null,
      yScrollTop: 0,
      sortedDisabledDates: null,
      // busyDaysChangeable: [],
      screenSize: this.handleWindowResize(),
      showCalendarAction: false,
      checkedDates: [],
      checkedBusyDates: []
    };
  },

  watch: {
    isOpen (value) {
    },
    checkIn(newDate) {
      this.$emit("checkInChanged", newDate )
        this.reRenderAfterSelection();
    },
//    makedHotEvent(date) {
//      this.reRender();
//    },

    hotDays(value) {
      // if(value.length >= 2) {
      //     this.availableHotCreateDates = 0;
      // }
      this.showCalendarAction = false;
      this.checkedDates = [];
      this.reRender();
    },
    checkOut(newDate) {

      if ( this.checkOut !== null && this.checkOut !== null ) {
        this.hoveringDate = null;
        this.nextDisabledDate = null;
        this.show = true;
        this.parseDisabledDates();
        // this.isOpen = false;
      }
        this.reRenderAfterSelection();

      this.$emit("checkOutChanged", newDate )
    },

  },

  methods: {
    handleScroll() {
        let scrolledFromTop = window.pageYOffset;
        const windowHeight = document.documentElement.clientHeight;
        const datePickerNode = document.querySelector('.datepicker--vendor-cabinet');
        const fixableElement = document.querySelector('.datepicker__calendar-action');
        const datePickerHeight = datePickerNode.clientHeight;
        const datePickerOffset = datePickerNode.offsetTop;
        if(fixableElement) {
            if (scrolledFromTop + windowHeight >= datePickerHeight + datePickerOffset + 140) {
                fixableElement.removeAttribute('style');
            } else {
                fixableElement.style.position = 'fixed';
            }
        }
    },
    makeHotEvent() {
        if(this.availableHotCreateDates > 0) {
            this.$emit('makeHotDate', {
                date: this.currentDateSelection,
                showPopup: true,
                availableHotDates: this.availableHotDates,
                hotDaysLength: this.hotDays.length
            });
        } else {
            this.$emit('showPopup', true);
        }
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
    clearSelectActions() {
      this.showCalendarAction = false;
      this.sortedDisabledDates = [];
      this.checkedDates = [];
      this.checkedBusyDates = [];
      this.reRender();
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
    renderOnTap() {
      for(let i = 0; i < 3; i++) {
        this.renderNextMonth();
      }
      if(document) {
          this.yScrollTop = document.documentElement.scrollTop;
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
//          this.swipeAfterScroll('up');
        } else {
          // swipe down
//          this.swipeAfterScroll('down');
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
      this.show = false
      this.$nextTick(() => {
        this.show = true;
      })
    },
      reRenderAfterSelection() {

          // const monthsNode = this.$refs.monthsContainer;
          // if(monthsNode) {
          if(document) {
              this.yScrollTop = document.documentElement.scrollTop;
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

    disableAllDates(date) {
      const sortedDates = [];
      const sortedTimeArray = [];
      const busyDaysArray = [];
      for (let i = 0; i < this.busyDaysChangeable.length; i++) {
        busyDaysArray.push(this.busyDaysChangeable[i].date);
      }
      this.months.forEach((el, index) => {
        el.days.forEach((day, index) => {
          if (busyDaysArray.indexOf(fecha.format(day.date, 'YYYY.MM.DD')) === -1) {
            sortedDates.push(new Date(day.date));
            sortedTimeArray.push(new Date(day.date).getTime());
          }
        })
      });

      const i = sortedTimeArray.indexOf(new Date(date).getTime());

      if (i != -1) {
        sortedDates.splice(i, 1);
      }
      sortedDates.sort((a, b) => a - b);
      this.sortedDisabledDates = sortedDates;
    },

    handleDayClick(event) {

      const busyDayChecked = event.busyDay;
      let isBusyDay = false;
      if(busyDayChecked.hasOwnProperty('date')) {
        isBusyDay = true;
      }
      const hotDayChecked = event.hotDay;
      this.currentDateSelection = event.date;

      if(isBusyDay) {
        this.busyDayChecked = true;

        this.fadedDate = event.date;
//        if(this.checkedBusyDates.length ) {
          this.disableAllDates(event.date);
//        }
      } else {
        this.busyDayChecked = false;
      }
      if(hotDayChecked) {
        this.hotDayChecked = true;
        this.$emit('editHotDate', {
          showPopup: true,
          // availableHotDays: this.availableHotDays,
          hotDayData: event.hotDayData
        });
      } else {
        this.showCalendarAction = event.showEditPanel;
        this.setToCheckedDates(event.date, isBusyDay, event.busyDay.id);
      }
      this.reRenderAfterSelection()
      this.handleScroll();
//      this.nextDisabledDate = event.nextDisabledDate
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
    setToCheckedDates(date, busyDay, id) {
      const checkedDay = fecha.format(date, 'YYYY.MM.DD');

      if (!busyDay) {
        if (this.checkedDates.indexOf(checkedDay) === -1) {
          this.checkedDates.push(
                  {
                    id: '',
                    date: checkedDay
                  });
        }
      } else {
        if (this.checkedBusyDates.indexOf(checkedDay) === -1) {
          this.checkedBusyDates.push(
                  {
                    id: id,
                    date: checkedDay
                  });
        }
      }
    },
    setToHotDates(date) {
      const checkedDay = fecha.format(date, 'YYYY.MM.DD');
    },
    reRenderBusyDates() {
        let busyDays = this.busyDaysChangeable.concat(this.checkedDates.filter((item, index) => {
            return this.busyDaysChangeable.indexOf(item) < 0;
        }));
      this.$emit('updateBusyDays', busyDays);
      this.reRender();
      axios({
        method: 'post',
        url: `/api/vendor/calendar/?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
        data: this.checkedDates
      }).then((response) => {
        console.log(response);
      });
      this.checkedDates = [];
      this.showCalendarAction = false;
    },
    removeFromBusyDates() {
      const busyDaysArray = [];
      const busyDaysIdArray = [];
      for (let i = 0; i < this.busyDaysChangeable.length; i++) {
        busyDaysArray.push(this.busyDaysChangeable[i].date);
      }

      this.checkedBusyDates.forEach((el, i) => {
        let index = busyDaysArray.indexOf(el.date);
        console.log(el);
        busyDaysIdArray.push(el.id);
        if(index > -1) {
          this.busyDaysChangeable.splice(index, 1);
          busyDaysArray.splice(index, 1);
        }

      })

      axios({
        method: 'delete',
        url: `/api/vendor/calendar/?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
        data: busyDaysIdArray
      }).then((response) => {
        console.log(response);
      });
//      this.busyDays = this.busyDaysChangeable;
      this.reRender();
      this.checkedDates = [];
      this.checkedBusyDates = [];
      this.sortedDisabledDates = [];
      this.busyDayChecked = false;
      this.showCalendarAction = false;
    },
    setCheckOut(date) {
      this.checkOut = date;
    },
//    getBusyDay(date) {
//     let busyDay =  fecha.format(date, 'DD.MM.YYYY');
//      if((this.busyDaysChangeable.indexOf(busyDay)) + 1 > 0 || this.checkedDates.indexOf(busyDay) + 1 > 0) {
//          return true;
//      }
//    },
    getBusyDay(date) {
      let busyDay =  fecha.format(date, 'YYYY.MM.DD');
      const busyDaysArray = [];
      for(let i = 0; i < this.busyDaysChangeable.length; i++) {
          busyDaysArray.push(this.busyDaysChangeable[i].date);
      }
      const indexOfBusyDays = busyDaysArray.indexOf(busyDay);
      const indexOfCheckedDays = this.checkedDates.indexOf(busyDay);
      if(indexOfBusyDays + 1 > 0 || indexOfCheckedDays + 1 > 0) {

          return this.busyDaysChangeable[indexOfBusyDays] || this.checkedDates[indexOfCheckedDays];
      }
    },
    getHotDay(date) {
      let hotDay =  fecha.format(date, 'YYYY.MM.DD');
      const hotDaysArray = [];
      for(let i = 0; i < this.hotDays.length; i++) {
        if(this.hotDays[i].date === hotDay) {
          return this.hotDays[i];
        }
      }
    },

    getDay(date) {
      return fecha.format(date, 'D')
    },

    getMonth(date) {
      return this.i18n["month-names"][fecha.format(date, 'M') - 1]
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
//    if(this.hotDays)

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
    this.parseDisabledDates(this.months);
  },
  beforeUpdate() {
      // this.availableHotCreateDates = this.availableHotDates;
  },
  mounted() {

    document.addEventListener('touchstart', this.handleTouchStart, false);
    document.addEventListener('touchmove', this.handleTouchMove, false);
    document.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleWindowResize);

    this.onElementHeightChange(document.body, () => {
      this.emitHeighChangeEvent();
    });
  },
  updated() {
      let mq = window.matchMedia('(min-width: 1024px)').matches;
      if(mq) {
          if (document) {
              document.documentElement.scrollTop = this.yScrollTop;
          }
      }
      this.handleScroll();
  },
  destroyed() {
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this. handleWindowResize);
  }

};
</script>

