export default {
    localStorage: {},
    state: {
        serverError: false,
        globalFetch: false,
        access_token: null,
        todos: []
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

        getToken(state, token) {
            if (token)
                state.access_token = token
        },

        login(state, token) {
            state.access_token = token
        },

        logout(state) {
            state.access_token = null
        },

        loadTodo(state, todos) {
            state.todos = todos
        },

        addTodo(state, todo) {
            state.todos.unshift(todo)
        },

        removeTodo(state, id) {
            state.todos = state.todos.filter((el) => {
                return el.id != id
            })
        }

    },
    actions: {

        storeTodo(state, payload) {
            return new Promise((resolve, reject) => {
                axios.post('api/todo', payload)
                    .then(response => {
                        this.commit('addTodo', response.data)
                        resolve(response);
                    })
                    .catch(e => {
                        reject(e.response)
                        if (e.response.status == 422)
                            this.commit('toggleServerError')
                    })
            })
        },

        getTodos() {
            return new Promise((resolve, reject) => {
                axios.get('api/todo')
                    .then(response => {
                        resolve()
                        this.commit('loadTodo', response.data)
                    })
                    .catch(e => {
                        this.commit('toggleServerError')
                        if (e.response.status == 401)
                            this.commit('logout')
                    })
            })
        },

        removeTodo(state, id) {
            axios.delete('api/todo/' + id)
                .then(res => {
                    this.commit('removeTodo', id)
                })
                .catch(e => {

                })
        }

    }
}