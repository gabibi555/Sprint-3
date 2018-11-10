'use strict';

import noteService from '../../services/note-service.js'
import noteTxt from '../../cmps/notes-cmps/note-txt.cmp.js'
import noteImg from '../../cmps/notes-cmps/note-img.cmp.js'
import noteTodo from '../../cmps/notes-cmps/note-todo.cmp.js'
import eventBus from '../../event-bus.js'

export default {
    template: `  
    <section v-if="note.id" class="note-editor">
       
        <h4>Edit Your Note</h4>
        <note-txt v-if="note.type === 'text'" :note="note"></note-txt>
        <note-img v-if="note.url" :note="note"></note-img>
        <note-todo v-if="note.type === 'todo'" :note="note"></note-todo>
        <div class="nav-btn">
            <button class="btn-text-note" @click="goBack">Back To Notes</button>
            <button class="btn-text-note" @click="deleteNote">Delete Note</button>
            <button class="btn-text-note" @click="editOldNote">Save Note</button>
        </div>
    </section>

    <div v-else class="note-editor">
        <h4>Add Note</h4>
        <div class="note-pick-btns">
            <button class="btn-text-note" @click="setNoteAdd('text')">text note</button>
            <button class="btn-text-note" @click="setNoteAdd('image')">image note</button>
            <button class="btn-text-note" @click="setNoteAdd('todo')">todo note</button>
            <button class="btn-text-note" @click="goBack">Back To Notes</button>
        </div>
        <note-txt @addNewNote="addNote" class="text-note-add-container" v-if="note.type === 'text'" :note="note"></note-txt>
        <note-img v-if="note.type === 'image'" @addNewNote="addNote":note="note"></note-img>
        <note-todo @addNewNote="addNote" v-if="note.type === 'todo'" :note="note"></note-todo>    
    </div>
`,
    data() {
        return {
            note: {
                id: null,
                title: null,
                type: null,
                txts: [],
                url: null,
                importance: false,
                background: null,
            },
        }
    },
    methods: {
        goBack() {
            this.$router.push('/noteville')
        },
        deleteNote() {
            noteService.deleteNote(this.note.id)
            this.goBack()
        },
        deleteTodo(todoIdx) {
            this.note.txts.splice(todoIdx, 1)
        },
        markDoneTodo(todo, ev) {
            todo.isDone = !todo.isDone
            if (todo.isDone) {
                ev.path[2].children[0].style.textDecoration = "line-through"
                noteService.editNote(this.note)
            }
            else {
                ev.path[2].children[0].style.textDecoration = "none";
                noteService.editNote(this.note)
            }
        },
        setNoteAdd(noteType) {
            this.note.type = noteType
        },
        addNote(note) {
            noteService.addNewNote(note)
            this.goBack()
        },
        editOldNote() {
            noteService.editNote(this.note)
            this.goBack()
        },
        addNewTodo() {
            this.note.txts.push(this.newTodo)
            noteService.editNote(this.note)
        }
    },
    created() {
        if (this.$route.params.noteId) {
            noteService.query()
                .then(() => {
                    noteService.getNoteById(this.$route.params.noteId)
                        .then(note => {
                            this.note.title = note.title
                            this.note.type = note.type
                            this.note.txts = note.txts
                            this.note.id = note.id
                            this.note.importance = note.importance
                            this.note.url = note.url
                            this.note.background = note.background
                        })
                }),
                eventBus.$on('changeColor', (note) => {
                    console.log('im here')
                    noteService.editNote(note)
                    console.log('event bus !EDITSSS!', note);

                })
        }
        eventBus.$on('deleteNote', (note) => {
            console.log('event bus !on!', note);
            this.deleteTodo(note.id)

        })

    },
    computed: {

    },
    components: {
        noteImg,
        noteTxt,
        noteTodo
    }

};