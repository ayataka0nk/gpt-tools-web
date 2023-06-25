import { fetchStreamedText } from '../fetchStreamedText'

export type PostConversationMessageParams = {
  conversationId: number
  userMessage: string
}

type PostConversationMessageRequestBody = {
  user_message: string
}

export async function* postConversationMessage({
  conversationId,
  userMessage,
}: PostConversationMessageParams) {
  const body: PostConversationMessageRequestBody = {
    user_message: userMessage,
  }
  const response = fetchStreamedText(
    `/conversations/${conversationId}/messages`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  )
  for await (const text of response) {
    yield text
  }
}
