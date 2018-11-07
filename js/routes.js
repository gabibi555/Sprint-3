'use strict';

import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import noteApp from './pages/note-app.cmp.js';

var myRoutes = [
    {path: '/home', component: homePage },
    {path: '/about', component: aboutPage },
    {path: '/noteville', component: noteApp },
]

export default myRoutes;
