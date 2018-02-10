<template>

    <form @submit.prevent="save" class="columns is-multiline">
        <div class="column is-4">
            <label class="label">Hour rate</label>
            <div class="control">
                <input class="input" type="text" v-model="form.hour_rate">
            </div>
        </div>
        <div class="column is-4">
            <label class="label">Exchange rate</label>
            <div class="control">
                <input class="input" type="text" v-model="form.exchange_rate">
            </div>
        </div>
        <div class="column is-4">
            <label class="label">Company rate</label>
            <div class="control">
                <input class="input" type="text" v-model="form.company_rate">
            </div>
        </div>
        <div class="column">
            <button class="button is-primary">Update</button>
        </div>
    </form>

</template>
<script>
    import {Form} from "../Core/Form";

    export default {
        data: function () {
            return {
                form: new Form({
                    hour_rate: '',
                    exchange_rate: '',
                    company_rate: ''
                })
            }
        },

        methods: {
            save: function () {
                console.log('save')
            }
        }
    }
</script>