import {RouteRecordRaw} from "vue-router"

const modules = import.meta.glob('./**/*.ts', { eager: true });

/**
 * 处理全部导入的路由模块
 * @param modules - 路由模块
 */
export function handleModuleRoutes(modules: AuthRoute.RouteModule) {
  const routes: any = [];

  Object.keys(modules).forEach(key => {
    const item = modules[key].default;
    if (item) {
      routes.push(item);
    } else {
      window.console.error(`路由模块解析出错: key = ${key}`);
    }
  });

  return routes
}


export const routes = handleModuleRoutes(modules as AuthRoute.RouteModule);
