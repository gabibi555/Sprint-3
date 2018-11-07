'use strict';


import utilService from './util-service.js'
import storageService from './storage-service.js'

const KEY = 'notesVilleKey';

export default {
    query,
    deleteNote,
    editNote,
}

var notes = []


function query (filter = null) {
    return storageService.load(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = createInitialNotes();
                storageService.store(KEY, notes);
            }
            console.log('notes: ', notes);
            if (filter === null) return notes;
            else return notes.filter(note => 
                            note.type.toUpperCase().includes(filter.byType.toUpperCase()))
        })
}

function editNote(note) {

}

function deleteNote(note) {

}

function createInitialNotes (){
    console.log('hey')

    return   notes = [
        {
            id: utilService.makeId(6),
            type: 'Text Note',
            txt: '',
            importance: false,
        },
        {
            id: utilService.makeId(6),
            type: 'Image Note',
            txt: '',
            importance: false,
        },
        {
            id: utilService.makeId(6),
            type: 'Todo Note',
            todo: [],
            importance: false,
        },
    
    ]
}


