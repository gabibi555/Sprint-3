
export default {
    template: `
        <section class="filter-container">
                Email Search: <input type="text" @input="setFilter" v-model="filter.subjectTxt" />
                <span class="radio-filter">
                <input type="radio"  value="all" v-model="filter.emailStatus">
                <label for="one">All</label>
                <input type="radio" value="read" v-model="filter.emailStatus">
                <label for="one">Read</label>
                <input type="radio" value="unread" v-model="filter.emailStatus">
                <label for="one">Unread</label>
                </span>
                <!-- <button @click.prevent="setFilter">Search</button> -->
        </section>
        `,
    data() {
        return {
            filter: {
                subjectTxt: '',
                emailStatus: 'all',
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filter);
        }
    },
    created() {
        this.setFilter();
    }
};