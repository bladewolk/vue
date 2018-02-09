import Vue from 'vue';
import Vuex from 'vuex'
import VueLocalStorage from 'vue-localstorage'
import VueRouter from 'vue-router'
import {router} from './routes/index'
import vuexStore from './store/index'

import layoutComponent from './components/layoutComponent'
import {mapState} from 'vuex'

Vue.use(VueLocalStorage)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('app-layout', layoutComponent)
const store = new Vuex.Store(vuexStore)


var vm = new Vue({
    router,
    store,
    localStorage: {},

    computed: mapState({
        globalFetch: state => state.globalFetch,
    }),

    methods: {

        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        },
    },

    beforeCreate: function () {
        this.$store.commit('getToken', Vue.localStorage.get('token'))
        if (!this.$store.state.access_token)
            this.$router.push('login')
    },

    watch: {
        '$route'(to, from) {
            if (!this.$store.state.access_token)
                this.$router.push('login')

            if (this.$store.state.access_token && to.path == '/login')
                this.$router.push('/')

        },
    }
}).$mount('#app');

global.vm = vm;

