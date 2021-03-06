import Vue from 'vue'
import VueRouter from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store.js'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

import App from './app.vue'
import Index from './index/index.vue'
import Detail from './detail/detail.vue'
import Select from './select/select.vue'
import Receive from './receive/receive.vue'
import Address from './address/address.vue'
import Region from './service/region.vue'
import Center from './service/center.vue'
import Information from './service/information.vue'
import Verifydone from './pay/components/creditcard/src/verifyDone.vue'
import Pay from './pay/pay.vue'
import Verification from './pay/components/creditcard/src/verification.vue'
import Help from './pay/components/creditcard/src/help.vue'

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
            path: '/service/region',
            component: Region
        },
        {
            path: '/service/center',
            component: Center
        },
        {
            path: '/service/information',
            component: Information
        },
        {
            path: '/pay',
            component: Pay
        },
        {
            path: '/pay/verification',
            component: Verification
        },
        {
            path: '/pay/verification/help',
            component: Help
        },
        {
            path: '/pay/verification/verifydone',
            component: Verifydone
        },
    ]
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});