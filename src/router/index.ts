import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页',
      },
      redirect: '/dashboard',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: {
            title: '总览',
          },
          component: () => import('../views/home/DashBoard.vue'),
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            title: '用户管理',
          },
          component: () => import('../views/home/UserAdmin.vue'),
        },
        {
          path: 'article',
          name: 'article',
          meta: {
            title: '文章管理',
          },
          redirect: '/article/list',
          children: [
            {
              path: 'list',
              name: 'article_list',
              meta: {
                title: '列表',
              },
              component: () => import('../views/home/ArticleList.vue'),
            },
            {
              path: 'edit',
              name: 'article_edit',
              meta: {
                title: '编辑',
              },
              component: () => import('../views/home/MdEdit.vue'),
            },
          ],
        },
        {
          path: 'system',
          name: 'system',
          meta: {
            title: '系统管理',
          },
          component: () => import('../views/home/SystemAdmin.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
