'use strict';

import { storageService } from './storeage-service.js'
import { utilService } from './util-service.js'


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
    emails = getBooksFromJSON();
    storageService.store(EMAILS_KEY, emails)
  }
  emailsDB = emails;
  return Promise.resolve(emailsDB);
}

function getBookById(emailId) {
  var email = emailsDB.find(email => email.id === emailId)
  return Promise.resolve(email);
}

