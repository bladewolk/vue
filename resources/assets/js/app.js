import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage'
import VueRouter from 'vue-router'
import {router} from './routes/index'
import store from './store/index'

import layoutComponent from './components/layoutComponent'
import {mapState} from 'vuex'

Vue.use(VueLocalStorage)
Vue.use(VueRouter)

Vue.component('app-layout', layoutComponent);


const vm = new Vue({
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
        store.commit('getToken', Vue.localStorage.get('token'));
        if (!store.state.auth.access_token)
            router.push('login')
    },

    watch: {
        '$route'(to, from) {
            if (!store.state.auth.access_token)
                router.push('login')

            if (store.state.auth.access_token && to.path === '/login')
                router.push('/')

        },
    }
}).$mount('#app');

global.vm = vm;

