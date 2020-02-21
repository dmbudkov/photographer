<template>
    <div class="filter-tab filter-tab--descr filter-tab--centered" :class="{'filter-tab--desktop': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__back back back--black" @click="showDescription"></div>
            <div class="filter-tab__name">Текстовое описание</div>
        </div>
        <div class="filter-tab__items">
            <div class="form form--reg form--text">

                <div class="form__group form__group--editable">
                    <div v-if="$auth.loggedIn" class="form__editable" contenteditable="true" @input="getContent" v-html="this.$store.state.auth.user.description">

                    </div>
                    <span class="form__editable-placeholder" v-if="userDescription.length < 1">
                            Введите описание
                        </span>
                </div>

                <div class="form__group form__group--white">
                    <button class="form__button button button--violet button--filter" v-if="showButton" @click.prevent="saveDescription">
                      Сохранить</button>
                </div>

            </div>
            <!--<div class="filter-tab__section">-->
            <!--<div class="filter-tab__section -name">Город</div>-->
            <!--<multi-select :searchable="true" class="multiselect&#45;&#45;searchable"-->
            <!--:show-labels="false" v-model="citySelected" track-by="name" label="name" value="Город" placeholder="Выберите город" :options="cityList"></multi-select>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               userDescription: '',
                showPreloader: false,
                showButton: false
            }
        },
        watch: {
            userDescription: {
                handler: function(newVal, oldVal) {

                    if(oldVal.length > 0 && (newVal !== oldVal)) {
                        this.showButton = true;
                    } else if(oldVal.length === 0 && (newVal !== oldVal)) {
                        this.showButton = true;
                    }
                }

            }
        },
        methods: {
            showDescription() {
                this.$emit('showDescription', {
                    showDescription: false
                });
            },
            getContent(e) {
                this.userDescription = e.target.innerText.trim();
            },
            saveDescription() {
                this.$axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {description: this.userDescription}
                }).then((response) => {
                    this.$auth.fetchUser();
                    this.$emit('description', {description: this.userDescription, progress: response.data.progress});
                    this.showButton = false;
                    this.$store.commit({
                        type: 'setUserDescription',
                        description: this.userDescription
                    });
                    this.showDescription();
                }).then(() => {
                    this.$store.dispatch('setProgress');
                });
            }
        },
        created() {
            if(this.$auth.loggedIn) {
                this.userDescription = this.$auth.$state.user.description;
            }
        },
        mounted() {

        }
    }

</script>