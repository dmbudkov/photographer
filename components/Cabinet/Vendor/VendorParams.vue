<template>
    <div class="filter-tab filter-tab--centered filter-tab--params" :class="{'filter-tab--desktop': $store.state.desktop}">
        <div class="filter-tab__top">
            <div class="filter-tab__closer" @click="closePopup"></div>
            <div class="filter-tab__name">Параметры</div>
        </div>
        <div class="filter-tab__items">
            <div class="filter-tab__section" v-for="(vendorGroup, groupIndex, groupArrayIndex) in vendorParams" :key="groupIndex">
                <div class="filter-tab__section-name" v-text="vendorGroup.title"></div>

                <div v-if="vendorGroup.type === 'tag'" class="select-tags">
                    <div class="select-tags__item select-tag" :key="index" v-for="(groupItem, index) in vendorGroup.values">
                        <input :id="'tag' + groupItem.code + groupItem.id" class="select-tag__input" v-model="paramsToSelect[groupIndex].values" :value="groupItem.id" type="checkbox"/><label class="select-tag__label" :for="'tag' + groupItem.code + groupItem.id"><span class="select-tag__type" v-text="groupItem.title"></span></label>
                    </div>

                </div>
                <div v-if="vendorGroup.type === 'checkbox' || vendorGroup.type === 'select'"  class="select-checkboxes">
                    <div class="select-checkboxes__item checkbox" :key="index" v-for="(groupItem, index) in vendorGroup.values">
                        <input :id="'check' + groupItem.code + groupItem.id" type="checkbox" v-model="paramsToSelect[groupIndex].values" :value="groupItem.id" class="checkbox__input"/>
                        <label :for="'check' + groupItem.code + groupItem.id" class="checkbox__label"><span class="checkbox__name" v-text="groupItem.title"></span></label>
                    </div>
                </div>
                <div v-if="vendorGroup.type === 'radio'"  class="select-checkboxes">
                    <div class="select-checkboxes__item checkbox" :key="index" v-for="(groupItem, index) in vendorGroup.values">
                        <input :id="'check' + groupItem.code + groupItem.id" type="radio" v-model="paramsToSelect[groupIndex].values" :value="[groupItem.id]" class="checkbox__input"/>
                        <label :for="'check' + groupItem.code + groupItem.id" class="checkbox__label"><span class="checkbox__name" v-text="groupItem.title"></span></label>
                    </div>
                </div>
                <!--<multiselect v-if="vendorGroup.type === 'select'" :searchable="true" class="multiselect&#45;&#45;searchable"-->
                <!--:show-labels="false" v-model="citySelected" track-by="name" label="name" value="Город" placeholder="Выберите город" :options="cityList"></multiselect>-->
            </div>
        </div>
        <transition name="fade">
        <div class="filter-tab__button-holder" ref="paramsButton" v-show="showSaveButton">
            <button class="button button--violet" @click.prevent="saveVendorParams">Сохранить</button>
        </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showSaveButton: false
            }
        },
        props: {
            vendorParams: {
                default: function () {
                    return []
                },
                type: Array
            },
            paramsToSelect: {
                default: function () {
                    return []
                },
                type: Array
            }
        },
        watch: {
            paramsToSelect: {
                handler: function (newValue) {
                    console.log('newVal', newValue);
                    this.showSaveButton = true;
                    const fixableElement = this.$refs.paramsButton;
                    fixableElement.style.position = 'fixed';
                },
                deep: true
            }
        },
        methods: {
            handleScroll() {
                let scrolledFromTop = window.pageYOffset;
                const windowHeight = document.documentElement.clientHeight;
                const paramsTabNode = document.querySelector('.filter-tab--params');
                const fixableElement = this.$refs.paramsButton;
                const paramsTaHeight = paramsTabNode.clientHeight;
                const paramsTaOffset = paramsTabNode.offsetTop;
                if(fixableElement) {
                    if (scrolledFromTop + windowHeight >= paramsTaHeight + paramsTaOffset + 140 + 225) {
                        fixableElement.style.position = 'absolute';
                    } else {
                        fixableElement.style.position = 'fixed';
                    }
                }
            },
            saveVendorParams() {
                this.$axios({
                    method: 'patch',
                    url: `/api/vendors/properties?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: this.paramsToSelect
                }).then((response) => {
                    this.$auth.fetchUser();
                    if(!this.$store.state.desktop) {
                        this.closePopup();
                    }
                    if(this.paramsToSelect.length > 0) {
                        this.$emit('paramsChecked', true);
                    }
                    this.showSaveButton = false;
                });
            },
            closePopup() {
                this.$emit('showVendorParams', false)
            }
        },
        mounted() {
            document.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            document.removeEventListener('scroll', this.handleScroll);
        }
    }

</script>