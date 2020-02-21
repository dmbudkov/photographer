<template>
    <div class="form__editable" contenteditable="true">
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            value:{ type: String, default: ""},
            max:{type: Number, default: 250}
        },
        computed: {
            internalValue: {
                get() {return this.value},
                set(v){ this.$emit("input", v)}
            }
        },
        methods: {
            onKeyDown(evt) {
                if (this.value.length >= this.max) {
                    if (evt.keyCode >= 48 && evt.keyCode <= 90) {
                        evt.preventDefault()
                        return
                    }
                }
            }
        }
    }
</script>