import { axiosGuest } from '../axios'
import { tokenManager } from '../tokenManager'

export type PostTokenParams = {
  email: string
  password: string
}

export type PostTokenResult = {
  accessToken: string
  refreshToken: string
}

type PostTokenRequestBody = {
  username: string
  password: string
}

type PostTokenResponseBody = {
  access_token: string
  refresh_token: string
}

export const postToken = async (params: PostTokenParams) => {
  const requestBody: PostTokenRequestBody = {
    username: params.email,
    password: params.password,
  }
  const response = await axiosGuest().post('/auth/token', requestBody, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const responseBody = response.data as PostTokenResponseBody
  const result: PostTokenResult = {
    accessToken: responseBody.access_token,
    refreshToken: responseBody.refresh_token,
  }
  tokenManager.setAccessToken(result.accessToken)
  tokenManager.setRefreshToken(result.refreshToken)
  return
}
