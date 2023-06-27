import { axiosUser } from '../axios'

export type SystemMessage = {
  conversationMessageId: number
  conversationId: number
  content: string
  createdAt: string
}

type GetSystemMessagesResponseBody = {
  conversation_message_id: number
  conversation_id: number
  content: string
  created_at: string
}

export type GetSystemMessagesResult = SystemMessage[]

type GetSystemMessagesParams = {
  conversationId: number
}

export const getSystemMessages = async ({
  conversationId,
}: GetSystemMessagesParams) => {
  const response = await axiosUser().get(
    `/conversations/${conversationId}/system-messages`
  )
  const responseBody = response.data as GetSystemMessagesResponseBody
  const result: GetSystemMessagesResult = [
    {
      conversationMessageId: responseBody.conversation_message_id,
      conversationId: responseBody.conversation_id,
      content: responseBody.content,
      createdAt: responseBody.created_at,
    },
  ]
  return result
}
