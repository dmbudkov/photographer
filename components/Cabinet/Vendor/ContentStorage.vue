<template>
    <div class="filter-tab filter-tab--centered filter-tab--storage" :class="{'filter-tab--popup': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__back back back--black" v-if="!$store.state.desktop" ></div>
            <div class="filter-tab__closer" v-if="$store.state.desktop" @click="showStorage"></div>
            <div class="filter-tab__name">Выберите видео или фото из портфолио</div>
        </div>
        <div class="filter-tab__items">

            <div class="filter-tab__group">
                <div class="media-holder media-holder--fs media-holder--storage">
                    <h4 class="media-holder__name">Видео</h4>
                    <div class="media-holder__items">
                        <div class="media-element media-element--video media-element--storage" v-for="(video, key) in videos" :key="key" @click="choseElement('video',video.id, video.preview)">
                            <div class="media-element__pic" :style="{'background-image': `url(${video.preview})`}"></div>
                            <div class="media-element__layer"></div>
                            <div class="media-element__icon-holder" >
                                <div class="media-element__icon"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter-tab__group">
                <div class="media-holder media-holder--storage">
                    <h4 class="media-holder__name">Фотографии</h4>
                    <div class="media-holder__items photo-gallery photo-gallery--storage">
                        <div class="photo-gallery__item"   v-for="(photo, key) in photos" :key="key" v-if="photo" :style="{'background-image': `url(${photo.media.link})`}" @click="choseElement('photo', photo.id, photo.media.link)">
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "ContentStorage",
        data() {
            return {

            }
        },
        props: {
            photos: {
                default: [],
                type: Array
            },
            videos: {
                default: [],
                type: Array
            },
            previewId: {
                default: 0,
                type: Number
            },
            previewItems: {
                default: function () {
                    return []
                },
                type: Array
            },
            previewVideos: {
                default: function () {
                    return []
                },
                type: Array,
            },
            previewPhotos: {
                default: function () {
                    return []
                },
                type: Array
            }


        },
        methods: {
            showStorage() {
                this.$emit('showStorage', false);
            },
            selectedItem(type, itemId, preview) {
              this.$emit('selectedItem', {
                  previewId: this.previewId,
                  type: type,
                  id: itemId,
                  previewPic: preview
              })
            },
            setItem(data, type, id) {
                let usedIndex = -1;
                let elType = '';
                for(let key in data) {

                    data[key].forEach((el, ind) => {
                        if(el.sort === this.previewId) {
                            usedIndex = ind;
                            elType = key;
                            return;
                        }
                    })
                }
                // data[type].forEach((el, ind) => {
                //     if(el.sort === this.previewId) {
                //         return usedIndex = ind;
                //     }
                // })
                if(usedIndex > -1) {
                    console.log('find usage in', elType)
                    if(type !== elType) {
                        console.log('diff types');
                        data[elType].splice(usedIndex, 1);
                        data[type][usedIndex] = {id: id, sort: this.previewId}
                    } else {
                        data[type][usedIndex] = {id: id, sort: this.previewId}
                    }
                } else {
                    data[type].push({id: id, sort: this.previewId});
                }
            },
            choseElement(type, id, preview) {
                const data = {
                    photos: this.previewPhotos,
                    videos: this.previewVideos
                };
                console.log('data', data);

                if (type === 'video') {
                    this.setItem(data, 'videos', id);
                } else if (type === 'photo') {
                    this.setItem(data, 'photos', id);
                }
                // {photos: [], videos: []}
                for(let key in data) {
                    // let type = data[key];
                    if(data[key].includes(undefined)) {
                        for (let i = 0; i < data[key].length; i++) {
                            if(typeof data[key][i] === "undefined" || data[key][i] === null) {
                                data[key].splice(i, 1);
                            }
                        }
                    }

                    }
                this.showStorage();
                this.selectedItem(type, id, preview);
                    // console.log('resdata', data);
                // this.$axios({
                //     method: 'post',
                //     url: `/api/vendors/media/preview?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                //     data: data
                // }).then((response) => {
                //
                //
                // })
            },


        },
        created() {


        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>