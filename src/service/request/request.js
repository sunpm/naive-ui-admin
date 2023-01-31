import axios from 'axios'
import { storageKey } from '@/constants/index.js'
import { localStg } from '@/utlis/index.js'
import { handleAxiosError } from '@/service/request/error.js'

const config = {
  // 默认地址
  baseURL: import.meta.env.VITE_BASE_API,
  // 设置超时时间
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  constructor(config) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config) => {
        const userInfo = localStg.get(storageKey.userInfo) ?? {}
        const { token } = userInfo
        config.data = Object.assign(config.data ?? {}, { token })
        return {
          ...config,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        }
      },
      (error) => {
        // 请求报错
        void Promise.reject(error)
      },
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response) => {
        const { data } = response // 解构
        const { code } = data
        if (data.code === 10001) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem('token', '')
          // router.replace({
          // path: '/login'
          // })
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code !== 1) {
          // TODO 添加错误信息提示
          // ElMessage.error(data.msg) // 此处也可以使用组件提示报错信息
          return Promise.reject(data)
        }
        if (code === 1) {
          return data.data
        }
      },
      handleAxiosError,
    )
  }

  // 常用方法封装
  async get(url, params) {
    return await this.service.get(url, { params })
  }

  async post(url, params) {
    return await this.service.post(url, params)
  }

  async put(url, params) {
    return await this.service.put(url, params)
  }

  async delete(url, params) {
    return await this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export const request = new RequestHttp(config)
