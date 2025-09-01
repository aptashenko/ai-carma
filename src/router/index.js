import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/result/:report_id',
      name: 'result',
      component: () => import('../views/ResultPage.vue'),
    },
    {
      path: '/success',
      component: () => import('../views/SuccessPage.vue')
      // redirect: (to) => {
      //   return { name: 'result', params: { user_id: Cookies.get('user_id') } }
      // }
    }
  ],
})

router.afterEach((to) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_title: document.title,
    });
  }
});

export default router
