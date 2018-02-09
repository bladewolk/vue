<template>
    <div class="row">
        <header>
            <nav class="navbar" role="navigation" aria-label="main navigation" v-if="auth">
                <div class="navbar-brand">
                    <router-link class="navbar-item" to="/">
                        <img src="data:image/png;base64,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"
                             alt="VUE" width="112" height="28">
                    </router-link>
                    <div class="navbar-menu">
                        <div class="navbar-start">
                            <a href="#" class="navbar-item" @click="logout">Logout</a>
                            <router-link class="navbar-item" to="/">Home</router-link>
                            <router-link class="navbar-item" to="/todos">Todos</router-link>
                        </div>
                        <!-- navbar start, navbar end -->
                    </div>
                    <button class="button navbar-burger">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </button>
                </div>
            </nav>

        </header>

        <modal v-if="serverError"></modal>

        <main>
            <slot name="router-outlet"></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        computed: mapState({
            auth: state => state.access_token ? true : false,
            globalFetch: state => state.globalFetch,
            serverError: state => state.serverError
        }),

        components: {
            'modal': require('./ModalWindow')
        },

        methods: {
            logout: function () {
                this.$localStorage.remove('token')
                this.$store.commit('logout')
                this.$router.push('login')
            }
        },
        watch: {
            auth: function (val) {
                if (val == false)
                    this.$router.push('login')
            }
        }

    }

</script>