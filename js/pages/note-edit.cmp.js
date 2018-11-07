'use strict';

import noteService from '../services/note-service.js'

export default {
    template: `
        <section class="note-edior" >
        Edit Your Note
        <div>{{title}}</div>
        <input type="text" v-model="title" >
        <input type="text" v-model="txts">
        <button @click="goBack">Back To Notes</button>
        <button @click="deleteNote">Throw Note</button>
        </section>
    `,
    data() {
        return {
            id: null,
            title: null,
            type: null,
            txts: null,
            importance: false,
        }
    },
    methods: {
        goBack() {
            this.$router.push('/noteville')
        },
        deleteNote(){
            noteService.deleteNote(this.id)
        }
    },
    created() {
        noteService.query()
        .then(() => {
            noteService.getNoteById(this.$route.params.noteId)
            .then(note => {
                this.title = note.title
                this.txts = note.txts
                this.id = note.id
                this.importance = note.importance
            })
        })
        
    },
    computed: {

    }

};