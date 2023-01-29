import { App } from 'vue';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
// 导入路由模块
import {routes as routeModules} from "./modules";
import {createRouterGuards} from "@/router/guard"



/*
// 路由排序，暂时用不上，先注释
function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);*/

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: import.meta.env.VITE_ROUTE_ROOT_PATH,
  meta: {
    title: 'Root',
  },
};

const LoginRoute: RouteRecordRaw[] = [
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
export const constantRouter: RouteRecordRaw[] = [...LoginRoute, RootRoute];
// export const constantRouter: any[] = [LoginRoute, RootRoute, RedirectRoute];

const router = createRouter({
  history: createWebHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})



export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router
