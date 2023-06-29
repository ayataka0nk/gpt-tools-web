import { useCallback, useEffect, useState } from 'react'
import { Conversation } from '../../../services/conversation/getConversation'
import { ConversationMessage } from '../../../services/conversation/getConversationMessages'
import { SystemMessage } from '../../../services/conversation/getSystemMessage'
import { Message } from './MessageBlock'
import { RoleType } from '../../../constants/RoleType'
import { isEmpty } from '../../../utils/isEmpty'
import { postConversationMessage } from '../../../services/conversation/postConversationMessage'
import { useMutation } from '@tanstack/react-query'
import {
  PostSystemMessageParams,
  postSystemMessage,
} from '../../../services/conversation/postSystemMessage'

type ConversationStateProps = {
  conversation: Conversation
  conversationMessages: ConversationMessage[]
  systemMessages: SystemMessage[]
}
export const useConversationState = ({
  conversation,
  conversationMessages,
  systemMessages,
}: ConversationStateProps) => {
  const [userMessage, setUserMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [systemMessage, setSystemMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    ...systemMessages.map((rec) => ({
      role: RoleType.SYSTEM,
      content: rec.content,
    })),
    ...conversationMessages.map((rec) => ({
      role: rec.roleType,
      content: rec.content,
    })),
  ])

  const postSystemMessageMutation = useMutation(
    (params: PostSystemMessageParams) => postSystemMessage(params)
  )

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      if (scrollPos === scrollHeight) {
        setAtBottom(true)
      } else {
        setAtBottom(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, document.documentElement.scrollHeight)
  }, [])

  useEffect(() => {
    if (atBottom) {
      window.scrollTo(0, document.documentElement.scrollHeight)
    }
    // メッセージ履歴変更時、ユーザメッセージ変更時に自動スクロールする
  }, [atBottom, messages, userMessage])

  const sendMessage = useCallback(async () => {
    // 無意味な空白文字だけの送信を防ぐ
    if (isEmpty(userMessage) || isPending) {
      return
    }
    setUserMessage('')
    setMessages((prev) => [
      ...prev,
      { role: 3, content: userMessage },
      { role: 2, content: '' },
    ])
    setIsPending(true)
    for await (const message of postConversationMessage({
      conversationId: conversation.conversationId,
      userMessage: userMessage,
    })) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { role: 2, content: prev[prev.length - 1].content + message },
      ])
    }
    setIsPending(false)
  }, [conversation.conversationId, isPending, userMessage])

  const sendSystemMessage = useCallback(async () => {
    if (isEmpty(systemMessage) || isPending) {
      return
    }
    await postSystemMessageMutation.mutateAsync({
      conversationId: conversation.conversationId,
      systemMessage: systemMessage,
    })
    setMessages((prev) => [
      ...prev,
      { role: RoleType.SYSTEM, content: systemMessage },
    ])
    setSystemMessage('')
  }, [
    conversation.conversationId,
    isPending,
    postSystemMessageMutation,
    systemMessage,
  ])

  const changeUserMessage = useCallback((value: string) => {
    setUserMessage(value)
  }, [])

  const changeSystemMessage = useCallback((value: string) => {
    setSystemMessage(value)
  }, [])

  const isNoMessages =
    messages.length === 0 && systemMessages.length === 0 && !isPending

  return {
    isPending,
    isNoMessages,
    messages,
    userMessage,
    systemMessage,
    changeUserMessage,
    changeSystemMessage,
    sendMessage,
    sendSystemMessage,
  }
}
