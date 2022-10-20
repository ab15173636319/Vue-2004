let routers = [
  {
    path: '/user/login',
    name: 'userlogin',
    component: () => import('../views/user/LoginView.vue'),
  },
]
export default routers
