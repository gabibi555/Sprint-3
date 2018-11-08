'use strict';
import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <div v-for="note in notes" class="note-container" >
            <note-preview :note="note" @click.native="selectedNote(note)"></note-preview>
        </div>
    </section>
    `,
    data() {
        return {
        }
    },
    created() {
        // console.log(this.notes)
    },
    methods: {
        selectedNote(note) {
            this.$emit('selected', note)
        }
    },
    components: {
        notePreview
    }

}