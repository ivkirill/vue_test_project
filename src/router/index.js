import Vue from 'vue'
import Router from 'vue-router'

import products_list from '@/pages/products_list.vue'
import product_edit from '@/pages/product_edit.vue'
import form from '@/components/form/form.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'list',
            component: products_list
        },
        {
            path: '/product/add',
            name: 'add',
            component: form
        },
        {
            path: '/product/:id',
            name: 'product',
            component: product_edit
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})