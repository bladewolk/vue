const state = {
    access_token: null
};

const mutations = {

    getToken(state, token) {
        if (token)
            state.access_token = token
    },

    login(state, token) {
        state.access_token = token
    },

    logout(state) {
        state.access_token = null
    }

};

export default {
    state,
    mutations
}