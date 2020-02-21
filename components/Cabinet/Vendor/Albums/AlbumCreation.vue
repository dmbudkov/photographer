<template>
    <div class="filter-tab filter-tab--centered filter-tab--less-paddings filter-tab--popup">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closeAlbumCreating"></div>
            <div class="filter-tab__name">Новый альбом</div>
        </div>
        <div class="filter-tab__items">
            <div class="drop-form drop-form--scrollable">
                <input type="text" v-model="albumData.name" placeholder="Название альбома" class="drop-form__input input"/>
                <div class="drop-photo">
                    <drop-zone class="drop-photo__pic" ref="albumCreation" :include-styling="false" :options="dropZoneOptions" v-on:vdropzone-max-files-exceeded="editAlbumPic" v-on:vdropzone-success="loadSuccess"  id="dropEditPost" :style="{'background-image': 'url('  + albumData.photo +  ')'}">
                    </drop-zone>
                    <div class="drop-photo__placeholder">
                                       <span class="drop-photo__placeholder-pic">
                              <svg width="42px" height="33px" viewBox="0 0 42 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="lk_vender" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.5">
        <g id="lk_add_event" transform="translate(-166.000000, -141.000000)" fill-rule="nonzero" fill="#889FBC">
            <g id="main" transform="translate(30.000000, 101.000000)">
                <g id="field">
                    <g id="photo-of-a-landscape" transform="translate(136.500000, 39.787234)">
                        <path d="M38.7694677,0.757936077 L2.85110189,0.757936077 C1.40848415,0.757936077 0.238808213,1.92753731 0.238808213,3.37015506 L0.238808213,30.1457918 C0.238808213,31.5883348 1.40848415,32.7579361 2.85110189,32.7579361 L38.7694677,32.7579361 C40.2121602,32.7579361 41.3818361,31.5883348 41.3818361,30.1457171 L41.3818361,3.37015506 C41.3818361,1.92753731 40.2122349,0.757936077 38.7694677,0.757936077 Z M38.7694677,3.37015506 L38.7694677,22.3683693 L33.6213698,17.6878729 C32.8475865,16.9845286 31.6576677,17.0126145 30.9183943,17.7525602 L25.7081487,22.9619842 L15.4349595,10.6909565 C14.6584124,9.76359669 13.2360374,9.75448369 12.4478376,10.6707137 L2.85110189,21.8237556 L2.85110189,3.37015506 L38.7694677,3.37015506 Z M27.6675184,10.2273139 C27.6675184,8.24329435 29.2752159,6.63544746 31.2592354,6.63544746 C33.2433297,6.63544746 34.8511019,8.24329435 34.8511019,10.2273139 C34.8511019,12.2113335 33.2434044,13.8191057 31.2592354,13.8191057 C29.2752906,13.8191804 27.6675184,12.2113335 27.6675184,10.2273139 Z" id="Shape"></path>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg></span>
                        <span class="drop-photo__placeholder-text">Загрузить обложку</span>
                    </div>

                </div>
                <div class="drop-form__button-holder">
                    <button class="button button--violet" @click.prevent="createAlbum">Добавить</button>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
    // import vue2Dropzone from 'vue2-dropzone';
    export default {
        name: 'AlbumCreation',
        components: {
          // 'drop-zone': vue2Dropzone
        },
        data() {
            return {
                albumData: {
                    photo: '',
                    name: '',
                    photoId: ''
                },
                dropZoneOptions: {
                    url: `/api/media?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    maxThumbnailFilesize: 15,
                    maxFiles: 1,
                    maxFilesize: 15
                },
            }
        },
        methods: {
            closeAlbumCreating() {
                this.$emit('closeCreation', false);
            },
            loadSuccess(file, xhr) {
                this.albumData.photo = xhr.link;
                this.albumData.photoId = xhr.id;
                console.log('loadSuccess', xhr);
            },
            editAlbumPic(file) {
                this.$refs.albumCreation.removeAllFiles();
                this.$refs.albumCreation.addFile(file);
            },
            createAlbum() {

                this.$axios({
                    method: 'post',
                    url: `/api/albums`,
                    data: {
                        user_id: this.$store.state.auth.user.id,
                        cover_id: this.albumData.photoId,
                        title: this.albumData.name
                    }
                }).then((resp) => {
                    this.$axios({
                        method: 'get',
                        url: `/api/vendor/${this.$store.state.auth.user.id}/albums/`,
                    }).then((response) => {
                        this.$emit('albumsChanged', response.data);
                        this.closeAlbumCreating();
                    });
                })
            }

        }
    }


</script>