import { memorizedRefreshToken } from './auth/postRefreshToken'
import { tokenManager } from './tokenManager'

export async function* fetchStreamedText(
  url: string,
  init?: RequestInit,
  allowRefreshRetry = true
): AsyncGenerator<string> {
  // axiosの結果をyieldする方法がわからずfetchで実装
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'plain/text',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenManager.getAccessToken()}`,
    },
  })

  if (response.status === 401 && allowRefreshRetry) {
    const res = await memorizedRefreshToken()
    tokenManager.setAccessToken(res.accessToken)
    tokenManager.setRefreshToken(res.refreshToken)
    yield* fetchStreamedText(url, init, false)
    return
  }

  if (response.status !== 200) {
    //TODO まともなエラーハンドリング
    throw new Error('status code is not 200')
  }

  const reader = response.body?.getReader()
  if (typeof reader === 'undefined') {
    throw new Error('reader is undefined')
  }
  const decoder = new TextDecoder('utf-8')
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (!value) continue
    yield decoder.decode(value)
  }
}
