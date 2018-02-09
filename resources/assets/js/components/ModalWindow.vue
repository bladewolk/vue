<template>
    <transition name="fade">
        <div class="modal is-active" @click="close">
            <div class="modal-background"></div>
            <div class="modal-content">

                <div class="box">
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    Something whent wrong on server
                                    This place for message
                                </p>
                            </div>
                        </div>
                    </article>
                </div>

            </div>
            <button class="modal-close is-large" aria-label="close" @click="close"></button>
        </div>
    </transition>
</template>
<script>
    export default {
        methods: {
            close: function () {
                this.$store.commit('closeModal')
            }
        },
    }
</script>