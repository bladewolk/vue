import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import todo from './modules/todo'
import settings from './modules/setting'
// import VueLocalStorage from "vue-localstorage";
import VueLocalStorage from 'vue-ls';


Vue.use(VueLocalStorage);
Vue.use(Vuex);


export default new Vuex.Store({

    modules: {
        auth,
        todo,
        settings
    },

    state: {
        server: {
            error: null,
            message: null
        },
        serverError: false,
        globalFetch: false,
    },

    getters: {
        getAccessToken: state => {
            return state.auth.access_token
        }
    },

    mutations: {
        toggleGlobalFetch(state) {
            state.globalFetch = !state.globalFetch
        },

        toggleServerError(state, error = '') {
            state.server.error = !state.server.error;
            state.server.message = error
        },

        closeModal(state) {
            state.server.error = false
        },
    },

    actions: {
        //Handle axios response error
        handleError({commit}, response) {
            if (response.status === 401) {
                commit('toggleServerError', 'Unauthorized!');
                commit('logout')
            }
            if (response.status === 500)
                commit('toggleServerError', 'Server error')
        }
    }

});

