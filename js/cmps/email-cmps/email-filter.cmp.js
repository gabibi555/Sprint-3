
export default {
    template: `
        <section class="filter-container">
            <form>
                Email Search: <input type="text" v-model="filter.emailTitle" />
                <button @click.prevent="setFilter">Search</button>
            </form>
        </section>
        `,
    data() {
        return {
            filter: {
                emailTitle: '',
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filter.emailTitle);
        }
    }
};