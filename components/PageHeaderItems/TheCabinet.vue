<template>
    <div class="page-header__cabinet cabinet" :class="{'cabinet--logged': $auth.$state.loggedIn}" v-if="$auth.$state.loggedIn" @click="showCabinetMenu">
        <div class="cabinet__desktop-img"  @click="showCabinetMenu" :style="{'background-image': 'url(' + profilePic + ')'}"></div>
        <svg @click="showCabinetMenu" width="40px" height="50px" viewBox="0 0 40 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <pattern id="img1" patternUnits="userSpaceOnUse" width="40" height="50">
                    <!--<image xlink:href="/app-icons/icon__pie.svg" x="0" y="0" width="40" height="50" />-->
                    <image v-if="$auth.$state.user.profile_pic !== '0' && $auth.$state.user.profile_pic !== ''" :xlink:href="$auth.$state.user.profile_pic" x="-25" y="00" width="80" height="60" />
                    <image v-else xlink:href="/app-icons/icon__user.svg" x="-70px" y="-38px" width="174" height="176" />
                </pattern>
                <filter x="0" y="0" width="40px" height="50px" filterUnits="objectBoundingBox" id="filter-3">
                    <feOffset dx="0" dy="25" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="35" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
            </defs>
            <g id="Symbols" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
                <g id="vender_photo">
                    <g id="user">
                        <g id="Bitmap">
                            <mask id="mask-2" fill="white">
                                <use xlink:href="#path-1"></use>
                            </mask>
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
                                <use fill="white" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-1"></use>
                                <!--<use fill="url(#image)" fill-rule="evenodd" xlink:href="#path-1"></use>-->
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <div class="cabinet__user-name"  @click="showCabinetMenu" v-text="$auth.$state.user.firstName"></div>
        <!--<div class="cabinet__user-logout" @click="logout">Выйти</div>-->
    </div>

    <nuxt-link :to="$store.state.desktop ? '/login/': '/'" class="page-header__cabinet page-header__cabinet--empty cabinet cabinet--empty" v-else-if="!$auth.$state.loggedIn">
        <span class="page-header__cabinet-button button button--aqua">Войти</span>
        <svg width="40px" height="50px" viewBox="0 0 40 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <pattern id="img1" patternUnits="userSpaceOnUse" width="40" height="50">
                    <image xlink:href="/app-icons/icon__pie.svg" x="0" y="0" width="40" height="50" />
                    <!--<image xlink:href="/photo-gallery/pic1.jpg" x="-25" y="00" width="80" height="60" />-->
                </pattern>
                <filter x="0" y="0" width="40px" height="50px" filterUnits="objectBoundingBox" id="filter-3">
                    <feOffset dx="0" dy="25" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="35" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
            </defs>
            <g id="Symbols" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
                <g id="vender_photo">
                    <g id="user">
                        <g id="Bitmap">
                            <mask id="mask-2" fill="white">
                                <use xlink:href="#path-1"></use>
                            </mask>
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
                                <use fill="white" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-1"></use>
                                <!--<use fill="url(#image)" fill-rule="evenodd" xlink:href="#path-1"></use>-->
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
            <svg class="page-header__cabinet-ext" width="40px" height="50px" viewBox="0 0 40 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <pattern id="img1" patternUnits="userSpaceOnUse" width="40" height="50">
                        <image xlink:href="/app-icons/icon__pie.svg" x="0" y="0" width="40" height="50" />
                        <!--<image xlink:href="/photo-gallery/pic1.jpg" x="-25" y="00" width="80" height="60" />-->
                    </pattern>
                    <filter x="0" y="0" width="40px" height="50px" filterUnits="objectBoundingBox" id="filter-3">
                        <feOffset dx="0" dy="25" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="35" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g id="Symbols" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
                    <g id="vender_photo">
                        <g id="user">
                            <g id="Bitmap">
                                <mask id="mask-2" fill="white">
                                    <use xlink:href="#path-1"></use>
                                </mask>
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
                                    <use fill="white" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-1"></use>
                                    <!--<use fill="url(#image)" fill-rule="evenodd" xlink:href="#path-1"></use>-->
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
    </nuxt-link>




</template>


<script>

    export default {
        name: "AppCabinet",
        data() {
            return {
                profilePic: '/app-icons/icon__user-def.svg'
            }
        },
        props: {
           userLogged: {
               type: Boolean,
               required: false,
               default: false
           }
        },
        methods: {
            showCabinetMenu() {
                // if(this.$route.name !== 'cabinet') {
                    this.$emit('showCabinetMenu', {
                        showCabinetMenu: true
                    });
                // }
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
                });
                // this.$auth.logout();
            }
        },
        created() {
            if(this.$auth.$state.user !== null) {
                if(this.$auth.$state.user.profile_pic) {
                    this.profilePic = this.$auth.$state.user.profile_pic;
                }
            }
        }
    }
</script>