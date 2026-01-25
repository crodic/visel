import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'
import { apiRefreshToken, apiSignOut } from '@/features/auth/queries'
import { PaginateQueryBuilder } from './queryBuilder'

const http = axios.create({
  timeout: 10 * 60 * 1000,
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
  paramsSerializer: (params) => {
    return new PaginateQueryBuilder(params).toQueryString()
  },
})

http.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().meta.accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshTokenPromise: Promise<void> | null = null

http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && originalRequest) {
      if (!refreshTokenPromise) {
        const refreshToken = useAuthStore.getState().meta.refreshToken

        if (!refreshToken) {
          apiSignOut().finally(() => {
            useAuthStore.getState().logout()
            location.href = '/sign-in'
          })
          return Promise.reject(error)
        }

        refreshTokenPromise = apiRefreshToken(refreshToken)
          .then((res) => {
            const accessToken = res.data.accessToken
            const refreshToken = res.data.refreshToken
            useAuthStore.getState().setToken({
              accessToken,
              refreshToken,
            })
            http.defaults.headers.Authorization = `Bearer ${accessToken}`
          })
          .catch((_error) => {
            apiSignOut().finally(() => {
              useAuthStore.getState().logout()
              location.href = '/sign-in'
            })
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then(() => {
        return http(originalRequest)
      })
    }

    return Promise.reject(error)
  }
)

export default http
