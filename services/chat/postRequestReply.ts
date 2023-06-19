import { fetchStreamedText } from '../fetchStreamedText'

export async function* getRequestReply() {
  const response = fetchStreamedText('/chat/request-reply', {
    method: 'POST',
  })
  for await (const text of response) {
    yield text
  }
}
