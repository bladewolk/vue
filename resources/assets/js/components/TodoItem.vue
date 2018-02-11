<template>
    <article class="message is-primary column is-3">
        <div class="message-header">
            <p>{{ item.created_at }}</p>
            <button class="delete" aria-label="delete" @click="$emit('remove', item.id)"></button>
        </div>
        <div class="message-body">
            {{ item.body }}
        </div>
    </article>
</template>
<script>
    export default {
        props: ['item']
    }
</script>