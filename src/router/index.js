import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Table from '@/components/common/Table.vue'
import Form from '@/components/form/Form.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'list',
            component: Table
        },
        {
            path: '/product/add',
            name: 'add',
            component: Form
        },
        {
            path: '/product/:id',
            name: 'product',
            component: Form
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})