<template>
    <div class="box column is-4 is-offset-4" v-bind:style="{marginTop: '50vh', transform: 'translateY(-65%)'}">
        <form action="" @submit.prevent="login">

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" v-model="form.email">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="form.password">
                </div>
            </div>
            <button class="button is-primary" v-bind:class="{'is-loading' : fetching}">
                Login
            </button>
        </form>
    </div>
</template>
<script>
    import Layout from '../components/layoutComponent'
    import {Form} from "../Core/Form";

    export default {
        data: function () {
            return {
                fetching: false,
                form: new Form({
                    email: 'root@root.root',
                    password: '123qwe'
                }),
            }
        },

        methods: {
            login: function () {
                this.fetching = true

                axios.post('api/login', this.form.getFields())
                    .then(response => {
                        this.$localStorage.set('token', response.data.token)
                        this.$store.commit('login', {
                            token: response.data.token,
                            authenticated: true
                        })
                        this.$router.push('/')
                    })
                    .catch(e => console.log('Error when log in'))
            },
        }
    }
</script>