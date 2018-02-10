const state = {
    access_token: localStorage.getItem('access_token', null)
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
        localStorage.clear();
        state.access_token = null
    },


};

const actions = {

    login({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/login', payload)
                .then(res => {
                    let token = 'Bearer ' + res.data.token;
                    localStorage.setItem('access_token', token);
                    commit('login', token);
                    resolve()
                })
                .catch(e => {
                    reject(e.response);
                })
        });
    },

    register({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/register', payload)
                .then(res => {
                    let token = 'Bearer ' + res.data.token;
                    localStorage.setItem('access_token', token);
                    commit('login', token);
                    resolve(res)
                })
                .catch(e => {
                    reject(e.response);
                })
        })
    }
};

export default {
    state,
    mutations,
    actions
}