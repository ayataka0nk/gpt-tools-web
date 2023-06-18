import { axiosUser } from '../axios'

type GetProfileResponseBody = {
  id: number
  email: string
  name: string
}

export type Profile = {
  id: number
  email: string
  name: string
}

export type GetProfileResult = Profile

export const getProfile = async () => {
  const response = await axiosUser().get('/profile')
  const responseBody = response.data as GetProfileResponseBody
  const result: GetProfileResult = {
    id: responseBody.id,
    email: responseBody.email,
    name: responseBody.name,
  }
  return result
}
