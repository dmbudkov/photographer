<template>
    <div class="page-header__city city-select">
        <div class="city-select__name" @click="showSearchPanelEvent" v-text="selectedCity"></div>
        <div class="popup-overlay" v-if="showSearchPanel" @click="closeSearchPanelEvent"></div>
        <form  v-if="showSearchPanel" class="city-select__popup filter-tab filter-tab--popup filter-tab--centered filter-tab--search">
            <div class="filter-tab__top">
                <div class="filter-tab__closer" @click="closeSearchPanelEvent"></div>
                <div class="filter-tab__name">Город</div>
                <label class="filter-tab__clear">
                    <input type="reset" id="reset" value="Очистить" >
                </label>
            </div>
            <div class="filter-tab__items">
                <div class="fast-search">
                    <input type="reset" class="fast-search__clear"/>
                    <input type="text" class="fast-search__input" v-focus autofocus placeholder="Выберите город" v-model="search"/>
                    <ul class="fast-search__results">
                        <li v-for="(city, index) in filteredCityList" :ref="'city' + city.id" class="fast-search__results-item" :key="index" v-text="city.title" :data-id="city.id" :data-code="city.code" :data-title="city.title" @click="selectCity('city' + city.id)"></li>
                    </ul>
                </div>
                <!--<div class="filter-tab__section">-->
                <!--<div class="filter-tab__section -name">Город</div>-->
                <!--<multi-select :searchable="true" class="multiselect&#45;&#45;searchable"-->
                <!--:show-labels="false" v-model="citySelected" track-by="name" label="name" value="Город" placeholder="Выберите город" :options="cityList"></multi-select>-->
                <!--</div>-->
            </div>
        </form>

    </div>

</template>

<script>
    export default {
        name: 'CityChoice',
        data() {
            return {
                showSearchPanel: false,
                cityList: this.$store.state.cityList,
                search: '',
                selectedCity: 'Выберите город',
                selectedCityId: null
            }
        },
        computed: {
            filteredCityList() {
                return this.cityList.filter(city => {
                    return city.title.toLowerCase().indexOf(this.search.toLowerCase()) === 0;
                })
            },
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        methods: {
            showSearchPanelEvent() {
                this.showSearchPanel = true;
                this.$store.commit({
                    type: 'setCityPopup',
                    popupShow: true
                })
            },
            closeSearchPanelEvent() {
                this.showSearchPanel = false;
                this.$store.commit({
                    type: 'setCityPopup',
                    popupShow: false
                })
            },
            getUserCity() {
               const userCity = this.$store.getters.getUserCity;
                    this.selectedCity = userCity.title;
                    this.selectedCityId = userCity.id;

            },
            selectCity(cityId) {
                this.selectedCityId = +this.$refs[cityId][0].dataset.id;
                this.selectedCity  = this.$refs[cityId][0].dataset.title;
                this.selectedCityCode  = this.$refs[cityId][0].dataset.code;
                this.$store.commit({
                    type: 'setUserCity',
                    cityData: {title: this.selectedCity, id: this.selectedCityId, code: this.selectedCityCode}
                })
                window.localStorage.setItem('city', JSON.stringify({title: this.selectedCity, id: this.selectedCityId, code: this.selectedCityCode}))

                this.$store.commit({
                    type: 'setCityPopup',
                    popupShow: false
                })
                this.showSearchPanel = false;
            },

        },
        created() {
                // this.getCities();
                if(!this.$store.state.userCity.hasOwnProperty('id')) {
                    this.getUserCity();
                } else {
                    this.selectedCity = this.$store.state.userCity.title;
                    this.selectedCityId = this.$store.state.userCity.id;
                }
        }
    }
</script>
