import { axiosUser } from '../axios'

export type PostSystemMessageParams = {
  conversationId: number
  systemMessage: string
}

export type PostSystemMessageResult = {
  conversationId: number
}

type PostSystemMessageRequestBody = {
  system_message: string
}

type PostSystemMessageResponseBody = {
  conversation_id: number
}

export const postSystemMessage = async ({
  conversationId,
  systemMessage,
}: PostSystemMessageParams) => {
  const body: PostSystemMessageRequestBody = {
    system_message: systemMessage,
  }
  const result = await axiosUser().post(
    `/conversations/${conversationId}/system-messages`,
    body
  )
  const responseBody: PostSystemMessageResponseBody = result.data
  return {
    conversationId: responseBody.conversation_id,
  }
}
