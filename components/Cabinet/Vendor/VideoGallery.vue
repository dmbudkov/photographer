<template>
    <div class="filter-tab filter-tab--centered" :class="{'filter-tab--desktop': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__back back back--black" @click="showVideoGallery"></div>
            <div class="filter-tab__closer" v-show="$store.state.desktop" @click="showVideoGallery"></div>
            <div class="filter-tab__name">Видео ролики</div>
        </div>
        <div class="filter-tab__items">
            <div class="vendor-videos vendor-videos--cabinet">
                <div  class="vendor-videos__item video video--add" @click="addNewVideo = true;" v-show="$store.state.desktop">
                    <div class="video__frame-holder">
                    </div>
                    <div class="video__play-button" ></div>
                    <div class="video__description">Добавить видео</div>
                </div>
            <div v-for="(videoItem, index) in galleryItems.slice().reverse()" class="vendor-videos__item video" :style="{ 'background-image': 'url(' + videoItem.preview + ')' }" :key="videoItem.id">
                <div class="video__frame-holder">
                <iframe class="video__frame" :src="videoItem.link" :ref="'frame' + index" frameborder="0"></iframe>
                </div>
                    <div class="video__play-button" @click="playVideo(index);"></div>
                <div class="video__settings settings" @click="showEditVideoEvent(index)">
                    <span class="settings__dot"></span><span class="settings__dot"></span><span
                        class="settings__dot"></span>
                </div>
            </div>
            </div>
        </div>
        <div class="filter-tab__button-holder" v-if="!$store.state.desktop">
           <div class="button button--violet" @click="addNewVideo = true;">Добавить видео ролик</div>
            <!--<button class="button button&#45;&#45;violet">-->
            <!--Добавить фото-->
            <!--</button>-->
        </div>
        <!--add new video-->
        <div class="popup-overlay" v-if="addNewVideo || showEditVideo"  @click="addNewVideo = false; showEditVideo = false;"></div>
        <div class="filter-tab filter-tab--centered filter-tab--popup" v-if="addNewVideo">
            <div class="filter-tab__top">
                <div class="filter-tab__closer" @click="closeAddWindow"></div>
                <div class="filter-tab__name">Новый ролик</div>
            </div>
            <div class="filter-tab__items form">
                <textarea name="" id="" rows="5" class="textarea textarea--blue" v-model="newVideoUrl" placeholder="Вставте сюда ссылку на ваш видео ролик
из сервиса Vimeo или Youtube…"></textarea>
            </div>
            <div class="filter-tab__button-holder">
                <div class="button button--violet" @click="addNewVideoEvent">Добавить </div>
                <!--<button class="button button&#45;&#45;violet">-->
                <!--Добавить фото-->
                <!--</button>-->
            </div>
        </div>

        <div class="filter-tab filter-tab--centered filter-tab--popup" v-if="showEditVideo">
            <div class="filter-tab__top">
                <div class="filter-tab__closer" @click="showEditVideo = false;"></div>
                <div class="filter-tab__name">Редактирование</div>
            </div>
            <div class="filter-tab__items form form--profile">
                <textarea name="" id="" rows="5" class="textarea textarea--blue" v-model="currentEditVideo.link" placeholder="Вставте сюда ссылку на ваш видео ролик
из сервиса Vimeo или Youtube…"></textarea>
                <div class="vendor-videos__item video" :style="{ 'background-image': 'url(' + currentEditVideo.preview + ')' }">
                    <iframe class="video__frame" :src="currentEditVideo.link" frameborder="0"></iframe>
                    <div class="video__play-button"></div>

                </div>
            </div>
            <div class="filter-tab__button-holder filter-tab__button-holder--multiple">
                <div class="button button--violet" @click="editVideoEvent">Сохранить</div>
                <div class="button button--gray" @click="removeVideoEvent">Удалить</div>
                <!--<button class="button button&#45;&#45;violet">-->
                <!--Добавить фото-->
                <!--</button>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VendorVideoGallery',
        components: {
        },
        props: {
//            showGallery: {
//                default: false,
//                type: Boolean
//            }
        },
        data() {
            return {
                galleryItems: [
                ],
                newVideoUrl: '',
                addNewVideo: false,
                editVideoIndex: '',
                showEditVideo: false,
                currentEditVideo: {
                    link: '',
                    preview: '',
                    id: ''
                }
            }
        },
        props: {
            videoGalleryItems: {
                default: function () {
                    return []
                },
                type: Array
            },
        },

        methods: {
            addNewVideoEvent() {

                const videoSource = this.newVideoUrl.match(/^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/);
                if (videoSource !== null && (videoSource[2] === "www.youtube.com" || videoSource[2] === "youtu.be" || videoSource[2] === "vimeo.com")) {
                    this.closeAddWindow();
                    this.$axios({
                        method: 'post',
                        url: `/api/videos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        data: {
                            link: videoSource[0]
                        }

                    }).then((response) => {
                        this.galleryItems.push(response.data);
                        this.$emit('resetVideoItems',  this.galleryItems);
//
                    });
                }
            },
            showEditVideoEvent(index) {

                    this.showEditVideo = true;
                    this.editVideoIndex = index;
                    this.currentEditVideo.link = this.galleryItems[index].link;
                    this.currentEditVideo.preview = this.galleryItems[index].preview;
                    this.currentEditVideo.id = this.galleryItems[index].id;

            },
            editVideoEvent() {
                this.galleryItems[this.editVideoIndex].link = this.currentEditVideo.link;
                this.galleryItems[this.editVideoIndex].preview = this.currentEditVideo.preview;
                this.$axios({
                    method: 'patch',
                    url: `/api/videos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: [{
                        id: this.galleryItems[this.editVideoIndex].id,
                        link: this.currentEditVideo.link
                          }]
                }).then((response) => {
                   this.currentEditVideo.preview = response.data.preview;
                    this.$axios({
                        method: 'get',
                        url: `/api/videos?${this.$auth.token}`,
                    }).then((response) => {
                        this.galleryItems = response.data;
                        this.$emit('resetVideoItems', response.data);
                    });
                });
            },
            removeVideoEvent() {
                this.$axios({
                    method: 'delete',
                    url: `/api/videos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        id: this.galleryItems[this.editVideoIndex].id,
                    }
                }).then((response) => {
                    this.$axios({
                        method: 'get',
                        url: `/api/videos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    }).then((response) => {
                        this.galleryItems = response.data;
                        this.$emit('resetVideoItems', response.data);
                    });
                    this.showEditVideo = false;
                });

            },
            closeAddWindow() {
                this.addNewVideo = false;
                this.newVideoUrl = '';
            },
            playVideo(index) {
//                this.$refs[`frame${index}`][0].src;
                const url = new URL(this.$refs[`frame${index}`][0].src);
                const autoplay = url.searchParams.get("autoplay");
                if(!autoplay) {
                    this.$refs[`frame${index}`][0].src += "&autoplay=1";
                }
            },
            showVideoGallery() {
                this.$emit('showVideoGallery', {
                    showVideoGallery: false
                });
            },
        },
        created() {
            this.galleryItems = this.videoGalleryItems;

        },
        mounted() {

        }
    }
</script>