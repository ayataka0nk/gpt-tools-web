import { axiosUser } from '../axios'

export type PostConversationResult = {
  conversationId: number
}

type PostConversationResponseBody = {
  conversation_id: number
}

export const postConversation = async () => {
  const response = await axiosUser().post(`/conversations`, {})
  const responseBody = response.data as PostConversationResponseBody
  const result: PostConversationResult = {
    conversationId: responseBody.conversation_id,
  }
  return result
}
