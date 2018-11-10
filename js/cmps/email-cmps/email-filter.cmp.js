import emailService from '../../services/email-service.js';
import emailSort from '../../cmps/email-cmps/email-sort.cmp.js';

export default {
    props: ['email'],
    template: `
        <section > 
                <div class="filter-container"> 
                    <div class="email-search-input">Search: <input type="text" @input="setFilter" v-model="filter.subjectTxt"/></div>
                    <div class="radio-sort-container">
                        <span class="radio-filter">
                            <input class="checkmark" type="radio"  value="all" v-model="filter.emailStatus">
                            <label for="one">All</label>
                            <input class="checkmark" type="radio" value="read" v-model="filter.emailStatus">
                            <label for="one">Read</label>
                            <input class="checkmark" type="radio" value="unread" v-model="filter.emailStatus">
                            <label for="one">Unread</label>
                        </span>
                    <email-sort @sort="sort"></email-sort>
                    </div>
                </div>
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
        },
        sort(sortParam) {
            emailService.sortEmails(sortParam)
                .then(emails => {
                    this.$emit('sorted', emails);
                    this.$router.push('/emailville');
                })
        },
    },
    created() {
        this.setFilter();
    },
    components: {
        emailSort,
    }
};