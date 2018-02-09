<template>
    <article class="message is-primary">
        <div class="message-header">
            <p>{{ item.title }}</p>
            <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis
        </div>
    </article>
</template>
<script>
    export default {
        props: ['item'],
    }
</script>