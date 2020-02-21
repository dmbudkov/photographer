<template>

    <header class="page-header page-header--vendor-detail">
        <div class="page-header__back back" @click="backEvent"></div>
        <nuxt-link to="/" class="page-header__logo-ext">
        </nuxt-link>
        <no-ssr>
            <transition name="fade">
                <cabinet-app @showCabinetMenu="handleShowCabinetMenu($event)" :userLogged="$auth.$state.loggedIn" :class="{'cabinet--active': showCabinetMenu}"></cabinet-app>
            </transition>
        </no-ssr>
        <!--<nuxt-link to="" class="page-header__reg">Регистрация</nuxt-link>-->


        <!--<router-link v-if="!fromCatalog" :to="'/catalog/' + speciality + '/filter_'" class="page-header__back back"></router-link>-->
        <!--<a :href="'tel:' + phone" class="page-header__call"></a>-->
        <!--<div v-if="$store.state.auth.user" class="page-header__chat chat chat&#45;&#45;white" @click="startDialog">-->
            <!--&lt;!&ndash;<span class="chat__msgs-quantity">&ndash;&gt;-->
                <!--&lt;!&ndash;2&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
        <!--</div>-->
        <vendor-types class="page-header__types vendor-type--header" v-if="$store.state.desktop" :specialities="$store.state.specialities"></vendor-types>
        <!--<div @click="goToLogin" v-if="!$store.state.auth.user"  class="page-header__chat chat chat&#45;&#45;white"></div>-->
        <!--<no-ssr>-->
            <!--<city-choice class="page-header__city" v-show="this.$route.name === 'index'" v-if="$store.state.desktop"></city-choice>-->
        <!--</no-ssr>-->
        <nuxt-link  to="/search/" class="page-header__search">
            <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>search</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="search" transform="translate(-11.000000, -16.000000)" stroke="#fff" stroke-width="3">
                        <g transform="translate(11.500000, 16.500000)">
                            <circle id="Combined-Shape" cx="8" cy="8" r="6.5"></circle>
                            <path d="M13.5,13.5 L16.5,16.5" id="Line" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </g>
                </g>
            </svg>
        </nuxt-link>
        <!--<city-choice></city-choice>-->
        <no-ssr>
            <menu-app></menu-app>
        </no-ssr>
        <no-ssr>
            <menu-cabinet v-if="showCabinetMenu" :class="{'menu--cabinet-opened': showCabinetMenu}" @showCabinetMenu="handleShowCabinetMenu($event);"></menu-cabinet>
        </no-ssr>
    </header>
</template>
<script type="text/javascript">
    import NoSSR from 'vue-no-ssr';
    import Cabinet from "~/components/PageHeaderItems/TheCabinet.vue"
    import CityChoice from "~/components/PageHeaderItems/TheCityChoice.vue"
    import Menu from "~/components/PageHeaderItems/TheMenu.vue"
    import MenuCabinet from "~/components/PageHeaderItems/TheCabinetMenu.vue"
    import VendorTypes from "~/components/FilterElements/CatalogVendorType.vue";
    export default {
        name: 'PageHeader',
        components: {
            'cabinet-app': Cabinet,
            'city-choice': CityChoice,
            'menu-app': Menu,
            'menu-cabinet': MenuCabinet,
            'no-ssr': NoSSR,
            'vendor-types': VendorTypes
        },
        data() {
            return {
                showCabinetMenu: false
            }
        },
         props: {
             phone: {
                type: String,
                default: '12345'
            },
            userInfo: {
              type: Object,
              default: function () {
                  return {};
              }
            },
             speciality: {
                 type: Number,
                 default: 1
             }
         },
        methods: {
            goToLogin() {
                this.clickSendMessage();
                this.$router.push({path: '/login/', query: {type: 'client'}})
            },
            handleShowCabinetMenu(data) {
                this.showCabinetMenu = data.showCabinetMenu;

                const pageHeaderClassList = document.querySelector('.page-header').classList;
                const bodyClassList = document.querySelector('body').classList;
                if (this.showCabinetMenu) {
                    pageHeaderClassList.add('page-header--opened');
                    //     bodyClassList.add('no-scroll');
                } else {
                    pageHeaderClassList.remove('page-header--opened');
                    //     bodyClassList.remove('no-scroll');
                }
            },
          backEvent: function () {
              if (this.$route.query.hasOwnProperty('catalog')) {
                  this.$router.back();
              } else if (this.$route.query.hasOwnProperty('search')) {
                  this.$router.push('/search/');
              } else {
                  this.$router.push(
                      {
                          path: `/catalog/${this.speciality}/filter_`,
                          query: {
                              city: this.$store.state.userCity.id
                          }
                      }
                  )
              }
          },
          clickSendMessage() {
              if(window) {
                  window.yaCounter48643421.reachGoal('click_on_message', {vendorId: +this.$route.params.id});
              }
          },
          startDialog() {
              let chats = this.$store.state.availableChats;
              let itemInChats = chats.findIndex((el) => {
                  return el.id === this.id;
              });
              if(itemInChats === -1) {
                  chats.push({
                      body: '',
                      created_at: new Date(),
                      id: this.userInfo.id,
                      interlocutor: {
                          firstName: this.userInfo.firstName,
                          lastName: this.userInfo.lastName,
                          profile_pic: this.userInfo.pic
                      },
                      read: true,
                      selfMessage: true,
                      new: true,
                      user: this.$store.state.auth.user,
                      user_id: this.$store.state.auth.user.id,
                      user_to: this.userInfo.id
                  });
                  this.$store.commit({
                      type: 'setAvailableChats',
                      chats: chats
                  });
                  this.$store.commit({
                      type: 'setCurrentDialog',
                      userInfo: {
                          name: `${this.userInfo.firstName} ${this.userInfo.lastName}`,
                          userPic: this.userInfo.pic
                      }
                  });
              }
              this.clickSendMessage();
              this.$router.push(`/cabinet/chat/${this.userInfo.id}`);
          }
        },
        created() {

        }
    }
</script>
