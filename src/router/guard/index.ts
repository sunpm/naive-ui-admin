import type {Router, RouteRecordRaw} from 'vue-router';
import {asyncRoutes} from "@/router"
import {flatten} from "lodash";

let registerRouteFresh = true // 定义标识，记录路由是否添加

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    // window.$loadingBar?.start();
    // 页面跳转权限处理
    // await createPermissionGuard(to, from, next);


    if (registerRouteFresh) {

      const routes = flatten(asyncRoutes)
      console.log(routes)
      // 动态添加可访问路由表
      routes.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw);
      });
      next({ ...to, replace: true })
      registerRouteFresh = false
    } else {
      next()

    }
  });
  router.afterEach(to => {
    // 设置document title
    // useTitle(to.meta.title);
    // 结束 loadingBar
    // window.$loadingBar?.finish();
  });
}
