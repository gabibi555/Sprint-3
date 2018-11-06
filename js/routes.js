'use strict';

import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';

var myRoutes = [
    {path: '/home', component: homePage },
    {path: '/about', component: aboutPage },
]

export default myRoutes;
