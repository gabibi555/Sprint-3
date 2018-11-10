'use strict';

import noteService from '../../services/note-service.js'
import noteTxt from '../../cmps/notes-cmps/note-txt.cmp.js'
import noteList from '../../cmps/notes-cmps/note-list.cmp.js'
import eventBus from '../../event-bus.js'

export default {
    template: `
        <section class="note-app">
        <h1>Welcome To NoteVille</h1>
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
            this.$router.push('/noteville' + '/edit/' + note.id)
        },
        goToEdit() {
            this.$router.push('/noteville/edit')
        },
        deleteNote(noteId) {
            noteService.deleteNote(noteId)
        }
    },
    created() {
        console.log(this.notes)
        noteService.query()
            .then(notes => this.notes = notes)

        eventBus.$on('deleteNote', (note) => {
            console.log('event bus !on!', note);
            this.deleteNote(note.id)

        })
    },

    computed: {

    },
    components: {
        noteService,
        noteTxt,
        noteList
    }

};