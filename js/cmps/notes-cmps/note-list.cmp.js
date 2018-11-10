'use strict';
import notePreview from './note-preview.cmp.js'
import noteService from '../../services/note-service.js'
import eventBus from '../../event-bus.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
    <div class="add-note"  @click="goToEdit()">
        New Note
        <div class="add-btn" @click.native="goToEdit()"></div>
        </div>
        <div v-for="note in notes" class="note-container" :style="{background: note.background}">
            <note-preview :note="note" @click.native="selectedNote(note)"></note-preview>
        </div>
    </section>
    `,
    data() {
        return {
        }
    },
    created() {
        eventBus.$on('changeColor', (note) => {
            noteService.editNote(note)
            console.log('event bus !on!', note);

        })
    },
    mounted(){
    },
    methods: {
        selectedNote(note) {
            this.$emit('selected', note)
        },
        goToEdit() {
            this.$router.push('/noteville/edit')
        } 
    }, 
    

    components: {
        notePreview,
        noteService
    }

}