import emailService from '../../services/email-service.js';

export default {
    template: `
        <section class="page-content compose-email">
            <div class="compose-func">
                <button @click="goBack" class="normal-btn">Back</button>
                <button @click="sendEmail" class="normal-btn">Send</button>
            </div>
            <div class="to-subject-compose">
                    <div class="to-compose">to:<input type="text" v-model="email.to"></div>
                   <div class="subject-compose">subject:<input type="text" v-model="email.subject"></div>
            </div>
            <textarea class="compose-massage" v-model="email.body" placeholder="Enter message here..."></textarea>
        </section>
    `,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                body: '',
                isRead: false,
                sentAt: moment()
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