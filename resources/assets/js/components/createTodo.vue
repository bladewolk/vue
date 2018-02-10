<template>
    <form @submit.prevent="create">

        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input class="input" type="text" placeholder="Title" v-model="form.title">
            </div>
            <p class="help is-danger" v-show="form.errors.has('title')">{{ form.errors.get('title') }}</p>
        </div>

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <input class="input" type="text" placeholder="Descr" v-model="form.description">
            </div>
            <p class="help is-danger" v-show="form.errors.has('description')">{{ form.errors.get('description') }}</p>
        </div>
        <button type="submit" v-bind:class="{ 'is-loading' : sending }" class="button is-link">Store</button>
    </form>
</template>
<script>
    import {Form} from "../Core/Form";
    import {mapActions} from 'vuex'

    export default {
        data: function () {
            return {
                form: new Form({
                    title: '',
                    description: ''
                }),
                sending: false
            }
        },

        methods: {
            create: function () {
                this.sending = true;

                this.store(this.form.getFields())
                    .then(res => {
                        this.form.reset();
                        this.sending = false
                    }, e => {
                        if (e.status === 422) {
                            this.form.errors.record(e.data.errors);
                        }
                        this.sending = false
                    })
            },

            ...mapActions({
                store: 'storeTodo'
            }),
        }
    }
</script>