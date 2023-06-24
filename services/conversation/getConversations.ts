import { axiosUser } from '../axios'

export type ConversationIndex = {
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
}[]

export type GetConversationsResult = ConversationIndex[]

export const getConversations = async () => {
  const response = await axiosUser().get('/conversations')
  const responseBody = response.data as GetConversationsResponseBody
  const result: GetConversationsResult = responseBody.map((conversation) => {
    return {
      conversationId: conversation.conversation_id,
      userId: conversation.user_id,
      title: conversation.title,
      createdAt: conversation.created_at,
    }
  })
  return result
}
