export const homeRouter = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/home/AboutPage.vue'),
      },
    ],
  },
]
