import storageService from '../../services/storage-service.js';


export default {
    props: ['email', 'emails'],
    template: `
        <div class="single-email-box" :class="checkIsRead">
                <div class="mail-prev-subject">{{emailSubject}}</div> 
                <div class="mail-prev-time">{{showFullTime}}</div>
            <div class="mail-prev-body">{{emailBody}}</div>
            <span class="mark-read-btn" :class="readOrUnread" @click.stop="changeIsRead"></span>
        </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        changeIsRead() {
            this.email.isRead = !this.email.isRead;
            storageService.store('emails', this.emails)
        }
    },
    created() {

    },
    computed: {
        emailBody() {
            if (this.email.body.length > 90) {
                return this.email.body.substr(0, 90) + '...';
            } else return this.email.body;
        },
        emailSubject() {
            if (this.email.subject.length > 20) {
                return this.email.subject.substr(0, 20) + '...';
            } else return this.email.subject;
        },
        showFullTime() {
            return moment(this.email.sentAt).format("MMM Do, h:mm:ss a");
        },
        checkIsRead() {
            if (this.email.isRead) {return 'is-read';}
        },
        readOrUnread() {
            if (this.email.isRead) return 'fa-envelope-open far';
            else return 'fa-envelope far';
        }

    }
}