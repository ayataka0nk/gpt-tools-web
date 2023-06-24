import { fetchStreamedText } from '../fetchStreamedText'

export type PostConversationMessageParams = {
  userMessage: string
}

type PostConversationMessageRequestBody = {
  user_message: string
}

export async function* postConversationMessage(
  params: PostConversationMessageParams
) {
  const body: PostConversationMessageRequestBody = {
    user_message: params.userMessage,
  }
  const response = fetchStreamedText('/conversations/1/messages', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  for await (const text of response) {
    yield text
  }
}
