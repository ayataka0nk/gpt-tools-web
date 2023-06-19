export async function* fetchStreamedText(
  url: string,
  init?: RequestInit
): AsyncGenerator<string> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'plain/text',
    },
  })
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
