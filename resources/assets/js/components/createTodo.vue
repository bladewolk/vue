<template>
    <form @submit.prevent="create">

        <div class="field">
            <label class="label">Body</label>
            <div class="control">
                <input class="input" type="text" placeholder="Body" v-model="form.body">
            </div>
            <p class="help is-danger" v-show="form.errors.has('body')">{{ form.errors.get('body') }}</p>
        </div>


        <button type="submit" class="button is-link" :class="{ 'is-loading' : sending }">Store</button>
    </form>
</template>
<script>
    import {Form} from "../Core/Form";
    import {mapActions} from 'vuex'

    export default {
        data: function () {
            return {
                form: new Form({
                    body: '',
                }),
                sending: false
            }
        },

        methods: {
            create: function () {
                this.sending = true;
                // console.log('create', this.sending);
                this.storeTodo(this.form.getFields())
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

            ...mapActions([
                'storeTodo'
            ]),
        }
    }
</script>