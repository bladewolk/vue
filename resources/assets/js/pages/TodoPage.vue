<template>
    <div class="section">
        <div :class="{'is-loading':fetch}">
            <create-form></create-form>
            <br>
            <div class="columns is-multiline">
                <todo-item
                        v-for="(item, index) of todos"
                        :item="item"
                        :key="index"
                        @remove="remove"
                ></todo-item>
            </div>
            <paginator :links="links" @nextPage="nextPage" v-if="links.last_page != 1"></paginator>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'


    export default {
        components: {
            'create-form': require('../components/createTodo'),
            'todo-item': require('../components/TodoItem'),
            'paginator': require('../components/paginator')
        },

        data: function () {
            return {
                fetch: false,
            }
        },

        computed: mapState({
            todos: state => state.todo.todos,
            links: state => state.todo.pagination
        }),

        methods: {
            ...mapActions([
                'getTodos',
                'removeTodo'
            ]),

            remove: function (id) {
                this.fetch = true;
                this.removeTodo(id).then(resolve => {
                    this.fetch = false
                })
            },

            nextPage: function (id) {
                this.getTodos(id)
            }
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.fetch = true;
                vm.getTodos(to.query.page).then(() => {
                        vm.fetch = false;
                    }
                )
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.fetch = true;
            this.getTodos(to.query.page).then(() => {
                this.fetch = false
            })
            next()
        }
    }
</script>