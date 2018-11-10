'use strict'

export default {
    props: ['note'],
    template: `
        <section v-if="note.id" class="img-note-container" :style="{background: note.background}">
        <input class="text-input" type="text" v-model="note.title" placeholder="Name Your Note">
            <div class="edit-img-container"><img v-if="note.url" :src="note.url" /></div>
        </section>
        <section v-else>
         <div v-if="(note.type === 'image')">{{note.type}}
            <div class="text-note-add-container">
            <div class="title">{{note.title}}</div>
                <input class="image-input" type="text" v-model="note.title" placeholder="Name Your Note">
                <img v-if="note.url" :src="note.url" />
                <h2>Upload Image Below</h2>
                <input class="text-input"  type="text" v-model="note.url" placeholder="Put Url Here">
                <button @click="addNote">Save Note</button>
            </div>
         </div>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        goBack() {
            this.$router.push('/noteville')
        },
        deleteNote() {
            this.$emit('deleteNote', this.note)
            noteService.deleteNote(this.note.id)
            this.goBack()
        },
        deleteTodo(todoIdx) {
            this.note.txts.splice(todoIdx, 1)
        },
        addNote() {
            console.log(this.note)
            this.$emit('addNewNote', this.note)
        },
        editOldNote() {
            noteService.editNote(this.note)
            this.goBack()
        },

    },
    created() {
        console.log('created', this.note)

    },
    computed: {

    }

};