

export default {
    props: ['email'],
    template: `
        <div class="single-email-box" :class="checkIsRead">
            <div class="mail-prev-subject">{{email.subject}}</div> 
            <div class="mail-prev-body">{{emailBody}}</div>
            <div class="mail-prev-time">{{showFullTime}}</div>
            <span class="mark-read-btn" @click.stop="changeIsRead">{{readOrUnread}}</span>
        </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        changeIsRead() {
            this.email.isRead = !this.email.isRead;
        }

    },
    created() {

    },
    computed: {
        emailBody() {
            if (this.email.body.length > 80) {
                return this.email.body.substr(0, 80);
            } else return this.email.body;
        },
        showFullTime(){
            return moment(this.email.sentAt).format("MMM Do, h:mm:ss a");              
        },
        checkIsRead() {
            if(this.email.isRead) return 'is-read';
        },
        readOrUnread() {
            if(this.email.isRead) return 'Mark unread';
            else return 'Mark read';
        }

    }
}