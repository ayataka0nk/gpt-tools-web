import axios from 'axios'
import { tokenManager } from './tokenManager'
import { memorizedRefreshToken } from './auth/postRefreshToken'

export const axiosGuest = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

export const axiosUser = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  client.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${tokenManager.getAccessToken()}`
    return config
  })
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401) {
        const response = await memorizedRefreshToken()
        tokenManager.setAccessToken(response.accessToken)
        tokenManager.setRefreshToken(response.refreshToken)
        return client(originalRequest)
      } else {
        return Promise.reject(error)
      }
    }
  )
  return client
}
