import { axiosGuest } from '../axios'

type PostRefreshTokenParams = {
  refreshToken: string
}

type PostRefreshTokenResponseBody = {
  access_token: string
  refresh_token: string
}

export type PostRefreshTokenResult = {
  accessToken: string
  refreshToken: string
}

export const postRefreshToken = async ({
  refreshToken,
}: PostRefreshTokenParams) => {
  const response = await axiosGuest().post('/auth/token', undefined, {
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
