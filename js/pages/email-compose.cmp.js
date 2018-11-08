import emailService from '../services/email-service.js';

export default {
    template: `
        <section class="page-content compose-email">
            <div class="compose-func">
                <button @click="goBack">X</button>
                <button @click="sendEmail">Send ></button>
            </div>
            <div class="label-holder">
                <label>
                    <span>to:</span> 
                    <input type="text" v-model="email.to">
                </label>
                <label>
                    <span>subject:</span>  
                    <input type="text" v-model="email.subject">
                </label>
            </div>
            <textarea v-model="email.body" placeholder="Enter message here..."></textarea>
        </section>
    `,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                body: '',
                isRead: false,
                sentAt: Date.now()
            }
        }
    },
    computed: {
    },
    methods: {
        sendEmail() {
            this.email.cc = this.ccs;
            emailService.saveEmail(this.email)
            this.goBack()
        },
        goBack() {
            this.$router.push('/emailville');
        },

    }
}