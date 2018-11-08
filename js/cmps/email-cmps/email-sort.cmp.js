'use strict';

export default {
    template: `
    <div class="sort-emails-container">
        <span class="sort-emails-trigger" @mouseover="showSortOpts"
        @mouseout="hideSortOpts">
            Sort by:
        </span>
        <div class="sort-opts" v-if="showOpts" @mouseover="showSortOpts" @mouseout="hideSortOpts">
            <span class="sort-by-sent" @click="sort('date')">Sent At</span>
            <br>
            <span class="sort-by-title" @click="sort('title')">Title</span>
        </div>
    </div>
    `,
    data() {
        return {
            showOpts: false,
        }
    },
    methods: {
        showSortOpts() {
            this.showOpts = true;
        },
        hideSortOpts() {
            this.showOpts = false;
        },
        sort(sortParam) {
            this.$emit('sort', sortParam);
        }
    },
}