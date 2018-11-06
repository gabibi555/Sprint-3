'use strict';

import routes from './routes.js';


Vue.use(VueRouter);
const myRouter = new VueRouter({routes})


new Vue({
    el: '#app',
    router: myRouter,
    data: {
    },
    components:{
    }
})