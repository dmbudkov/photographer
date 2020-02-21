<template>
    <nav class="page-header__menu menu menu--cabinet" ref="cabinetMenu">
        <div class="menu__closer" @click="showCabinetMenu"></div>
        <div class="menu__top">
            <div class="menu__cabinet cabinet" v-if="$auth.$state.loggedIn">

                <svg class="avatar-pic" v-if="$auth.$state.user.avatar !== '0' && $auth.$state.user.avatar !== ''" width="40px" height="50px" viewBox="0 0 40 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <pattern id="img1" patternUnits="userSpaceOnUse" width="40" height="50">
                            <!--<image xlink:href="/app-icons/icon__pie.svg" x="0" y="0" width="40" height="50" />-->
                            <image v-if="$auth.$state.user.avatar !== '0' || $auth.$state.user.avatar !== ''" :xlink:href="$auth.$state.user.avatar" x="-25" y="00" width="80" height="60" />
                            <!--<image v-else xlink:href="/app-icons/icon__user-invert@2x.png" x="-0" y="-0" width="50" height="40"></image>-->
                        </pattern>
                        <filter x="0" y="0" width="40px" height="50px" filterUnits="objectBoundingBox" id="filter-3">
                            <feOffset dx="0" dy="25" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                            <feGaussianBlur stdDeviation="35" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                        </filter>
                    </defs>
                    <g id="Symbols" stroke="none" stroke-width="1" fill-rule="evenodd">
                        <g id="vender_photo">
                            <g id="user">
                                <g id="Bitmap">
                                    <!--<path d="M5,50-->
                                    <!--l0,100 l100,0 l0,-100 l-100,0-->
                                    <!--M215,100-->
                                    <!--a50,50 0 1 1 -100,0 50,50 0 1 1 100,0-->
                                    <!--M265,50-->
                                    <!--l50,100 l-100,0 l50,-100-->
                                    <!--z"-->
                                    <!--fill="url(#img1)" />-->
                                    <g id="Mask">
                                        <path d="M0.00109191245,4.31501198 L0.00109191245,45.6892148 C0.00109191245,45.6892148 -0.119291435,48.280624 2.16799217,49.4585372 C4.06402989,50.4303157 5.96006761,49.9002547 7.13380525,49.3701937 C8.33763872,48.8401328 37.3500254,35.7652957 37.3500254,35.7652957 C37.3500254,35.7652957 38.4635714,35.4119217 39.2460632,34.2045607 C39.7275966,33.438917 39.9984591,32.2904516 39.9984591,30.9064036 C39.9984591,27.2843203 39.9984591,22.1898455 39.9984591,20.0696017 C39.9984591,18.8916884 40.0586508,17.3309534 39.4266382,16.1235923 C38.915009,15.122366 37.8917505,14.4450659 36.4471503,13.7677658 C33.2268958,12.2953742 8.00658452,0.987407057 8.00658452,0.987407057 C8.00658452,0.987407057 4.54556328,-0.926701972 2.198088,0.57513742 C2.198088,0.57513742 0.091379423,1.57636368 0.00109191245,4.31501198 Z" id="path-1" fill="url(#img1)"></path>
                                        <!--<use fill="white" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-1"></use>-->
                                        <!--<use fill="url(#image)" fill-rule="evenodd" xlink:href="#path-1"></use>-->
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <svg v-else class="avatar-pic avatar-pic--empty" width="40px" height="50px" viewBox="0 0 40 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="user_no_photo_invert" fill="#dce3eb">
                            <g id="user">
                                <path d="M0.00109191245,4.31501198 C0.091379423,1.57636368 2.198088,0.57513742 2.198088,0.57513742 C4.54556328,-0.926701972 8.00658452,0.987407057 8.00658452,0.987407057 C8.00658452,0.987407057 33.2268958,12.2953742 36.4471503,13.7677658 C37.8917505,14.4450659 38.915009,15.122366 39.4266382,16.1235923 C40.0586508,17.3309534 39.9984591,18.8916884 39.9984591,20.0696017 C39.9984591,22.1898455 39.9984591,27.2843203 39.9984591,30.9064036 C39.9984591,32.2904516 39.7275966,33.438917 39.2460632,34.2045607 C38.4635714,35.4119217 37.3500254,35.7652957 37.3500254,35.7652957 C37.3500254,35.7652957 8.33763872,48.8401328 7.13380525,49.3701937 C5.96006761,49.9002547 4.06402989,50.4303157 2.16799217,49.4585372 C-0.119291435,48.280624 0.00109191245,45.6892148 0.00109191245,45.6892148 L0.00109191245,4.31501198 Z M17.8236015,24.2241194 C20.1472946,24.2241194 22.0702394,22.3722751 22.0702394,20.0130318 C22.0702394,17.6537885 20.1472946,15.7663939 17.8236015,15.7663939 C15.4999085,15.7663939 13.5769637,17.6182383 13.5769637,19.9774816 C13.5769637,22.3367248 15.4999085,24.2241194 17.8236015,24.2241194 Z M20.6870119,25.1690953 C20.5081834,25.1238496 20.272259,25.1917182 19.9792389,25.3727013 L17.8236015,26.7501398 L15.6679642,25.3727013 C15.3533984,25.1938728 15.1174741,25.1260041 14.9601912,25.1690953 C11.893175,26.1806613 10.4465893,28.67241 10.4465893,31.4679517 C10.4465893,31.7157261 10.6717408,31.9408776 11.1220438,32.1434062 C13.2522132,33.225398 15.4860657,33.7663939 17.8236015,33.7663939 C20.1611374,33.7663939 22.3960672,33.225398 24.5283911,32.1434062 C24.9786942,31.9408776 25.2038457,31.7157261 25.2038457,31.4679517 C25.2006138,28.67241 23.7540281,26.1806613 20.6870119,25.1690953 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                    <div class="cabinet__user-name">
                        {{$auth.$state.user.firstName}}
                    </div>
            </div>

        </div>
        <div class="menu__list-holder">
            <ul class="menu__list menu__list--client" v-if="$auth.$state.user.type === 'client'">
                <li class="menu__item" >
                    <nuxt-link @click="showCabinetMenu" :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab1'}}">Быстрый подбор</nuxt-link>
                </li>
                <li class="menu__item" >
                    <nuxt-link  to="/cabinet/chat">Мои сообщения</nuxt-link>
                </li>
                <li class="menu__item" >
                    <nuxt-link  to="/cabinet/tenders/">Мои тендеры</nuxt-link>
                </li>
                <!--<li class="menu__item" >-->
                    <!--<nuxt-link @click="showCabinetMenu" :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab3'}}">Мои события</nuxt-link>-->
                <!--</li>-->
                <li class="menu__item menu__item--black">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab4'}}">Профиль</nuxt-link>
                </li>
                <li class="menu__item menu__item--blue" @click="logout">
                    <span>Выйти</span>
                </li>
            </ul>
            <ul class="menu__list" v-else>
                <!--<li class="menu__item">-->
                    <!--<router-link to="/catalog/" >Быстрый подбор</router-link>-->
                <!--</li>-->
                <!--<li class="menu__item menu__item&#45;&#45;message" >-->
                    <!--<nuxt-link @click="showCabinetMenu" :to="{name:'cabinet', path: '/cabinet', params: {tab: 'tab1'}}">Мои сообщения</nuxt-link>-->
                    <!--<div class="menu__item-icon missed">2</div>-->
                <!--</li>-->
                <li class="menu__item" >
                    <nuxt-link @click="showCabinetMenu" :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab1'}}">Мои события</nuxt-link>
                </li>
                <li class="menu__item" >
                    <nuxt-link @click="showCabinetMenu" :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab2'}}">Мой календарь</nuxt-link>
                </li>
                <li class="menu__item" >
                    <nuxt-link  to="/cabinet/chat">Мои сообщения</nuxt-link>
                </li>
                <li class="menu__item" >
                    <nuxt-link  to="/cabinet/tenders/">Мои тендеры</nuxt-link>
                </li>
                <li class="menu__item menu__item--black">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab3'}}">Профиль</nuxt-link>
                </li>
                <!--<li class="menu__item menu__item&#45;&#45;black">-->
                    <!--<nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab4'}}">Настройки</nuxt-link>-->
                <!--</li>-->
                <li class="menu__item menu__item--blue" @click="logout">
                    <span>Выйти</span>
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
    export default {
        data() {
            return {

            }
        },

        methods: {
            routeHandle(tabId) {
                this.$router.push({name:'cabinet', path: '/cabinet/', params: { tab: tabId }});
            },
            showCabinetMenu() {
                this.$emit('showCabinetMenu', {
                    showCabinetMenu: false
                })
            },
            clickBeyond(event) {
                if(event.target !== this.$refs.cabinetMenu) {
                    this.$emit('showCabinetMenu', {
                        showCabinetMenu: false
                    })
                }
            },
            logout() {
                this.$axios({
                    method: 'post',
                    url: '/api/logout/',
                    data: {
                        token: this.$auth.$storage['_state']['_token.local'].split(' ')[1]
                    }
                }).then((response) => {
                    this.$auth.logout();
                    this.$store.commit({
                        type: 'setAvailableChats',
                        chats: []
                    });
                });
                // this.$auth.logout(this.$auth.$storage['_state']['_token.local'].split(' ')[1]);
            },
        },
        mounted() {
            document.addEventListener('click', this.clickBeyond);
        },
        destroyed() {
            document.removeEventListener('click', this.clickBeyond);
        }
    }
</script>