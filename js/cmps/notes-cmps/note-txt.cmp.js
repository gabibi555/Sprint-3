'use strict'

export default {
    props: ['note'],
    template: `
        <section v-if="note.id" class="img-note-container" >
            <div class="title">{{note.title}}</div>
            <textarea v-if="note.type === 'text'" v-model="note.txts[0]" rows="4" cols="20"></textarea>
        </section> 
        <section v-else>
              <div class="text-note-add-container">
                    <input class="text-input" type="text" v-model="note.title" placeholder="Name Your Note">
                    <textarea v-model="note.txts[0]" rows="4" cols="20">
                    </textarea>
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
        console.log('created Note', this.note)

    },
    computed: {

    }

};