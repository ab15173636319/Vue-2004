let routers = [
  {
    path: '/error/404',
    name: 'error404',
    component: () => import('../views/Error/Error404View.vue'),
  },
]
export default routers
