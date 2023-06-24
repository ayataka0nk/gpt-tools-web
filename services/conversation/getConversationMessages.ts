import { axiosUser } from '../axios'

type GetConversationMessagesResponseBody = {
  conversation_message_id: number
  conversation_id: number
  role_type: number
  content: string
  created_at: string
}[]

type GetConversationMessagesParams = {
  conversationId: number
}

export type ConversationMessage = {
  conversationMessageId: number
  conversationId: number
  roleType: number
  content: string
  createdAt: string
}

export type GetConversationMessagesResult = ConversationMessage[]

export const getConversation = async ({
  conversationId,
}: GetConversationMessagesParams) => {
  const response = await axiosUser().get(
    `/conversations/${conversationId}/messages`
  )
  const responseBody = response.data as GetConversationMessagesResponseBody
  const result: GetConversationMessagesResult = responseBody.map((message) => {
    return {
      conversationMessageId: message.conversation_message_id,
      conversationId: message.conversation_id,
      roleType: message.role_type,
      content: message.content,
      createdAt: message.created_at,
    }
  })
  return result
}
