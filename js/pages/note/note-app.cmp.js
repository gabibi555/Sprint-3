'use strict';

import noteService from '../../services/note-service.js'
import noteTxt from '../../cmps/notes-cmps/note-txt.cmp.js'
import noteList from '../../cmps/notes-cmps/note-list.cmp.js'

export default {
    template: `
        <section class="note-app">
            
        <!-- <h1>{{(note.id)? 'Edit Car': 'Add Car'}}</h1> -->
        <h1>Welcome To NoteVille</h1>
        <button @click="goToEdit">New Note</button> 
        <note-list @selected="selectNote" :notes="notes"></note-list>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    methods: {
        selectNote(note) {
            this.$router.push('/noteville'+'/edit/' + note.id)
        },
        goToEdit(){
            this.$router.push('/noteville/edit')
        }


    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    computed: {

    },
    components: {
        noteService,
        noteTxt,
        noteList
    }

};