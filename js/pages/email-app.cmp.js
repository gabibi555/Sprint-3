'use strict'

import emailService from '../services/email-service.js';
import emailList from '../cmps/email-cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-cmps/email-filter.cmp.js';
import storageService from '../services/storage-service.js';
import emailSort from '../cmps/email-cmps/email-sort.cmp.js';




export default {
    template: ` 
    <section class="email-app-container">
        <button @click="composeEmail">Compose</button>
        <email-filter @filtered="setFilter"></email-filter>
        <email-sort @sort="sort"></email-sort>
        <span>Unread Emails: {{unreadCount}}</span>
        <email-list :filter="filter" v-if="emails.length>0 && !selected" 
        @selected="selectEmail" :emails="emailsToShow"></email-list>
        <router-view @unSelected="unSelect" @delete="deleteEmail"></router-view>
    </section>
    `,
    data() {
        return {
            filter: null,
            emails: [],
            selected: null,
            unreadCount: 0,
        }
    },
    methods: {
        selectEmail(email) {
            this.selected = email;
            this.$router.push('/emailville/' + email.id);
            email.isRead = true;
            storageService.store('emails', this.emails)
        console.log(this.emails);

        },
        unSelect() {
            this.selected = null;
        },
        setFilter(filter) {
            this.filter = filter;
        },
        loadEmails() {
            return emailService.query().then(emails => {
                this.emails = emails;
            })
        },
        deleteEmail(emailToDelete) {
            var idx = this.emails.findIndex(email => email.id === emailToDelete.id);
            this.emails.splice(idx, 1);
            storageService.store('emails', this.emails)
            this.unSelect();
            this.$router.push('/emailville/')
        },
        composeEmail() {
            this.$router.push('/emailville/compose');
        },
        sort(sortParam) {
            emailService.sortEmails(sortParam)
                .then(emails => {
                    this.emails = emails;
                    this.$router.push('/emailville');
                })
        },
        unreadEmailsCheck() {
            var unreadCount = 0;
            this.emails.forEach(email=>{
                if(!email.isRead) unreadCount++;
            })
            this.unreadCount = unreadCount;
            console.log(unreadCount);
        }
    },
    created() {
        this.loadEmails()
        .then(emails => this.unreadEmailsCheck());
        
    },
    computed: {
        emailsToShow() {
            if (!this.filter.subjectTxt && this.filter.emailStatus === 'all') return this.emails;
            if (this.filter.emailStatus === 'read') {
                return this.emails
                    .filter(email => email.isRead)
                    .filter(email => !this.filter.subjectTxt
                        || email.subject.toLowerCase().includes(this.filter.subjectTxt.toLowerCase()))

            }
            if (this.filter.emailStatus === 'unread') {
                return this.emails
                    .filter(email => !email.isRead)
                    .filter(email => !this.filter.subjectTxt
                        || email.subject.toLowerCase().includes(this.filter.subjectTxt.toLowerCase()))

            }
            console.log(this.emails)
            return this.emails
                .filter(email =>
                    !this.filter.subjectTxt
                    || email.subject.toLowerCase().includes(this.filter.subjectTxt.toLowerCase()))


        },
    },
    components: {
        emailList,
        emailFilter,
        emailSort
    }
}


