import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex)


const watchState = store => {
    store.subscribe((mutation, state) => {
        if(mutation.type === 'auth/SET') {
            if (mutation.payload.key === 'user'
                && mutation.payload.value !== false) {

                store.dispatch('setAvailableChats');
                store.dispatch('setProgress');
            }
        }
    })
}


const store = () => {
    return new Vuex.Store({
        plugins: [watchState],
        state: {
            vendorType: '',
            specialities: [],
            userCity: {},
            profileCity: {},
            cityList: [],
            vendorsList: [],
            catalogVendorsList: [],
            editableContent: {},
            searchQuery: '',
            currentDialogInfo: {},
            availableChats: [],
            mobileView: false,
            showCityPopup: false,
            desktop: false,
            socialParams: {
                firstName: '',
                lastName: '',
                id: null,
                social: null
            },
            progress: 0
        },
        mutations: {
            setCatalogVendorsList(state, prop) {
              state.catalogVendorsList = prop;
            },
            setAvailableSpecialities(state, prop) {
                state.specialities = prop;
            },
            setCityListSSR(state, prop) {
                state.cityList = prop;
            },
            setSearchQuery(state, prop) {
               state.searchQuery = prop;
            },
            setdefCitySSR(state, prop) {
                state.userCity = prop;
            },
            setCityPopup(state, prop) {
                state.showCityPopup = prop.popupShow;
            },
            setUserCity(state, prop) {
                state.userCity = prop.cityData;
            },
            setProfileCity(state, prop) {
                state.profileCity = prop.cityData;
            },
            setCityList(state, prop) {
                state.cityList = prop.cityList;
            },
            setUserDescription(state, prop) {
              state.auth.user.description = prop.description;
            },
            setDesktopView(state, prop) {
                state.desktop = prop;
            },
            setDevice(state, prop) {
                state.mobileView = prop.mobileView;
            },
            setVendors(state, prop) {
                state.vendorsList = prop;
            },
            setCurrentDialog(state, prop) {
                state.currentDialogInfo = prop.userInfo;
            },
            setAvailableChats(state, prop) {
                state.availableChats = prop.chats;
            },
            setState(state, prop) {
                state[prop.type] = prop.data;
            },
            setProgress(state, prop) {
                state.progress = prop.progress;
            }
        },
        actions: {
            nuxtClientInit({commit}) {
                let storageCityValue = window.localStorage.getItem('city');
                if(storageCityValue !== null) {
                    storageCityValue = JSON.parse(storageCityValue);
                    commit({
                        type: 'setUserCity',
                        cityData: {
                            title: storageCityValue.title,
                            id: storageCityValue.id,
                            code: storageCityValue.code
                        }
                    });
                }
            },
            setAvailableChats({commit, state}) {

                this.$axios({
                    method: 'get',
                    url: `/api/chats?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
                }).then((response) => {

                    let chatsNew = response.data;
                    let chats = state.availableChats;
                    if(chats.length > 0) {
                        chats.concat(chatsNew);
                    } else {
                        chats = chatsNew;
                    }

                    commit({
                        type: 'setAvailableChats',
                        chats: chats
                    })
                })

            },
            setProgress({commit, state}) {

                this.$axios({
                    method: 'get',
                    url: `/api/vendor/progress/${state.auth.user.id}`
                }).then((resp) => {
                    let userProgress = resp.data;

                    commit({
                        type: 'setProgress',
                        progress: parseInt(userProgress)
                    })
                });

            },
            async nuxtServerInit({commit}, {app}) {
                const getSpec = await app.$axios.get('/api/vendor/specialities');
                const getEditableContent = await app.$axios.get('/api/content');
                const getCities = await app.$axios.get('/api/city');
                const getDefaultCity = await app.$axios.get('/api/city/default');
                let specialities = []
                for(let i = 0; i < getSpec.data.length; i++) {
                    if(getSpec.data[i].id === 2) {
                        continue
                    }
                    specialities.push(getSpec.data[i]);
                }
                specialities.sort((a, b) => {
                    return a.sort - b.sort;
                })
                // const vendors = [];
                // const vendors = await app.$axios.post('/api/catalog/', {
                //     speciality: -1,
                //     properties: [],
                //     // sort: "hotDateToday"
                // })
                commit('setAvailableSpecialities', specialities);
                commit('setCityListSSR', getCities.data);
                // commit('setVendors', vendors.data.vendors);
                commit('setState', {type: 'editableContent', data: getEditableContent.data[0]});
                commit({
                    type: 'setUserCity',
                    cityData: {
                        title: getDefaultCity.data.title,
                        id: getDefaultCity.data.id,
                        code: getDefaultCity.data.code
                    }
                });
            },
            // async getDefCity({commit}) {
            //     return axios({
            //         method: 'get',
            //         url: '/api/city/default'
            //     }).then((response) => {
            //         commit({
            //             type: 'setUserCity',
            //             cityData: {
            //                 title: response.data.title,
            //                 id: response.data.id,
            //                 code: response.data.code
            //             }
            //         })
            //     })
            // }
        },
        getters: {
            getSpecialities: (state) => {
                return state.specialities;
            },
            getUserCityId: (state) => {
                return state.userCity.id;
            },
            getUserCity: (state) => {
                return state.userCity;
            },
            getUserInfo: (state) => {
                return state.auth.user;
            },
            getProgress: (state) => {
                return state.progress;
            }
        }
    })
}

export default store