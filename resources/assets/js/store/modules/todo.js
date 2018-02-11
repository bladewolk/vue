const state = {
    todos: [],
    pagination: {
        current_page: null,
        last_page: null
    }
};

const mutations = {
    updatePagination(state, payload) {
        state.pagination = {
            current_page: payload.current_page,
            last_page: payload.last_page
        }
    },

    loadTodo(state, todos) {
        state.todos = todos
    },

    addTodo(state, todo) {
        state.todos.unshift(todo)
    },

    removeTodo(state, id) {
        state.todos = state.todos.filter((el) => {
            return el.id !== id
        })
    }
};

const actions = {
    storeTodo({commit, getters, dispatch}, payload) {
        return new Promise((resolve, reject) => {
                axios.post('api/todo',
                    payload,
                    {
                        headers: {'Authorization': getters.getAccessToken}
                    }
                )
                    .then(response => {
                        commit('addTodo', response.data);
                        resolve(response);
                    })
                    .catch(e => {
                        reject(e.response);
                        dispatch('handleError', e.response)
                    })
            }
        )
    },

    getTodos({commit, getters, dispatch}, page = 1) {
        console.log(page);
        return new Promise((resolve, reject) => {
            axios.get('api/todo?page=' + page, {
                headers: {
                    'Authorization': getters.getAccessToken
                }
            })
                .then(response => {
                    resolve(response);
                    commit('loadTodo', response.data.data);
                    commit('updatePagination', response.data)
                })
                .catch(e => {
                    reject();
                    dispatch('handleError', e.response)
                })
        })
    }
    ,

    removeTodo({commit, getters, dispatch}, id) {
        return new Promise((resolve, reject) => {
            axios.delete('api/todo/' + id, {
                headers: {
                    'Authorization': getters.getAccessToken
                }
            })
                .then(res => {
                    resolve();
                    commit('removeTodo', id)
                })
                .catch(e => {
                    reject();
                    dispatch('handleError', e.response)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}