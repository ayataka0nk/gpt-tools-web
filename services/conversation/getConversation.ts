import { axiosUser } from '../axios'

export type Conversation = {
  conversationId: number
  userId: number
  title: string
  createdAt: string
}

type GetConversationsResponseBody = {
  conversation_id: number
  user_id: number
  title: string
  created_at: string
}
export type GetConversationsResult = Conversation

type GetConversationParams = {
  conversationId: number
}
export const getConversation = async ({
  conversationId,
}: GetConversationParams) => {
  const response = await axiosUser().get(`/conversations/${conversationId}`)
  const responseBody = response.data as GetConversationsResponseBody
  const result: GetConversationsResult = {
    conversationId: responseBody.conversation_id,
    userId: responseBody.user_id,
    title: responseBody.title,
    createdAt: responseBody.created_at,
  }
  return result
}
