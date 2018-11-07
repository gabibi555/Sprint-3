'use strict'

import emailService from '../services/email-service.js';
import emailList from '../cmps/email-cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-cmps/email-filter.cmp.js';


export default {
    template: ` 
    <section class="email-app-container">
        <email-filter @filtered="setFilter"></email-filter>
        <email-list v-if="emails.length>0" @selected="selectEmail" :emails="emailsToShow"></email-list>
        asff
    </section>
    `,
    data() {
        return {
            filter: null,
            emails: []
        }
    },
    methods: {
        selectEmail(email) {
            this.$router.push('/email/' + email.id)

        },
        setFilter(filter) {
            this.filter = filter
        },
        loadEmails() {
            emailService.query().then(emails => {
                this.emails = emails;
            })
        }
    },
    created() {
        this.loadEmails();
    },
    computed: {
        emailsToShow() {
            if (!this.filter) return this.emails;
            return this.emails
                .filter(email => email.title.includes(this.filter.byVendor))
                .filter(email => !this.filter.maxPrice || email.listPrice.amount < this.filter.maxPrice)
                .filter(email => !this.filter.minPrice || email.listPrice.amount > this.filter.minPrice)
        },

    },
    components: {
        emailList,
        emailFilter

    }
}


