import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueLocalStorage from 'vue-localstorage'

import LoginPage from './pages/LoginPage'
import layoutComponent from './components/layoutComponent'

Vue.use(VueLocalStorage)

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('app-layout', layoutComponent)

const Foo = {template: '<div>foo</div>'}
// 2. Определение путей
// Каждый путь должен указывать на компонент
// "Компонентом" может быть как созданный через `Vue.extend()`
// полноценный конструктор, так и просто объект с настройками компонента
// Вложенные пути будут рассмотрены далее.
const routes = [
    {path: '/', component: Foo},
    {path: '/login', component: LoginPage},
    {path: '*', redirect: '/'}
]

// 3. Создаём экземпляр роутера с опцией `routes`
// Можно передать и другие опции, но пока не будем усложнять
const router = new VueRouter({
    routes, // сокращение от `routes: routes`
})

export const store = new Vuex.Store({
    localStorage: {},
    state: {
        auth: {
            authenticated: false,
            token: Vue.localStorage.get('token')
        }
    },
    mutations: {
        login(state, data) {
            state.auth = data
        },
        checkSuccess(state) {
            state.auth.authenticated = true
        },
        logout(state) {
            state.auth = {
                token: '',
                authenticated: false
            }
        }
    }
})

const vm = new Vue({
    router,
    store,

    computed: {
        auth: function () {
            return this.$store.state.auth
        }
    },

    methods: {

        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        },

        checkAuth: function () {
            if (this.auth.token == '')
                return this.$router.push('login')

            return axios.post('api/checkAuth', {
                token: this.auth.token
            })
                .then(response => {
                    this.$store.commit('checkSuccess')
                    this.$router.push('/')
                })
                .catch(e => this.$router.push('login'))
        },
    },

    beforeMount: function () {
        this.checkAuth()
        // if (this.auth.token == '' || this.auth.authenticated == false)
        //     this.$router.push('login')
    },

    watch: {
        '$route'(to, from) {
            if (this.auth.authenticated == false)
                this.$router.push('login')
            // обработка изменений параметров пути...
        },
    }
}).$mount('#app');
