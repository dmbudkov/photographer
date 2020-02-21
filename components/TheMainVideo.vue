<template>

    <!--<div class="video">-->
        <!--<div class="video__layer" v-if="!videoPlayed">-->
           <!--<div ref="playButton"  class="video__play-button" @click="playVideo">-->
           <!--</div>-->
        <!--</div>-->
        <!--<video ref="video" class="video__player" muted>-->
            <!--<source src="/video/nachinka.mp4" type="video/mp4">-->
        <!--</video>-->

    <!--</div>-->
    <div class="media-element media-element--video media-element--main">
        <div class="media-element__player" ref="videoHolder">
            <video class="media-element__video" muted ref="video" poster="/nachinka-preview-new.jpg">
                <source src="/video/nachinka.mp4" type="video/mp4">
            </video>
        </div>
        <!--<iframe class="media-element__frame"  src="https://www.youtube.com/embed/4S6Gcbhr3N0"  frameborder="0" ></iframe>-->
        <!--<div class="media-element__pic" style="background-image: url('https://img.youtube.com/vi/tojdbwStCVM/hqdefault.jpg');"></div>-->
        <div class="media-element__layer"></div>
        <div class="media-element__icon-holder" @click="playVideo();">
            <div class="media-element__icon"></div>
            <div class="media-element__icon-text">Смотреть видео</div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'mainVideo',
        data() {
            return {
               videoPlayed: false
            }
        },
        methods: {
            playVideo: function () {
                const videoHolder = this.$refs.videoHolder;
                const video = this.$refs.video;
                videoHolder.classList.add('media-element__player--play');
                video.play();
                // video.muted = false;
                video.controls = true;
            }
        },
        mounted() {
            const video = this.$refs.video;
            video.addEventListener('pause', (e) => {
                this.$refs.videoHolder.classList.remove('media-element__player--play');
                e.target.removeAttribute('controls');
            })
        }
    }

</script>