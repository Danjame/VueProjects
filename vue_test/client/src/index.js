import Vue from 'vue';
import VueRouter from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueRouter);

import App from './app.vue';
import Index from './index/index.vue';
import Detail from './detail/detail.vue';
import Select from './select/select.vue';
import Pay from './pay/pay.vue';
import Receive from './receive/receive.vue';
import Address from './address/address.vue';
import Shops from './shops/shops.vue';

let router = new VueRouter({
    routes: [{
            path: '/',
            component: Index
        },
        {
            path: '/detail',
            component: Detail
        },
        {
            path: '/select',
            component: Select
        },
        {
            path: '/receive',
            component: Receive
        },
        {
            path: '/address',
            component: Address
        },
        {
            path: '/pay',
            component: Pay
        },

        {
            path: '/shops',
            component: Shops
        }
    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});