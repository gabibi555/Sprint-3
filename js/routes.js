'use strict';

import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import emailPage from './pages/email-app.cmp.js';
import noteApp from './pages/note-app.cmp.js';
import noteEdit from './pages/note-edit.cmp.js';

var myRoutes = [
    {path: '/home', component: homePage },
    {path: '/about', component: aboutPage },
    {path: '/emailville', component: emailPage },
    {path: '/noteville', component: noteApp },
    {path: '/noteville/:noteId', component: noteEdit }
]

export default myRoutes;
