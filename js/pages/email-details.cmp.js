
import emailService from '../services/email-service.js';

export default {
    template: `
        <section class="email-details-container" v-if="email">
            <h1>email details</h1>
            <button @click="back">Back</button>
            <div>{{email.subject}}</div>
            <div>{{email.body}}</div>
            <button @click="deleteEmail">Delete</button>
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