<template>
    <div class="box column is-4 is-offset-4" v-bind:style="{marginTop: '50vh', transform: 'translateY(-65%)'}">
        <form @submit.prevent>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" v-model="form.email">
                </div>
                <p class="help is-danger" v-show="form.errors.has('email')">{{ form.errors.get('email')}}</p>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="form.password">
                </div>
                <p class="help is-danger" v-show="form.errors.has('password')">{{ form.errors.get('password')}}</p>
            </div>
            <button class="button is-primary" :class="{'is-loading' : loginFetch}"
                    @click="log" v-if="!registerFetch">
                Login
            </button>
            <button class="button is-info" @click="reg"
                    :class="{'is-loading' : registerFetch}" v-if="!loginFetch"
            >Register
            </button>
            <p class="help is-danger" v-show="failed">Not found!</p>
        </form>
    </div>
</template>
<script>
    import Layout from '../components/layoutComponent'
    import {Form} from "../Core/Form";
    import {mapActions} from 'vuex'


    export default {
        data: function () {
            return {
                loginFetch: false,
                registerFetch: false,
                form: new Form({
                    email: 'root@root.root',
                    password: '123qwe',
                }),
                failed: false
            }
        },

        methods: {
            ...mapActions([
                'register',
                'login'
            ]),

            reg: function () {
                this.registerFetch = true;
                this.register(this.form.getFields())
                    .then(resolve => {
                        this.registerFetch = false;
                        this.$router.push('/')
                    }, reject => {
                        this.registerFetch = false;
                        if (reject.status === 422)
                            this.form.errors.record(reject.data.errors)
                    });
            },

            log: function () {
                this.loginFetch = true;
                this.login(this.form.getFields())
                    .then(resolve => {
                        this.loginFetch = false;
                        this.$router.push('/')
                    })
                    .catch(e => {
                        if (e.status === 401)
                            this.failed = true;
                        this.loginFetch = false;
                    });
            },
        }
    }
</script>