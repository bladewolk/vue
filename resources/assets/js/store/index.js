import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import todo from './modules/todo'

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        auth,
        todo
    },

    state: {
        serverError: false,
        globalFetch: false,
    },

    mutations: {
        toggleGlobalFetch(state) {
            state.globalFetch = !state.globalFetch
        },

        toggleServerError(state, error = '') {
            state.serverError = !state.serverError
        },

        closeModal(state) {
            state.serverError = false
        },
    }
});

