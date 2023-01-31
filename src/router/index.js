import {createRouter, createWebHistory,} from 'vue-router'
// 导入路由模块
import {routes as routeModules} from "./modules/index.js";
import {createRouterGuards} from "@/router/guard/index.js"



/*
// 路由排序，暂时用不上，先注释
function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);*/

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: import.meta.env.VITE_ROUTE_ROOT_PATH,
  meta: {
    title: 'Root',
  },
};

const LoginRoute = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  }
]
//需要验证权限
export const asyncRoutes = [...routeModules];

//普通路由 无需验证权限
export const constantRouter = [...LoginRoute, RootRoute];
// export const constantRouter: any[] = [LoginRoute, RootRoute, RedirectRoute];

const router = createRouter({
  history: createWebHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})



export function setupRouter(app) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router
