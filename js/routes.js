'use strict';

import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import emailPage from './pages/email-app.cmp.js';

var myRoutes = [
    {path: '/home', component: homePage },
    {path: '/about', component: aboutPage },
    {path: '/email', component: emailPage },
]

export default myRoutes;
