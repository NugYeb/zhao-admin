export const adminRouter = [
  {
    path: '/admin',
    name: 'admin',
    redirect: { name: 'dashboard' },
    meta: {
      title: '后台管理',
    },
    component: () => import('@/views/AdminView.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '总览',
        },
        component: () => import('@/views/admin/DashBoard.vue'),
      },
      {
        path: 'user',
        name: 'user',
        redirect: { name: 'user_list' },
        meta: {
          title: '用户管理',
        },
        children: [
          {
            path: 'list',
            name: 'user_list',
            meta: {
              title: '用户列表',
            },
            component: () => import('@/views/admin/UserList.vue'),
          },
        ],
      },
      {
        path: 'article',
        name: 'article',
        redirect: { name: 'article_list' },
        meta: {
          title: '文章管理',
        },
        children: [
          {
            path: 'list',
            name: 'article_list',
            meta: {
              title: '文章列表',
            },
            component: () => import('@/views/admin/ArticleList.vue'),
          },
          {
            path: 'edit',
            name: 'article_edit',
            meta: {
              title: '文章编辑',
            },
            component: () => import('@/views/admin/ArticleEditor.vue'),
          },
        ],
      },
      {
        path: 'system',
        name: 'system',
        meta: {
          title: '系统管理',
        },
        children: [
          {
            path: 'info',
            name: 'system_info',
            meta: {
              title: '系统信息',
            },
            component: () => import('@/views/admin/SystemInfo.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/LoginView.vue'),
  },
]
