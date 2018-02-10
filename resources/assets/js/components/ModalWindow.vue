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
                                    Server Error. CODE:500
                                </p>
                            </div>
                        </div>
                    </article>
                </div>

            </div>
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