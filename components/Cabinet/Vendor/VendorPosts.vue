<template>

    <div class="event-holder">
        <div class="event event--in-tab" v-for="(post,index) in posts" :key="index">
            <div @click="openEditPost(index)" class="event__edit settings settings--event">
                <span class="settings__dot"></span><span class="settings__dot"></span>
                <span class="settings__dot"></span>
            </div>
            <span class="event__pic" :style="{'background-image': 'url(' + post.photo + ')'}"></span>
            <nuxt-link to="/" class="event__descr" v-text="post.text">
            </nuxt-link>
            <time class="event__date" v-text="post.date">
            </time>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'VendorPosts',
        props: {
          posts: {
              default: function () {
                  return {}
              },

              type: Array
          }
        },
        data() {
            return {

            }
        },
        methods: {
            openEditPost(index) {
                this.$emit('openEditPost', {
                    openEditPostPopup: true,
                    postIndex: index
                })
            },
            handleScroll() {
                let scrolledFromTop = window.pageYOffset;
                const windowHeight = document.documentElement.clientHeight;
                const paramsTabNode = document.querySelector('.tab-block__posts');
                const fixableElement = document.querySelector('.tab-block__item-button--posts');
                const paramsTaHeight = paramsTabNode.clientHeight;
                const paramsTaOffset = paramsTabNode.offsetTop;

                if(fixableElement) {
                    if (scrolledFromTop + windowHeight >= paramsTaHeight + paramsTaOffset + 140) {
                        fixableElement.removeAttribute('style');
                    } else {
                        fixableElement.style.position = 'fixed';
                    }
                }
            },
        },
        mounted() {
            document.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            document.removeEventListener('scroll', this.handleScroll);
        }
    }

</script>