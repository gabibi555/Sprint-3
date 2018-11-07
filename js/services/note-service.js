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
            title:'reminder',
            type: 'Text Note',
            txts: ['dont forget to close the AC'],
            importance: false,
        },
        {
            id: utilService.makeId(6),
            type: 'Image Note',
            title:'fix the roof',
            txts: ['buying nails'],
            importance: false,
        },
        {
            id: utilService.makeId(6),
            type: 'Todo Note',
            title:'To be done till tomorrow',
            txts: ['to do landury','to do Css'],
            importance: false,
        },
    
    ]
}


