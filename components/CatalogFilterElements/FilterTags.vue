<template>
    <div class="select-tags select-tags--filter" v-if="selectedTags.length > 0">

        <div class="select-tags__item select-tag select-tag--with-closer" :ref="'tag'+tag.code" :data-group="tag.group" :data-code="tag.code" v-for="tag in selectedTags" :key="tag.code">
            <div class="select-tag__label">{{tag.title}}</div>
            <div class="select-tag__item-close" @click="deleteTag(tag.group, tag.code);"></div>
        </div>

    </div>

</template>

<script>

    export default {
        name: "FIlterTags",
        data() {
            return {

            }
        },
        props: {
            paramsFromFilter: {
                default: function () {
                    return []
                },
                type: Array
            },
            specialityId: {
                default: 1,
                type: Number
            },
            filterSort: {
                type: String
            },
            filterDate: {
                default: function () {
                    return {}
                },
                type: Object
            },
            checkedCity: {
            }

        },
        computed: {
            selectedTags: function () {
                let selectedTags = [];
                for (let tagGroup in this.paramsFromFilter) {

//                    if(this.paramsFromFilter[tagGroup].values.length > 0) {
                    for (let value in this.paramsFromFilter[tagGroup].values) {
                        selectedTags.push({
                            group: this.paramsFromFilter[tagGroup].code,
                            code: this.paramsFromFilter[tagGroup].values[value].code,
                            title: this.paramsFromFilter[tagGroup].values[value].title
                        });
//                   }
                    }
//                    }

//                   for(let value in this.paramsFromFilter[tagGroup].values) {
//                       this.paramsFromFilter[tagGroup].values
//                   }
                }
                return selectedTags;
            }
        },
        methods: {
            deleteTag(group, tagCode) {
                let properties = [];
                for(let i = 0; i < this.paramsFromFilter.length; i++) {
//                    if(this.paramsFromFilter[i].code === group) {
                        let values = [];

                        for(let k = 0; k < this.paramsFromFilter[i].values.length; k++) {
                            if(this.paramsFromFilter[i].values[k].code !== tagCode) {
                                values.push(this.paramsFromFilter[i].values[k].code);
                            }
                        }
                        properties.push({code: this.paramsFromFilter[i].code, values: values});
//                    }
                }
                this.$emit('tagsChanged', {
                    props: properties
                })
//                this.$axios({
//                    method: 'post',
//                    url: `/api/catalog/props`,
//                    data: {
//                        "speciality": this.specialityId,
//                        "properties": properties
//                    }
//                }).then((response) => {
//                    console.log(response);
//                });
            }
        }

    }

</script>