import { request } from '@/service/request/index.js'

// 用户登录
export const fetchLogin = async (params) => {
  // 返回的数据格式可以和服务端约定
  return await request.post('/back/login/signIn', params)
}
