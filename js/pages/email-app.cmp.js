'use strict'

import emailService from '../services/email-service.js';
import emailList from '../cmps/email-cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-cmps/email-filter.cmp.js';
import storageService from '../services/storage-service.js';



export default {
    template: ` 
    <section class="email-app-container">
        <email-filter @filtered="setFilter"></email-filter>
        <email-list v-if="emails.length>0 || selected" @selected="selectEmail" :emails="emailsToShow"></email-list>
        <router-view  @delete="deleteEmail"></router-view>
    </section>
    `,
    data() {
        return {
            filter: null,
            emails: [],
            selected: null,
        }
    },
    methods: {
        selectEmail(email) {
            this.selected = email;
            this.$router.push('/emailville/' + email.id)
        },
        setFilter(filter) {
            this.filter = filter
        },
        loadEmails() {
            emailService.query().then(emails => {
                this.emails = emails;
            })
        },
        deleteEmail(emailToDelete) {
            var idx = this.emails.findIndex(email => email.id === emailToDelete.id);
            this.emails.splice(idx, 1);
            storageService.store('emails', this.emails)
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


