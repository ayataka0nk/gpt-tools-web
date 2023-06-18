import { axiosUser } from '../axios'

type PostClearTokenParams = {
  refreshToken: string
}

type PostClearTokenRequestBody = {
  refresh_token: string
}

export const postClearToken = async ({
  refreshToken,
}: PostClearTokenParams) => {
  const requestBody: PostClearTokenRequestBody = {
    refresh_token: refreshToken,
  }
  await axiosUser().post('/auth/clear_token', requestBody)
  return
}
