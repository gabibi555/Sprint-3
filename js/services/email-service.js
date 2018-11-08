'use strict';

import storageService from './storage-service.js'
import utilService from './util-service.js'


export default {
    getEmailById,
    query,
    saveEmail,
    sortEmails
}


const EMAILS_KEY = 'emails';

var emailsDB = []

function query() {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                emails = getEmailsFromJSON();
                storageService.store(EMAILS_KEY, emails);
            }
            emailsDB = emails
            return emails;
        })
}

function getEmailById(emailId) {

    var email = emailsDB.find(email => email.id === emailId)
    return Promise.resolve(email);
}


function getEmailsFromJSON() {
    return [
        {
            id: 'sfevd7',
            to: '',
            subject: 'Welcome to EmailVille',
            body: 'We want to welcome you for choosing us to be your e-mail compeny, and wish you a great e-mail experience!',
            isRead: false,
            sentAt: moment()
        },
        {
            id: 'js7ucy',
            to: '',
            subject: 'checking',
            body: 'checking',
            isRead: false,
            sentAt: moment()
        }
    ]
}

function saveEmail(email) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
                email.id = utilService.makeId(6);
                emails.push(email);
            return storageService.store(EMAILS_KEY, emails);
        });
}

function sortEmails(sortParam) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            if (sortParam === 'date') {
                emails.sort((a, b) => {
                    if (a.sentAt > b.sentAt) return -1;
                    if (a.sentAt < b.sentAt) return 1;
                    return 0;
                })
            } else if (sortParam === 'title') {
                emails.sort((a, b) => {
                    if (a.subject.toUpperCase() < b.subject.toUpperCase()) return -1;
                    if (a.subject.toUpperCase() > b.subject.toUpperCase()) return 1;
                    return 0
                })
            }
            storageService.store(EMAILS_KEY, emails)
            return emails; 
        })
}
