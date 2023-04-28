import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/champions',
      name: 'Champions',
      component: () => import("../views/ChampionsView.vue")
    },
    {
      path: '/champion/:name',
      name: 'Champion',
      component: () => import("../views/ChampionView.vue")
    },
    {
      path: '/items',
      name: 'Items',
      component: () => import("../views/ItemsView.vue")
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: () => import("../views/ItemView.vue")
    },
  ]
})

export default router