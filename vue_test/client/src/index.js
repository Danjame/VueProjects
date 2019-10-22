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
import Receivemethod from './receivemethod/index.vue';
import Address from './address/index.vue';
import Shops from './shops/index.vue';

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
        },
        {
          path: '/receivemethod', component: Receivemethod
        },
        {
          path: '/address', component: Address
        },
        {
          path: '/shops', component: Shops
        }
    ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});