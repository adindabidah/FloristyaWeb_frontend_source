import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue';
import Error404View from "../views/error/Erro404View.vue";
import CustomerListView from "../views/customer/CustomerListView.vue";
import CustomerDetailView from "../views/customer/CustomerDetailView.vue";
import CashierListView from "../views/cashier/CashierListView.vue";
import CashierDetailView from "../views/cashier/CashierDetailView.vue";
import BungaListView from "../views/bunga/BungaListView.vue";
import BungaDetailView from "../views/bunga/BungaDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerListView,
      meta: {
        title: 'Customer list'
      }
    },
    {
      path: '/customer/:id_customer',
      name: 'customer-detail',
      component: CustomerDetailView,
      meta: {
        title: 'Customer detail'
      }
    },
    {
      path: '/cashier',
      name: 'cashier',
      component: CashierListView,
      meta: {
        title: 'Cashier list'
      }
    },
    {
      path: '/cashier/:id_cashier',
      name: 'cashier-detail',
      component: CashierDetailView,
      meta: {
        title: 'Cashier detail'
      }
    },
    {
      path: '/bunga',
      name: 'bunga',
      component: BungaListView,
      meta: {
        title: 'Bunga list'
      }
    },
    {
      path: '/bunga/:kode_bunga',
      name: 'bunga-detail',
      component: BungaDetailView,
      meta: {
        title: 'Bunga detail'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error404',
      component: Error404View,
      meta: {
        title: 'Error 404'
      }
    },
  ]
})

export default router
