import Vue from 'vue';
import {router} from './routes/index'
import store from './store/index'
import layout from './components/layoutComponent'


const vm = new Vue({
    components: {
        'app-layout': layout
    },
    router,
    store,
    localStorage: {},

    methods: {

        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        },
    },

    beforeCreate: function () {
        let path = window.location.hash.slice(2);
        let token = store.state.auth.access_token;

        if (!token)
            router.push('login');

        if (token && path === 'login')
            router.push('/')
    },

    watch: {
        '$route'(to, from) {
            if (!store.state.auth.access_token)
                router.push('login');

            if (store.state.auth.access_token && to.path === '/login')
                router.push('/')

        },
    }
}).$mount('#app');

global.vm = vm;

