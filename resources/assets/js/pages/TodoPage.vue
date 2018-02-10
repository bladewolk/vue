<template>
    <div :class="{'load':fetch}">
        <create-form></create-form>
        <br>
        <div class="columns is-multiline">
            <todo-item
                    v-for="(item, index) of todos"
                    v-bind:item="item"
                    :key="index"
                    @remove="remove"
            ></todo-item>
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
            'todo-item': require('../components/TodoItem')
        },

        data: function () {
            return {
                fetch: false
            }
        },

        computed: mapState({
            todos: state => state.todo.todos,
        }),

        methods: {
            ...mapMutations([
                // 'removeTodo'
            ]),
            ...mapActions([
                'getTodos',
                'removeTodo'
            ]),

            remove: function (id) {
                this.fetch = true;
                this.removeTodo(id).then(resolve => {
                    this.fetch = false
                })
            }
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.getTodos()
                // vm.fetch = true;
                // vm.getTodos().then((res, err) => {
                //     vm.fetch = false
                // }, err => {
                //     vm.fetch = false
                // })
            });
        }
    }
</script>