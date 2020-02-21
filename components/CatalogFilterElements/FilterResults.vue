<template>
    <div class="filter-results">
    <ul class="filter-results__list" v-if="vendorResults.length > 0">

        <!-- /* -->
        <li class="filter-results__item" v-for="item in vendorResults" :key="item.id" :to="'/catalog/vendor/' + item.id + '/'">
            <nuxt-link  class="vendor-card vendor-card--filter vendor-card--filter-hot">
                <span class="vendor-card__image" :style="{'background-image': 'url(' + item.profilePic +')'}"></span>
                <span class="vendor-card__descr">
                        <span class="vendor-card__role">{{item.speciality.title}}</span>
                        <span class="vendor-card__name">{{item.firstName}} {{item.lastName}}</span>
                        <span class="vendor-card__prices">
                            <span class="vendor-card__price"><span class="vendor-card__price-sum">50 000 руб.</span>
                                <span class="vendor-card__price-delimiter">/</span>
                                <span class="vendor-card__price-for">вечер</span>
                            </span>
                            <span class="vendor-card__price vendor-card__price--old">60 000 руб.</span>
                        </span>
                        <span class="vendor-card__hot-date hot-date">
                            <span class="hot-date__date">Пн — 5 февраля/18</span>
                            <span class="hot-date__descr">горящая дата</span>
                        </span>
                    </span>
            </nuxt-link>
        </li>
        <!--*/-->
    </ul>
        <!--<div class="filter-results__empty" v-else>-->
            <!--Элементы не найдены-->
        <!--</div>-->
    <!--<button class="filter-results__show-more button button&#45;&#45;aqua">Загрузить еще <span>10</span> из <span>42</span></button>-->
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "FilterResults",
        data() {
            return {
            }
        },
        props: {
            vendorResults: {
                default: function () {
                    return []
                },
                type: Array
            }
        }
    }

</script>