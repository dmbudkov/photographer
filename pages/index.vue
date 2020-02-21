<template >

  <div class="wrapper">

    <div class="page-wrapper page-wrapper--main">
      <page-header></page-header>
      <main class="main main--index" :class="{'main--popup-opened': $store.state.showCityPopup }">
        <div class="main__background" :class="{'main__background--short': $store.state.desktop}">
          <div class="main__logo">
              <div class="main__logo-pie"></div>
          </div>
        </div>
        <!--<vendor-types class="vendor-type&#45;&#45;main" :specialities="$store.state.specialities"></vendor-types>-->
        <main-filter>
        </main-filter>
        <main-offers></main-offers>
        <div @click="handleBannerClick" class="tender-banner">
          <div class="tender-banner__holder">
            <h5 class="tender-banner__title">Создать заявку!</h5>
            <p class="tender-banner__text">Найдите исполнителя с лучшим предложением!</p>
            <div class="tender-banner__button" @click="analyticsEvent" v-text="$store.state.editableContent['main_button_text']">Создать сейчас</div>
          </div>
        </div>
        <div class="two-columns two-columns--white-bg">
          <div class="two-columns__holder">
            <main-video></main-video>
            <main-descr></main-descr>
          </div>
        </div>
      </main>
    </div>
      <page-footer></page-footer>
  </div>
</template>

<script>
  import PageHeader from '~/components/PageHeader/PageHeader.vue';
  import PageFooter from '~/components/PageFooter.vue';
  import MainFilter from '~/components/MainFilter.vue';
  import MainOffers from '~/components/Offers/Offers.vue';
  import TheMainVideo from '~/components/TheMainVideo.vue';
  import TheMainDescription from '~/components/TheMainDescription.vue';
  import VendorTypes from "~/components/FilterElements/CatalogVendorType.vue";
  export default {
    components: {
      'page-header': PageHeader,
      'page-footer': PageFooter,
      'main-filter': MainFilter,
      'main-offers': MainOffers,
      'main-video': TheMainVideo,
      'main-descr': TheMainDescription,
      'vendor-types': VendorTypes,
    },
    head: {
      title: 'nachinka.me — это быстрый и функциональный онлайн-сервис для тех, кто ищет фотографа, оператора, ведущего, ресторан, артиста или место для своего события.'
    },
    data() {
      return {
        auth: false,
        showDesktopLayer: true,
      }
    },
    methods: {
        handleBannerClick() {
            if(this.$store.state.auth.loggedIn) {
                this.$router.push({name: 'cabinet-tenders', path: '/cabinet/tenders/',
                 params: {
                    showPopup: true
                 }})
            } else {
                if(window) {
                    window.localStorage.setItem('showTenderTab', true);
                }
                this.$router.push(
                    {
                        path: '/login/',
                        query: {
                            type: 'client'
                        }
                });
            }
        },
        analyticsEvent() {
            if(window) {
                window.yaCounter48643421.reachGoal('click_on_tender');
            }
        },
    }
  }

</script>

<style>

</style>
