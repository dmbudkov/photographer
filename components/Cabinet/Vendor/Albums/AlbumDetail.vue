<template>
    <div class="filter-tab filter-tab--centered filter-tab--album filter-tab--album-detail">
        <transition name="fade">
            <div class="detail-view detail-view--cabinet" v-show="showDetail">
                <div class="detail-view__top">
                    <div class="detail-view__closer" @click="closeDetail">
                    </div>
                    <div class="detail-view__count">
                        <span>{{activeIndex + 1}}</span> из <span>{{albumData.photos.length}}</span>
                    </div>
                    <div class="detail-view__remove" @click="removePhotoEvent">Удалить</div>
                </div>
                <div class="detail-view__slider">
                    <!--<carousel :per-page="1" :navigate-to="activePhoto" :paginationEnabled="false">-->
                    <!--<slide v-for="(item, index) in galleryItems" v-if="item.dataUrl.length > 0" class="detail-view__slide" :key="index" >-->
                    <!--<img :src="item.dataUrl" alt="">-->
                    <!--</slide>-->
                    <!--</carousel>-->
                    <div v-swiper:mySwiper="swiperOption" ref="photoSlider">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide detail-view__slide" :data-id="item.id" v-for="(item, index) in albumData.photos" v-if="item.link.length > 0" :key="index">
                                <!--<img :src="item.link" alt="">-->
                                <div class="detail-view__slide-image" :style="{'background-image': 'url(' + item.link + ')'}"></div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-view__arrow detail-view__arrow--prev" @click="mySwiper.slidePrev(200)"></div>
                    <div class="detail-view__arrow detail-view__arrow--next" @click="mySwiper.slideNext(200)"></div>
                </div>
            </div>
        </transition>


        <div class="filter-tab__top">
        <div class="filter-tab__back back back--black back--round" @click="showGallery"></div>
        <div class="filter-tab__name" v-text="albumData.title"></div>
    </div>
    <div class="filter-tab__items">
        <div class="photo-gallery" ref="photoGallery">
            <div class="photo-gallery__item media-element media-element--photo media-element--photo-small media-element--add" v-if="$store.state.desktop" @click.prevent="albumCreation = true;">
                <drop-zone class="media-element__drop" v-if="$store.state.desktop" ref="userGalleryDesktop" v-on:vdropzone-success="fileAddedEvent" :include-styling="false" id="userGalleryDesktop" :options="dropzoneOptions" >
                </drop-zone>
                <div class="media-element__icon-holder">
                    <div class="media-element__icon"></div>
                    <div class="media-element__icon-text">Добавить фото</div>
                </div>
            </div>

            <div v-for="(item,index) in albumData.photos" v-if="albumData.photos.length > 0"  :style="{'background-image': 'url(' + item.link + ')'}" :key="item.id" class="photo-gallery__item" @click="showDetailEvent(index, item.id);"></div>
        </div>
    </div>
    <div class="filter-tab__button-holder">
        <drop-zone class="button--drop button button--violet" ref="userGallery" v-on:vdropzone-success="fileAddedEvent" :include-styling="false" id="userGallery" :options="dropzoneOptions" >Добавить фото
        </drop-zone>
        <!--<button class="button button&#45;&#45;violet">-->
        <!--Добавить фото-->
        <!--</button>-->
    </div>
    </div>
</template>

<script>

    // import vue2Dropzone from 'vue2-dropzone';
    import axios from 'axios';
    //    import { Carousel, Slide } from 'vue-carousel';
    export default {
        name: 'VendorGallery',
        components: {
            // 'drop-zone': vue2Dropzone,
//            'carousel': Carousel,
//            'slide': Slide
        },
        props: {
            albumData: {
                default: {},
                type: Object
            }
//            showGallery: {
//                default: false,
//                type: Boolean
//            }
        },
        data() {
            return {
                dropzoneOptions: {
                    url: `/api/media?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    maxFilesize: 15,
                    maxFiles: 100
                },
                swiperOption: {
                    on: {
                        slideChange: () => {
                            this.activeIndex =  this.mySwiper.realIndex;
                            this.activePhoto = this.mySwiper.slides[this.mySwiper.realIndex].dataset.id;
                            console.log(this.mySwiper)
                            console.log('attach');

                        }
                    }
                },
                navigation: {
                    nextEl: '.detail-view__arrow--next',
                    prevEl: '.detail-view__arrow--prev',
                },
                activeIndex: 0,
                activePhoto: 0,
                showDetail: false,
                keyboard: true

            }
        },
        methods: {

            showGallery() {
                this.$emit('closeDetail', false);
            },
            closeDetail() {
                const mainNode = document.querySelector('.main');
                if(this.$store.state.desktop && mainNode.classList.contains('main--overlay')) {
                    mainNode.classList.remove('main--overlay');
                }
                this.showDetail = false;
            },
            showDetailEvent(index, activePhoto) {
                this.activeIndex = index;
                this.activePhoto = activePhoto;
                this.mySwiper.slideTo(this.activeIndex)
                this.showDetail = true;
                if(this.$store.state.desktop) {
                    const mainNode = document.querySelector('.main');
                          mainNode.classList.add('main--overlay');
                }
            },
            removePhotoEvent() {
                let activePhoto = this.albumData.photos[+this.activeIndex].id;
                this.albumData.photos.splice(+this.activeIndex, 1);
                axios({
                    method: 'delete',
                    // url: `/api/media?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    url: `/api/photos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {id: activePhoto}
                }).then((response) => {
                    this.$emit('albumsChanged', null);
                });
                if(this.albumData.photos.length === 0) {
                    this.showDetail = false;
                    const mainNode = document.querySelector('.main');
                    if(this.$store.state.desktop && mainNode.classList.contains('main--overlay')) {
                        mainNode.classList.remove('main--overlay');
                    }
                }
            },
            fileAddedEvent(file, xhr) {
                this.albumData.photos.unshift({link: xhr.link, id: xhr.id});
                this.$axios({
                    method: 'post',
                    url: `/api/albums/photos/`,
                    data: {
                        user_id: this.$store.state.auth.user.id,
                        media_id: xhr.id,
                        album_id: this.albumData.id,
                        link: xhr.link
                    }
                }).then((response) => {
                    this.$emit('albumsChanged', null);
                })

            }
        },
    }
</script>

