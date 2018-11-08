'use strict'

export default {
    props: ['note'],
    template: `
    <section>
        <h3>{{note.title}}</h3>
        <img class="note-preview-img" :src="this.src" alt="">
    </section>
    `,
    data(){
        return {
            src:null,
        }
    },
    created() {
        this.setNoteType()
    },
    methods:{
        setNoteType(){
            if(this.note.type==='Image') this.src = 'img/img-icon.png'
            if(this.note.type==='Text') this.src = 'img/img-icon.png'
            if(this.note.type==='Todo') this.src = 'img/todo-icon.png'
        }
    },
    computed: {
     
    }
};