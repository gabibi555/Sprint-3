import emailPreview from './email-preview.cmp.js';


export default {
    props: ['emails', 'filter'],
    template: `
    <section>
    <h1>List Of Your Emails</h1>
    <div class="email-list-container">
        <email-preview 
            @click.native="selectedEmail(email)"
            v-for='email in emails' 
            v-bind:email="email">
        </email-preview>
        </div>
         
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        selectedEmail(email) {
            this.$emit('selected', email);
        }
    },
    created() {

    },
    computed: {

    },
    components: {
        emailPreview,
    }
};