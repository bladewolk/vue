<template>
    <div :class="{'load':fetch}">
        <create-form></create-form>
        <todo-item
                v-for="(item, index) of todos"
                v-bind:item="item"
                :key="index"
                @click.native="removeTodo(item.id)"
        ></todo-item>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'

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
            todos: state => state.todos,
        }),

        methods: {
            ...mapActions({
                getTodos: 'getTodos',
                removeTodo: 'removeTodo',
                globalFetch: 'globalFetch'
            }),
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.fetch = true
                vm.getTodos().then(res => {
                    vm.fetch = false
                })
            });
        },
    }
</script>