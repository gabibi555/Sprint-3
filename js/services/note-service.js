'use strict';


import utilService from './util-service.js'


function query (filter = null) {
    return storageService.load(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = createInitialNotes();
                storageService.store(KEY, cars);
            }
            console.log('Cars: ', cars);
            if (filter === null) return cars;
            else return cars.filter(car => 
                            car.vendor.toUpperCase().includes(filter.byVendor.toUpperCase()))
        })
}

function editNote(note) {

}

function deleteNote(note) {

}

function createInitialNotes (){

   return  notes = [
        {
            id: utilService.makeId(),
            type: 'Text Note',
            txt: '',
            importance: false,
        },
        {
            id: utilService.makeId(),
            type: 'Image Note',
            txt: '',
            importance: false,
        },
        {
            id: utilService.makeId(),
            type: 'Todo Note',
            todo: [],
            importance: false,
        },
    
    ]
}
