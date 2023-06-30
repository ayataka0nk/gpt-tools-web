import { Dispatch, useCallback } from 'react'
import { isEmpty } from '../../../utils/isEmpty'
import { postConversationMessage } from '../../../services/conversation/postConversationMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  PostSystemMessageParams,
  postSystemMessage,
} from '../../../services/conversation/postSystemMessage'
import { ConversationAction, ConversationState } from './useConversationState'
import { QueryKeys } from './QueryKeys'

type ConversationStateProps = {
  conversationId: number
  state: ConversationState
  dispatch: Dispatch<ConversationAction>
}
export const useConversationPageHooks = ({
  conversationId,
  state,
  dispatch,
}: ConversationStateProps) => {
  const queryClient = useQueryClient()
  const postSystemMessageMutation = useMutation(
    (params: PostSystemMessageParams) => postSystemMessage(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.systemMessages(conversationId))
        queryClient.invalidateQueries(QueryKeys.conversation(conversationId))
      },
    }
  )

  const sendMessage = useCallback(async () => {
    // 無意味な空白文字だけの送信を防ぐ
    if (isEmpty(state.userMessage) || state.isPending) {
      return
    }

    dispatch({
      type: 'beforeSendUserMessage',
    })

    for await (const message of postConversationMessage({
      conversationId: conversationId,
      userMessage: state.userMessage,
    })) {
      dispatch({
        type: 'addAssistantMessageFragment',
        payload: { fragment: message },
      })
    }
    dispatch({
      type: 'afterSendUserMessage',
    })
  }, [conversationId, dispatch, state.isPending, state.userMessage])

  const sendSystemMessage = useCallback(async () => {
    if (isEmpty(state.systemMessage) || state.isPending) {
      return
    }
    await postSystemMessageMutation.mutateAsync({
      conversationId: conversationId,
      systemMessage: state.systemMessage,
      modelType: state.modelType,
    })
    dispatch({
      type: 'afterSendSystemMessage',
    })
  }, [
    conversationId,
    dispatch,
    postSystemMessageMutation,
    state.isPending,
    state.modelType,
    state.systemMessage,
  ])

  return {
    sendMessage,
    sendSystemMessage,
  }
}
