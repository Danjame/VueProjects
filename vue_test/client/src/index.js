import Vue from 'vue';
import VueRouter from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(VueRouter);

import App from './app.vue';
import Index from './index/index.vue';
import Detail from './detail/index.vue';
import Select from './select/index.vue';
import Pay from './pay/index.vue';



let router = new VueRouter({
    routes: [
        { 
          path: '/', component: Index
        },
        {
          path: '/detail', component: Detail
        },
        {
          path: '/select', component: Select
        },
        {
          path: '/pay', component: Pay
        }
    ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});