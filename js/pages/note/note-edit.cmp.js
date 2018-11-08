'use strict';

import noteService from '../../services/note-service.js'

export default {
    template: `
        <section v-if="note.id" class="note-editor" >
        <h4>Edit Your Note</h4>
        <div>{{note.title}}</div>
<!-- <input type="text" v-model="note.title" > -->
        <note-img v-if="note.url"></note-img>
        <img v-if="note.url" :src="note.url" />
<!-- <input type="text" v-model="note.title" > -->
        <textarea v-if="note.type === 'text'" v-model="note.txts[0]" rows="4" cols="20"></textarea>       
        <input v-if="note.type === 'image'" type="text" v-model="note.txts[0]" >
<!-- Div for todo Edit -->
        <div v-if="note.type === 'todo'" class="todo-control">
        <input type="text" v-model="newTodo.txt" >
        <button @click="addNewTodo">Add Todo</button>
        </div>
        <li v-for="(txt,idx) in note.txts"  type="text">    
             <span v-if="txt.isDone" style="textDecoration:line-through;">{{txt.txt}}</span>
             <span v-else>{{txt.txt}}</span>
            <div v-if="note.type === 'todo'" >
            <button @click="deleteTodo(idx)">{{note.type}}</button>
            <button @click="markDoneTodo(txt, $event)">V</button>
            </div>
        </li>
<!-- general btns -->
        <button @click="goBack">Back To Notes</button>
        <button @click="deleteNote">Throw Note</button>
        <button @click="editOldNote">Save Note</button>
        </section>
<!-- editors for notes -->
        <div v-else class="note-editor" >
            <h4>Add Note</h4>
            <button @click="setNoteAdd('text')">text note</button>
            <button @click="setNoteAdd('image')">image note</button>
            <button @click="setNoteAdd('todo')">todo note</button>
            <button @click="goBack">Back To Notes</button>
<!-- txt note edioter -->
            <div  v-if="(note.type === 'text')">
              <div class="text-note-add-container">
                    <input class="text-input" type="text" v-model="note.title" placeholder="Name Your Note">
                    <textarea v-model="note.txts[0]" rows="4" cols="20">
                    </textarea>
                    <button @click="addNote">Save Note</button>
              </div> 
            </div>
<!-- img note edioter -->          
            <div v-if="(note.type === 'image')">{{note.type}}
               <div class="text-note-add-container">
                    <input class="image-input" type="text" v-model="note.title" placeholder="Name Your Note">
                    <img v-if="note.url" :src="note.url" />
                    <input type="text" v-model="note.url" placeholder="Put Url Here">
                    <h2>Upload Img</h2>
                    <button @click="addNote">Save Note</button>
               </div>  
            </div>
<!-- todo note edioter -->
            <div v-if="(note.type === 'todo')">{{note.type}}
                    <div class="todo-note-add-container">
                    <input class="todo-input" type="text"  v-model="note.title" placeholder="Name Your Note">
                    <input class="todo-input-text" type="text" placeholder="Write Your Todo">
                    <button @click="addNote">Save Note</button>
                    <div v-if="note.type === 'todo'" class="todo-control">
                    </div>
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
                txts: [],
                url: null,
                importance: false,
            },
            newTodo: {
                txt: '',
                isDone: false,
            }
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
        addNote() {
            noteService.addNewNote(this.note)
            this.goBack()
        },
        editOldNote() {
            noteService.editNote(this.note)
            this.goBack()
        },
        addNewTodo(){
            console.log(this.newTodo) 
            this.note.txts.push(this.newTodo)
            noteService.editNote(this.note)
        }
        // onFileChange(e) {
        //     const file = e.target.files[0];
        //     this.note.url = URL.createObjectURL(file);
        // }



    },
    created() {
        console.log('created')
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
                        })
                })
        }

    },
    computed: {

    }

};