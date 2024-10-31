import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SecondView from '../views/SecondView.vue';
import EssaiView from '../views/EssaiView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/second',
      name: 'second',
      component: SecondView,
    },
    {
      path: '/example',
      name: 'example',
      component: EssaiView,
    },
  ],
});

export default router;
