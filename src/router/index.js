import { createRouter, createWebHistory } from 'vue-router'
import PriseLocale from '../views/PriseLocale.vue'
import PriseCloud from '../views/PriseCloud.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/prise-locale',
      name: 'prise-locale',
      component: PriseLocale
    },
    {
      path: '/prise-cloud',
      name: 'prise-cloud',
      component: PriseCloud
    }
  ]
})

export default router
