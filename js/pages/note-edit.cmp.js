'use strict';

import noteService from '../services/note-service.js'

export default {
    template: `
        <section v-if="note.id" class="note-editor" >
        <h4>Edit Your Note</h4>
        <div>{{note.title}}</div>
        <input type="text" v-model="note.title" >
        <li v-for="(txt,idx) in note.txts" type="text"> {{txt}} <button @click="deleteTodo(idx)">X</button></li>
        <button @click="goBack">Back To Notes</button>
        <button @click="deleteNote">Throw Note</button>
        </section>
        <div v-else class="note-editor" >
            <h4>Add Note</h4>
            <button @click="setNoteAdd('text')">text note</button><button @click="setNoteAdd('image')">image note</button><button @click="setNoteAdd('todo')">todo note</button>
            <div  v-if="(note.type === 'text')">
              <div class="text-note-add-container">
                    <input class="text-input" type="text" placeholder="Name Your Note">
                    <textarea rows="4" cols="20">
                    </textarea>
                    <button @click="addNote">Add Note</button>
              </div> 
            </div>
            <div v-if="(note.type === 'image')">{{type}}
               <div class="text-note-add-container">
                    <input class="image-input" type="text" placeholder="Name Your Note">
                    <h2>Upload Img</h2>
                    <input type="file" name="" id="">
               </div>  
            </div>
            <div v-if="(note.type === 'todo')">{{type}}
                    <div class="todo-note-add-container">
                    <input class="todo-input" type="text" placeholder="Name Your Note">
                    <input class="todo-input-text" type="text" placeholder="Write Your Todo">
                    <ul>
                        <li></li>
                    </ul>
                </div>  
            </div>
        </div>
    `,
    data() {
        return {
            note: {
                id: null,
                title: null,
                type: null,
                txts: null,
                importance: false,
            }
        }
    },
    methods: {
        goBack() {
            this.$router.push('/noteville')
        },
        deleteNote() {
            noteService.deleteNote(this.id)
            this.goBack()
        },
        deleteTodo(todoIdx) {
            this.txts.splice(todoIdx, 1)
        },
        setNoteAdd(noteType) {
            this.note.type = noteType
        },
        addNote() {

        }

    },
    created() {
        if (this.$route.params.noteId) {
            noteService.query()
                .then(() => {
                    noteService.getNoteById(this.$route.params.noteId)
                        .then(note => {
                            this.note.title = note.title
                            this.note.txts = note.txts
                            this.note.id = note.id
                            this.note.importance = note.importance
                        })
                })
        }


    },
    computed: {

    }

};