'use strict';

export default {
    props:['notes'],

    template:`
    <section class="note-list">
    <ul>
        <div v-for="note in notes" class="note-container">
            {{note}}
        </div>
    </ul>
    </section>
    `,
    data(){
        return {
        }
    },
    created(){

        console.log(this.notes);
        
    }
}