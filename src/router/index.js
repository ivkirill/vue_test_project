import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/products',
      name: 'list',
      component: function(resolve) {
        require(['@/pages/products_list.vue'], resolve);
      }
    },
    {
      path: '/product/add',
      name: 'add',
      component: function(resolve) {
        require(['@/pages/product_add.vue'], resolve);
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: function(resolve) {
        require(['@/pages/product_edit.vue'], resolve);
      }
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})