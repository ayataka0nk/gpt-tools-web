import { axiosGuest } from '../axios'
import mem from 'mem'
import { tokenManager } from '../tokenManager'

type PostRefreshTokenResponseBody = {
  access_token: string
  refresh_token: string
}

export type PostRefreshTokenResult = {
  accessToken: string
  refreshToken: string
}

export const postRefreshToken = async () => {
  const refreshToken = tokenManager.getRefreshToken()
  const response = await axiosGuest().post('/auth/refresh_token', undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
  const responseBody = response.data as PostRefreshTokenResponseBody
  const result: PostRefreshTokenResult = {
    accessToken: responseBody.access_token,
    refreshToken: responseBody.refresh_token,
  }
  return result
}

export const memorizedRefreshToken = mem(postRefreshToken, {
  maxAge: 10000, // 10 seconds
})
