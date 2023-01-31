import { defineStore } from 'pinia'
import { fetchLogin } from '@/service/api/index.js'
import { storageKey } from '@/constants/index.js'
import { localStg } from '@/utlis/index.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    userInfo: {},
    permission: [],
    indentify: [],
  }),
  actions: {
    /**
     * 初始化持久化用户数据
     */
    initUserInfo() {
      const info = localStg.get(storageKey.userInfo)
      this.userInfo = info
      this.token = info?.token ?? ''
    },
    /**
     * 登陆
     * @param formInline
     * @returns {Promise<unknown>}
     */
    async login(formInline) {
      return await new Promise(async (resolve, reject) => {
        const result = await fetchLogin(formInline)
        this.userInfo = localStg.set(storageKey.userInfo, result)
        this.initUserInfo()
        resolve(result)
      })
    },
  },
})
