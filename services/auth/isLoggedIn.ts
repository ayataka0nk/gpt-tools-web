import { axiosUser } from '../axios'
import axios from 'axios'

export const getIsLoggedIn = async () => {
  try {
    await axiosUser().get('/profile')
    return true
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      return false
    }
    throw e
  }
}
