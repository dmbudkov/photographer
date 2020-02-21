<template>
    <transition name="fade">
        <div class="detail-view detail-view--cabinet detail-view--vendorDetail">
            <div class="detail-view__top">
                <div class="detail-view__name"></div>
                <div class="detail-view__closer" @click="showGallery">
                </div>
                <div class="detail-view__count">
                    <span>{{activePhoto + 1}}</span> из <span>{{galleryItems.length}}</span>
                </div>
            </div>
            <div class="detail-view__slider">
                <!--<carousel :per-page="1" :navigate-to="activePhoto" :paginationEnabled="false">-->
                <!--<slide v-for="(item, index) in galleryItems" v-if="item.dataUrl.length > 0" class="detail-view__slide" :key="index" >-->
                <!--<img :src="item.dataUrl" alt="">-->
                <!--</slide>-->
                <!--</carousel>-->
                <div v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide detail-view__slide" v-for="(item, index) in galleryItems" :key="index">
                            <div v-if="item.type === 'video'" class="detail-view__slide-frameHolder">
                            <iframe  class="detail-view__slide-frame" :src="item.link" :ref="'frame' + index" frameborder="0"  allowfullscreen="allowfullscreen"
                                     mozallowfullscreen="mozallowfullscreen"
                                     msallowfullscreen="msallowfullscreen"
                                     oallowfullscreen="oallowfullscreen"
                                     webkitallowfullscreen="webkitallowfullscreen"></iframe>
                            </div>
                            <!--<img :src="item.link" alt="">-->
                            <div class="detail-view__slide-image" v-if="item.type === 'photo'" :style="{'background-image': 'url(' + item.media.fullscreen + ')'}"></div>
                        </div>
                    </div>
                </div>
                <div class="detail-view__arrow detail-view__arrow--prev"></div>
                <div class="detail-view__arrow detail-view__arrow--next"></div>
            </div>
        </div>
    </transition>
</template>
<script>


    export default {
        name: 'VendorGallery',
        props: {
            galleryItems: {
                default: function () {
                    return {};
                },
                type: Array
            },
            currentIndex: {
                default: 0,
                type: Number
            }
        },
        data() {
            return {
                activePhoto: 0,
                swiperOption: {
                    on: {
                        slideChange: () => {
                            this.activePhoto = this.mySwiper.realIndex;
                        }
                    },
                    navigation: {
                        nextEl: '.detail-view__arrow--next',
                        prevEl: '.detail-view__arrow--prev',
                    },
                    // keyboard: true
                }
            }
        },
        methods: {
            showGallery() {
                this.$emit('showGallery', false);
            },
        },
        created() {
            this.activePhoto = this.currentIndex;

            // this.$swiper.
        },
        mounted() {
            this.mySwiper.slideTo(this.activePhoto, 0)
        }

    }

</script>