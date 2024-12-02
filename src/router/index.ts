import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/post/PostList.vue'),
    },
    {
      path: '/post/:id',
      name: 'postDetails',
      component: () => import('@/components/post/PostComments.vue'),
    },
  ],
})

export default router
