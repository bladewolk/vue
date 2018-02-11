<template>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">

        <router-link class="pagination-previous" :to="{ path: route_path, query: { page: links.current_page - 1  }}"
                     v-show="links.current_page - 1 > 0">
            Previous
        </router-link>

        <router-link class="pagination-next" :to="{ path: route_path, query: { page: links.current_page + 1  }}"
                     v-show="links.current_page + 1 <= links.last_page">
            Next
        </router-link>

        <ul class="pagination-list">
            <li v-for="link,index in pages" :key="index">
                <router-link class="pagination-link" :to="{ path: route_path, query: { page: link  }}"
                             :class="{ 'is-current ': links.current_page == link}">
                    {{ link}}
                </router-link>
            </li>
        </ul>

    </nav>
</template>
<script>
    export default {
        props: ['links'],
        computed: {
            pages: function () {
                if (this.links.current_page) {
                    let res = [];
                    let start = this.links.current_page;
                    let end = this.links.last_page;

                    if (start - 2 > 0)
                        start -= 2;
                    else if (start - 1 > 0)
                        start -= 1;

                    for (let i = start; i < start + 5; i++) {
                        if (i <= end)
                            res.push(i)
                    }

                    return res;
                }

                return null;
            },
            route_path: function () {
                return this.$route.path
            }
        }
    }
</script>