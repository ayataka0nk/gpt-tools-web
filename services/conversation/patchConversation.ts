import { axiosUser } from '../axios'

export type PatchConversationParams = {
  conversationId: number
  title: string
}

type PatchConversationRequestBody = {
  title: string
}

export const patchConversation = async (
  params: PatchConversationParams
): Promise<void> => {
  const reqBody: PatchConversationRequestBody = {
    title: params.title,
  }
  await axiosUser().patch(`/conversations/${params.conversationId}`, reqBody)
  return
}
