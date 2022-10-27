//测试模块的路由信息
let routers = [
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/HomeView.vue'),
  },
  {
    path: '/test/ws',
    name: 'test',
    component: () => import('../views/test/WsView.vue'),
  },
  {
    path: '/test/router',
    name: 'router',
    component: () => import('../views/test/RouterView.vue'),
  },
  {
    path: '/test/router/:info',
    name: 'router',
    component: () => import('../views/test/RouterInfoView.vue'),
  },
]

export default routers
