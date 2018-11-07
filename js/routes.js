'use strict';

import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import emailPage from './pages/email-app.cmp.js';
import noteApp from './pages/note-app.cmp.js';
import emailDetails from './pages/email-details.cmp.js';


var myRoutes = [
    {path: '/home', component: homePage },
    {path: '/about', component: aboutPage },
    {
        path: '/emailville',
        name: 'emailville',
        component: emailPage, 
        children: [
            {
                path: ':emailId',
                name: 'email-details',
                component: emailDetails
            }
        ]
    },
    // {path: '/emailville', component: emailPage },
    // {path: '/emailville/:emailId', component: emailDetails },
    {path: '/noteville', component: noteApp },
]

export default myRoutes;
