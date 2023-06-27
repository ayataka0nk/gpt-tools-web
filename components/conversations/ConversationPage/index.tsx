import { useQueries } from '@tanstack/react-query'
import { getConversationMessages } from '../../../services/conversation/getConversationMessages'
import styles from './styles.module.scss'
import { postConversationMessage } from '../../../services/conversation/postConversationMessage'
import { FormEventHandler, useEffect, useState } from 'react'
import { Message, MessageBlock } from './MessageBlock'
import { Textarea } from '../../common/Form/TextArea'
import { getConversation } from '../../../services/conversation/getConversation'
import { getSystemMessages } from '../../../services/conversation/getSystemMessage'
import { RoleType } from '../../../constants/RoleType'

type ConversationPageProps = {
  conversationId: number
}

export const ConversationPage = ({ conversationId }: ConversationPageProps) => {
  const [conversationQuery, conversationMessagesQuery, systemMessagesQuery] =
    useQueries({
      queries: [
        {
          queryKey: ['/conversation', conversationId],
          queryFn: () => getConversation({ conversationId }),
        },
        {
          queryKey: ['/conversation/messages', conversationId],
          queryFn: () => getConversationMessages({ conversationId }),
        },
        {
          queryKey: ['/conversation/system-messages', conversationId],
          queryFn: () => getSystemMessages({ conversationId }),
        },
      ],
    })

  if (
    typeof conversationMessagesQuery.data === 'undefined' ||
    typeof conversationQuery.data === 'undefined' ||
    typeof systemMessagesQuery.data === 'undefined'
  ) {
    throw new Error('conversationQuery.data is undefined')
  }
  const conversation = conversationQuery.data
  const systemMessages = systemMessagesQuery.data

  const [userMessage, setUserMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    ...systemMessages.map((rec) => ({
      role: RoleType.SYSTEM,
      content: rec.content,
    })),
    ...conversationMessagesQuery.data.map((rec) => ({
      role: rec.roleType,
      content: rec.content,
    })),
  ])

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
  }, [atBottom, messages, userMessage])

  const sendMessage = async () => {
    // 無意味な空白文字だけの送信を防ぐ
    if (
      userMessage.replaceAll(/\n/g, '').replaceAll(' ', '') === '' ||
      isPending
    ) {
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
      conversationId,
      userMessage: userMessage,
    })) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { role: 2, content: prev[prev.length - 1].content + message },
      ])
    }
    setIsPending(false)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div>
      <header className={styles['header']}>
        <div className={styles['header-inner']}>
          <h1 className={styles['conversation-title']}>{conversation.title}</h1>
        </div>
      </header>
      <main className={styles['main']}>
        <div className={styles['messages']}>
          <>
            {messages.map((message, index) => (
              <MessageBlock key={index} {...message} />
            ))}
          </>
        </div>
        <div className={styles['form-block']}>
          <form className={styles['form']} onSubmit={handleSubmit}>
            <Textarea
              className={styles['text-area']}
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <button className={styles['button']} disabled={isPending}>
              送信
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
