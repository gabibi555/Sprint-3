'use strict'

import eventBus from '../../event-bus.js'

export default {
    props: ['note'],
    template: `
    <section class="note-preview-container" >
        <h3>{{note.title}}</h3>
        <img class="note-preview-img" :src="this.src" alt="">
        <div>
            <button @click.stop="changeBackground('#C390D4')" class="note-background-color-purp"></button>
            <button @click.stop="changeBackground('#D9BA5D')" class="note-background-color-orange"></button>
            <button @click.stop="changeBackground('#7EDE96')" class="note-background-color-green"></button>
        </div>
        <button class="delete-note-btn" @click.stop="deleteNote">🗑</button>
    </section>
    `,
    data() {
        return {
            src: null,
        }
    },
    created() {
        this.setNoteType()
    },
    methods: {
        setNoteType() {
            if (this.note.type === 'image') this.src = 'img/img-icon.png'
            if (this.note.type === 'text') this.src = 'img/txt-icon.png'
            if (this.note.type === 'todo') this.src = 'img/todo-icon.png'
        },
        deleteNote() {
            console.log('emit bus');
            eventBus.$emit('deleteNote', this.note)
        },
        changeBackground(color){
            this.note.background=color  
            console.log('go')
            eventBus.$emit('changeColor', this.note)
        }

    },
    computed: {

    }
};