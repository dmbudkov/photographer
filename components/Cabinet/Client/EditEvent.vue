<template>
        <div class="date-creation date-creation--client">
            <div class="date-creation__top">
                <div class="date-creation__back back" @click="closeEventEdition"></div>
                <div class="date-creation__closer" @click="closeEventEdition"></div>
                <div class="date-creation__more settings" @click="openEventChanging">
                <span class="settings__dot"></span>
                <span class="settings__dot"></span>
                <span class="settings__dot"></span>
                </div>
                <div class="date-creation__text">
                    <time class="date-creation__date" v-text="prettifyHotDate(event.date)"></time>
                    <h5 class="date-creation__title" v-text="event.name"></h5></div>
            </div>
            <div class="date-creation__form">
                <div class="form form--profile form--edit-date form--event">
                    <!--<input type="hidden" :value="hotDayData.id"/>-->
                    <div class="form__group form__group--no-border" >
                        <div class="form__group-name">Уже найдено</div>
                        <div class="select-tags select-tags--wide">
                            <div class="select-tags__item select-tag select-tag--wide" v-for="(vendor, index) in event.needs" :key="index">
                                <input :id="'tag' + index" name="vendor-type" :value="vendor.id" type="checkbox" class="select-tag__input" v-model="checkedEvents">
                                <label :for="'tag' + index" class="select-tag__label"><span
                                        class="select-tag__type" v-text="vendor.name"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form__group">
                        <div class="form__group-descr">
                           <p> Отмечайте уже найденного вендера и если вендер не найден, то оставьте его пустым.
</p>
                          <p>Мы будем присылать вам уведомление
                              на почту с доступными вендерами на эту дату, а также вендеров на эту дату с горящими предложениями.</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "EditEvent",
        data() {
            return {
                checkedEvents: [],
                needs: []
            }
        },
        props: {
          event: {
              default: function () {
                  return {}
              },
              type: Object
          }
        },
        watch: {
          checkedEvents(val) {
              if(val) {
                  this.saveEvent();
              }
          },
        },
        methods: {
            saveEvent() {

                this.$axios({
                    method: 'patch',
                    url: `/api/client/events/${this.event.id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        needs: this.needs,
                        found: this.checkedEvents
                    }
                }).then((response) => {
                    this.$emit('eventSaved', true);
                })
            },
            prettifyHotDate(date) {
                let resultDate = new Date(date);
                let options = {
                    year: '2-digit',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short',
                };
                resultDate = resultDate.toLocaleDateString('ru', options).replace(', ', ' — ');
                resultDate = resultDate.substr(0, resultDate.length - 2);
                resultDate = resultDate.split(' ');
                const month = resultDate[3];
                const slash = '/' + resultDate[4];
                resultDate[3] = month + slash;
                resultDate[4] = '';
                resultDate = resultDate.join(' ');

                return  resultDate;
            },
            closeEventEdition() {
                this.$emit('editionShow' , false);
            },
            openEventChanging() {
                this.$emit('eventChanging', {showPopup: true, event: this.event})
                this.closeEventEdition();
            },
        },
        created() {
            for (let i = 0; i < this.event.needs.length; i++) {
                if(this.event.needs[i].found) {
                    this.checkedEvents.push(this.event.needs[i].id)
                }
                this.needs.push(this.event.needs[i].id);
            }
        }
    }
</script>

