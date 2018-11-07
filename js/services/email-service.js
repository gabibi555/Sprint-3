'use strict';

import storageService from './storage-service.js'
import utilService from './util-service.js'


export default {
    getEmailById,
    query,
}


const EMAILS_KEY = 'books';

var emailsDB = []
query();

function query() {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails) {
        emails = getEmailsFromJSON();
        storageService.store(EMAILS_KEY, emails)
    }
    emailsDB = emails;
    return Promise.resolve(emailsDB);
}

function getEmailById(emailId) {
    var email = emailsDB.find(email => email.id === emailId)
    return Promise.resolve(email);
}


function getEmailsFromJSON() {
    return [
        {
            id: utilService.makeId(6),
            to: '',
            subject: 'Welcome to EmailVille',
            body: 'We want to welcome you for choosing us to be your e-mail compeny, and wish you a great e-mail experience!',
            isRead: false,
            sentAt: Date.now()
        },
        {
            id: utilService.makeId(6),
            to: '',
            subject: 'checking',
            body: 'checking',
            isRead: false,
            sentAt: Date.now()
        }
    ]
}