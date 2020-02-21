<template>
    <div class="filter-tab filter-tab--centered filter-tab--photo-album" :class="{'filter-tab--desktop': $store.state.desktop}">
        <div class="popup-overlay" v-if="albumCreation || albumEditing"  @click="disableOverlay"></div>
        <transition name="fade">
                <album-creation @albumsChanged="handleAlbumsChanging($event);" @closeCreation="handleCloseCreation($event);" v-if="albumCreation"></album-creation>
        </transition>
        <transition name="fade">
           <album-editing @albumsChanged="handleAlbumsChanging($event);" @closeEdition="handleCloseEditing($event);" :albumEditingData="albumEditingData" v-if="albumEditing"></album-editing>
        </transition>
        <transition name="fade">
            <album-detail v-if="albumDetail" @closeDetail="handleCloseDetail($event);" @albumsChanged="handleAlbumsChanging($event);" :albumData="openedAlbum"></album-detail>
        </transition>


        <div v-if="!albumDetail" class="filter-tab__top">
            <div class="filter-tab__back back back--black" @click="showGallery">

            </div>
            <div class="filter-tab__name">Альбомы
            </div>
        </div>
        <div v-if="!albumDetail" class="filter-tab__items">
            <div class="media-element media-element--photo media-element--add" v-if="$store.state.desktop" @click.prevent="albumCreation = true;">
                <div class="media-element__icon-holder">
                    <div class="media-element__icon"></div>
                    <div class="media-element__icon-text">Добавить альбом</div>
                </div>
            </div>
                <div v-for="album in userAlbums" :key="album.id" class="media-element media-element--photo">
                    <div class="media-element__pic" v-if="album.cover" :style="{'background-image': 'url(' + album.cover.link  + ')'}"></div>
                    <div class="media-element__edit settings settings--event" @click="openAlbumEditing(album.id, album.cover.link, album.title, album.cover.id)">
                        <span class="settings__dot"></span><span class="settings__dot"></span>
                        <span class="settings__dot"></span>
                    </div>
                    <div class="media-element__layer" @click="openAlbum(album.id, album.photos, album.title);"></div>
                    <div class="media-element__icon-holder" @click="openAlbum(album.id, album.photos, album.title);">
                        <div class="media-element__icon"></div>
                        <div class="media-element__icon-text" v-text="album.title"></div>
                    </div>
                </div>
            </div>
        <div  class="filter-tab__button-holder" v-if="!$store.state.desktop && !albumDetail">
            <button class="button button--violet" @click.prevent="albumCreation = true;">
            Добавить альбом
            </button>
        </div>
    </div>
</template>

<script>

    // import vue2Dropzone from 'vue2-dropzone';
    import axios from 'axios';
    import AlbumCreation from '~/components/Cabinet/Vendor/Albums/AlbumCreation';
    import AlbumEditing from '~/components/Cabinet/Vendor/Albums/AlbumEditing';
    import AlbumDetail from '~/components/Cabinet/Vendor/Albums/AlbumDetail';
    //    import { Carousel, Slide } from 'vue-carousel';
    export default {
        name: 'VendorGallery',
        components: {
            // 'drop-zone': vue2Dropzone,
            'album-creation': AlbumCreation,
            'album-editing': AlbumEditing,
            'album-detail': AlbumDetail
        },
        props: {
            userAlbums: {
                default: [],
                type: Array
            },
        },
        data() {
            return {
                // dropzoneOptions: {
                //     url: `/api/photos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                //     maxFilesize: 15,
                //     maxFiles: 10
                // },
                // swiperOption: {
                //     on: {
                //         slideChange: () => {
                //             this.activeIndex = this.mySwiper.realIndex;
                //             this.activePhoto = this.mySwiper.slides[this.mySwiper.realIndex].dataset.id;
                //             console.log(this.mySwiper)
                //             console.log('attach');
                //
                //         }
                //     }
                // },
                activeIndex: 0,
                activePhoto: 0,
                openedAlbum: {
                    title: '',
                    id: '',
                    photos: []
                },
                albumDetail: false,
                albumCreation: false,
                albumEditing: false,
                albumEditingData: {
                    id: null,
                    photo: '',
                    cover_id: null,
                    title: ''
                },
                showDetail: false,

            }
        },
        methods: {
            disableOverlay() {
                this.albumCreation = false;
                this.albumEditing = false;
                this.albumDetail = false;
            },
            showGallery() {
                this.$emit('showGallery', {
                    showGallery: false
                });
            },
            // showDetailEvent(index, activePhoto) {
            //     this.activeIndex = index;
            //     this.activePhoto = activePhoto;
            //     // this.mySwiper.slideTo(this.activeIndex)
            // },
            // removePhotoEvent() {
            //     let activePhoto = this.galleryItems[+this.activeIndex].id;
            //     this.galleryItems.splice(+this.activeIndex, 1);
            //     axios({
            //         method: 'delete',
            //         url: `/api/photos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
            //         data: {id: activePhoto}
            //     }).then((response) => {
            //         console.log(response);
            //     });
            //     if (this.galleryItems.length === 0) {
            //         this.showDetail = false;
            //     }
            // },
            // fileAddedEvent(file, xhr) {
            //     console.log(file);
            //     console.log('xhr', xhr);
            //     this.galleryItems.unshift({link: xhr.link, id: xhr.id});
            // },
            // // album editing
            // editPostPic(file) {
            //     this.$refs.dropEditPost.removeAllFiles();
            //     this.$refs.dropEditPost.addFile(file);
            //     // this.postEditing.photo = dataUrl;
            // },
            // getPostEditingSuccess(file, xhr) {
            //     // this.postEditing.thumb = xhr;
            //     // this.postEditing.photo = xhr;
            // },
            openAlbumEditing(id, photo, title, cover_id) {

                this.albumEditingData = {
                    id: id,
                    photo: photo,
                    title: title,
                    cover_id: cover_id
                }
                this.albumEditing = true;
            },
            // album creation
            handleCloseCreation(data) {
                this.albumCreation = data;
            },
            handleCloseEditing(data) {
                this.albumEditing = data;
            },
            handleAlbumsChanging(data) {
                this.$emit('albumsChanged', data);
            },
            // album detail
            openAlbum(id, photos, title) {
                // this.$axios({
                //     method: 'get',
                //     url: `/api/albums/${id}`,
                // }).then((response) => {
                //     console.log(response);
                // });
                this.openedAlbum.id = id;
                this.openedAlbum.photos = photos;
                this.openedAlbum.title = title;
                this.albumDetail = true;
            },
            handleCloseDetail(data) {
                this.albumDetail = data;
            }
        },
        created() {

        },
        mounted() {
            console.log(this);
        },
    }
</script>
