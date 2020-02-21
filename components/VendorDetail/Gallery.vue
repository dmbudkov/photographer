<template>
    <transition name="fade">
        <div class="detail-view detail-view--cabinet detail-view--vendorDetail">
            <div class="detail-view__top">
                <div class="detail-view__name"></div>
                <div class="detail-view__closer" @click="showGallery">
                </div>
                <div class="detail-view__count">
                    <span>{{activePhoto + 1}}</span> из <span>{{galleryItems.photos.length}}</span>
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
                        <div class="swiper-slide detail-view__slide" v-for="(item, index) in galleryItems.photos"
                             v-if="item.link.length > 0" :key="index">
                            <!--<img :src="item.link" alt="">-->
                            <div class="detail-view__slide-image" :style="{'background-image': 'url(' + item.link + ')'}"></div>
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
                type: Object
            },
        },
        data() {
            return {
                activePhoto: 0,
                swiperOption: {
                    on: {
                        slideChange: () => {
                            if (this.mySwiper) {
                                this.activePhoto = this.mySwiper.realIndex;
                            }
                        }
                    },
                    loop: true,
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
        }

    }

</script>