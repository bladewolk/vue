<template>
    <transition name="fade">
        <div class="modal is-active" @click="closeModal">
            <div class="modal-background"></div>
            <div class="modal-content">

                <div class="box">
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    {{ message }}
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
    import {mapMutations, mapState} from 'vuex'

    export default {
        computed: mapState({
            message: state => state.server.message
        }),
        methods: {
            ...mapMutations([
                'closeModal'
            ])
        },
    }
</script>