<template>
    <article class="message is-primary column is-3">
        <div class="message-header">
            <p>{{ item.title }}</p>
            <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
            {{ item.description }}
        </div>
    </article>
</template>
<script>
    export default {
        props: ['item'],
    }
</script>