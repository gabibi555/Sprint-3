
import emailPreview from './email-preview.cmp.js';


export default {
    props: ['emails'],
    template: `
    <section>
    <h1>List Of Out emails</h1>
    <div class="email-list-container">
        <email-preview 
            @click.native="selectedemail(email)"
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
        selectedemail(email){
            this.$emit('selected', email);
        }
    },
    created() {
        console.log(this.emails);

    },
    computed: {

    },
    components: {
        emailPreview,
    }
};