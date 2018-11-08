'use strict'

export default {
    props: ['note'],
    template: `
    <section class="todo-control">
        <div>
            <input type="text" v-model="note.title" placeholder="Name Your Note">
            <div>
            <button @click="addNewTodo">Add Todo</button>
            <input type="text" v-model="newTodo.txt">
            </div>
        </div>
        <li v-for="(txt,idx) in note.txts" type="text">
            <span v-if="newTodo.isDone" style="textDecoration:line-through;">{{txt.txt}}</span>
            <span v-else>{{txt.txt}}</span>
            <button @click="deleteTodo(idx)">X</button>
            <button @click="markDoneTodo(txt, $event)">V</button>
        </li>
        <button v-if="!note.id" @click="addNote">Save Todo</button>
    </section>
    `,
    data() {
        return {
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

        deleteTodo(todoIdx) {
            this.note.txts.splice(todoIdx, 1)
        },
        addNote() {
            this.$emit('addNewNote', this.note)
        },
        editOldNote() {
            noteService.editNote(this.note)
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
        addNewTodo() {
            console.log('new todo',this.newTodo)
            console.log('this note',this.newTodo)
            this.note.txts.push(this.newTodo)
            this.newTodo = {
                txt: '',
                isDone: false,
            }
            this.$emit('addTodo', this.newTodo)
            // noteService.editNote(this.note)
        },
        deleteNote() {
            this.$emit('deleteNote', this.note)
            this.goBack()
        },

    },
    created() {
        console.log('created TODO', this.note)

    },
    computed: {

    }

};