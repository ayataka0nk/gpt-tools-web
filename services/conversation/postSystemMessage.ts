import { axiosUser } from '../axios'

export type PostSystemMessageParams = {
  conversationId: number
  systemMessage: string
  modelType: number
}

export type PostSystemMessageResult = {
  conversationId: number
}

type PostSystemMessageRequestBody = {
  system_message: string
  model_type: number
}

type PostSystemMessageResponseBody = {
  conversation_id: number
}

export const postSystemMessage = async ({
  conversationId,
  systemMessage,
  modelType,
}: PostSystemMessageParams) => {
  const body: PostSystemMessageRequestBody = {
    system_message: systemMessage,
    model_type: modelType,
  }
  const result = await axiosUser().put(
    `/conversations/${conversationId}/system-messages`,
    body
  )
  const responseBody: PostSystemMessageResponseBody = result.data
  return {
    conversationId: responseBody.conversation_id,
  }
}
