<template>
    <div class="section" :class="{ 'is-loading' : fetching}">
        <form @submit.prevent="save">
            <div class="columns is-multiline">
                <div class="column is-4">
                    <label class="label">Hour rate</label>
                    <div class="control">
                        <input class="input" type="text" v-model="form.hour_rate" placeholder="0.0">
                    </div>
                </div>
                <div class="column is-4">
                    <label class="label">Exchange rate</label>
                    <div class="control">
                        <input class="input" type="text" v-model="form.exchange_rate" placeholder="0.0">
                    </div>
                </div>
            </div>
            <button class="button is-primary is-inline">Update</button>
        </form>
    </div>

</template>
<script>
    import {Form} from "../Core/Form"
    import {mapActions} from "vuex"

    export default {
        data: function () {
            return {
                form: {},
                fetching: false
            }
        },

        methods: {
            save: function () {
                this.updateSettings(this.form.getFields())
                    .then(res => {
                        console.log('SUCCESS')
                    })
            },
            ...mapActions([
                'getSettings',
                'updateSettings'
            ])
        },

        beforeRouteEnter: function (to, from, next) {
            next(vm => {
                vm.fetching = true;
                vm.getSettings()
                    .then(res => {
                        vm.form = new Form(res.data);
                        vm.fetching = false;
                    })
            })
        }
    }
</script>