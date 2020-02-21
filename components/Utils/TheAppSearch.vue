<template >
    <div class="menu__search search" :class="{'search--show': searchFieldVisible}">
        <i class="search__icon" @click="showSearchField">
        </i>
        <form action="" class="search__form">
            <input type="text" ref="search" placeholder="Поиск в каталоге" class="search__input input input--search" @keyup="handleSearchInput($event)"/>

        </form>
        <div class="search__close" :class="{'search__close--rotate': searchFieldVisible}" @click="showSearchField">
            <span class="search__close-bar"></span>
        </div>
    </div>
</template>

<script>
    // import { debounce } from "debounce";
    export default {

        name: 'AppSearch',
        data() {
            return {
                searchFieldVisible: false,
                hideBurger: false
            }
        },

        methods: {
            handleSearchInput(event) {
                this.$emit('searchResults', event.target.value);
            },
            showSearchField: function (event)  {
                this.searchFieldVisible = !this.searchFieldVisible;
                this.hideBurger = !this.hideBurger;
                this.$emit('showSearchField', {"hideBurger": this.hideBurger, searchFieldVisible: this.searchFieldVisible});
                // this.$refs.search.$el.focus();
                setTimeout(() => {
                this.$nextTick(() => {this.$refs.search.focus() });
                }, 400);

            }
        }
    }
</script>

<style>

</style>
