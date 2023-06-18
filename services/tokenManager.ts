import { setCookie, parseCookies } from 'nookies'

export const tokenManager = {
  getAccessToken: () => {
    const cookies = parseCookies()
    const accessToken = cookies.accessToken
    if (accessToken === null || accessToken === '') {
      //TODO 401に置き換える
      throw new Error('refresh_token is null')
    }
    return accessToken
  },
  setAccessToken: (accessToken: string) => {
    setCookie(null, 'accessToken', accessToken, {
      maxAge: 60 * 60, // 1時間
      secure: true,
      path: '/',
    })
  },
  getRefreshToken: () => {
    const cookies = parseCookies()
    const refreshToken = cookies.refreshToken
    if (refreshToken === null || refreshToken === '') {
      //TODO 401に置き換える
      throw new Error('refresh_token is null')
    }
    return refreshToken
  },
  setRefreshToken: (refreshToken: string) => {
    setCookie(null, 'refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 90, // 90日
      secure: true,
      path: '/',
    })
  },
}
