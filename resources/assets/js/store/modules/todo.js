const state = {
    todos: []
};

const mutations = {
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
    storeTodo({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/todo', payload)
                .then(response => {
                    commit('addTodo', response.data);
                    resolve(response);
                })
                .catch(e => {
                    reject(e.response);
                    if (e.response.status === 500)
                        commit('toggleServerError')
                })
        })
    },

    getTodos({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('api/todo')
                .then(response => {
                    resolve(response);
                    commit('loadTodo', response.data)
                })
                .catch(e => {
                    reject();
                    commit('toggleServerError');
                    if (e.response.status === 401)
                        commit('logout')
                })
        })
    },

    removeTodo({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.delete('api/todo/' + id)
                .then(res => {
                    resolve();
                    commit('removeTodo', id)
                })
                .catch(e => {
                    reject()
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}