import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'big_user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data.data
    }
    const setUserInfo = (obj) => {
      userInfo.value = obj
    }

    return { token, setToken, removeToken, userInfo, getUserInfo, setUserInfo }
  },
  {
    persist: true
  }
)
