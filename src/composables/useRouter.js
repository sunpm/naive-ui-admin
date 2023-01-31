import { useRouter } from 'vue-router'
import globalRouter from '@/router/index.js'

/**
 * 路由跳转
 * @param isSetup 是否在vue页面/组件的setup里面调用，在axios里面无法使用useRouter和useRoute
 */
export function useRouterPush (isSetup = true) {
  const router = isSetup ? useRouter() : globalRouter
  const route = globalRouter.currentRoute

  /**
   * 路由跳转
   * @param to 需要跳转的路由
   * @param newTab 是否在新的浏览器Tab标签打开
   */
  const routerPush = (to, newTab = false) => {
    if (newTab) {
      const routerData = router.resolve(to)
      window.open(routerData.href, '_blank')
    } else {
      void router.push(to)
    }
  }

  /** 返回上一级路由 */
  const routerBack = () => {
    router.go(-1)
  }

  /**
   * 跳转首页
   * @param newTab 在新的浏览器标签打开
   */
  const toHome = (newTab = false) => {
    routerPush('/', newTab)
  }

  /**
   * 登录成功后跳转重定向的地址
   */
  const toLoginRedirect = () => {
    const { query } = route.value
    if (query?.redirect !== undefined) {
      routerPush(query.redirect)
    } else {
      toHome()
    }
  }

  return {
    routerPush,
    routerBack,
    toHome,
    toLoginRedirect
  }
}
