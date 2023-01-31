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
    async login(formInline) {
      return await new Promise(async (resolve, reject) => {
        const result = await fetchLogin(formInline)
        this.userInfo = localStg.set(storageKey.userInfo, result)
        console.log(this.userInfo)
        this.token = result?.token ?? ''
        resolve(result)
      })
    },
  },
})
