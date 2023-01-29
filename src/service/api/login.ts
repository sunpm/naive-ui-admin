import { request } from '@/service/request'

// 用户登录
export const fetchLogin = async (params: LoginReqForm) => {
  // 返回的数据格式可以和服务端约定
  return await request.post<LoginResData>('/back/login/signIn', params)
}
