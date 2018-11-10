'use strict';

export default {
    template: `
    <div class="sort-emails-container">

        <div class="sort-opts">
            <div class="sort-by">Sort by:</div>
            <div class="sort-by-sent sort-btn" @click="sort('date')">Sent At</div>
            <div class="sort-by-title sort-btn" @click="sort('title')">Title</div>
        </div>
    </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        sort(sortParam) {
            this.$emit('sort', sortParam);
        }
    },
    computed: {

    }
}