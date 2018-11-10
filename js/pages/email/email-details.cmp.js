
import emailService from '../../services/email-service.js';

export default {
    template: `
        <section class="email-details-container" v-if="email">
            Subject: <button class="normal-btn details-back-btn" @click="back">Back</button>
            <div>{{email.subject}}</div>
            Massage: <pre class="email-details-body">{{email.body}}</pre>
            <button class="normal-btn details-delete-btn" @click="deleteEmail">Delete</button>
        </section>
    `,
    data() {
        return {
            email: null,
        }
    },
    methods: {
        back() {
            this.$router.push('/emailville')
            this.$emit('unSelected')
        },
        deleteEmail() {
            this.$emit('delete', this.email);

        },
        loadEmailById() {
            let emailId = this.$route.params.emailId;
            emailService.getEmailById(emailId).then(email => {
                this.email = email;
            })
        },
        showListReview() {
            this.isListReview = !this.isListReview;
        },
        closeEmail() {
            this.$router.push('/emailville');
        },
    },
    created() {
        this.loadEmailById();
    },
    computed: {
    },
    components: {
    }
}