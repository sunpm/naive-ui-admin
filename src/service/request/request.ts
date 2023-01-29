import axios, {AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'

// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  code: number
  msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T
}

enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 10001, // 登录失效
  FAIL = 0, // 请求失败
  SUCCESS = 1, // 请求成功
  NotFound = 404, // 找不到路径
}

const config = {
  // 默认地址
  baseURL: import.meta.env.VITE_BASE_API,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        const userInfo = localStorage.getItem('EnumStorageKey.userInfo') // EnumStorageKey.userInfo 为 userInfo 的缓存 key
        const {token} = JSON.parse(userInfo ?? '')
        config.data = Object.assign(config.data ?? {}, {token})
        return {
          ...config,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }
      },
      (error: AxiosError) => {
        // 请求报错
        void Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const {data} = response // 解构
        const {code} = data
        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem('token', '')
          // router.replace({
          // path: '/login'
          // })
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code !== RequestEnums.SUCCESS) {
          // TODO 添加错误信息提示
          // ElMessage.error(data.msg) // 此处也可以使用组件提示报错信息
          return Promise.reject(data)
        }
        if (code === 1) {
          return data.data
        }
      },
      (error: AxiosError) => {
        const {response} = error
        if (response != null) {
          this.handleError(response)
        }
        if (!window.navigator.onLine) {
          // TODO 添加错误信息提示
          // ElMessage.error('网络连接失败')
          // 可以跳转到错误页面，也可以不做操作
          // return router.replace({
          // path: '/404'
          // });
        }
      }
    )
  }

  handleError(error: AxiosResponse): void {
    const {status, config} = error
    switch (status) {
      case RequestEnums.NotFound:
        // TODO 添加错误信息提示
        // ElMessage.error(`找不到请求的API路径：${config.url ?? ''}`)
        break
      case 401:
        // TODO 添加错误信息提示
        // ElMessage.error('登录失败，请重新登录')
        break
      default:
        // TODO 添加错误信息提示
        // ElMessage.error('请求失败')
        break
    }
  }

  // 常用方法封装
  async get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return await this.service.get(url, {params})
  }

  async post<T>(url: string, params?: object): Promise<T | any> {
    return await this.service.post(url, params)
  }

  async put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return await this.service.put(url, params)
  }

  async delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return await this.service.delete(url, {params})
  }
}

// 导出一个实例对象
export const request = new RequestHttp(config)
