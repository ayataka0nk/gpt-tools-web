import { useQuery } from '@tanstack/react-query'
import { getConversation } from '../../../services/conversation/getConversationMessages'
import styles from './styles.module.scss'
import { postConversationMessage } from '../../../services/conversation/postConversationMessage'
import { FormEventHandler, useState } from 'react'
import { Message, MessageBlock } from './MessageBlock'
import { Textarea } from '../../common/Form/TextArea'

type ConversationPageProps = {
  conversationId: number
}

export const ConversationPage = ({ conversationId }: ConversationPageProps) => {
  const conversationMessagesQuery = useQuery(
    ['/conversation/messages', conversationId],
    () => getConversation({ conversationId })
  )

  if (typeof conversationMessagesQuery.data === 'undefined') {
    throw new Error('conversationQuery.data is undefined')
  }

  const [userMessage, setUserMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [messages, setMessages] = useState<Message[]>(
    conversationMessagesQuery.data.map((rec) => ({
      role: rec.roleType,
      content: rec.content,
    }))
  )

  const sendMessage = async () => {
    // 無意味な空白文字だけの送信を防ぐ
    if (userMessage.replaceAll(/\n/g, '').replaceAll(' ', '') === '') {
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
      <main className={styles['main']}>
        <h1>Conversation Page</h1>
        <div className={styles['messages']}>
          <>
            {messages.map((message, index) => (
              <MessageBlock key={index} {...message} />
            ))}
          </>
        </div>
        <form className={styles['input-area']} onSubmit={handleSubmit}>
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
      </main>
    </div>
  )
}
