import { useQuery } from '@tanstack/react-query'
import { getConversation } from '../../../services/conversation/getConversationMessages'
import styles from './styles.module.scss'
import { Input } from '../../common/Form/Input'
import { postConversationMessage } from '../../../services/conversation/postConversationMessage'
import { FormEventHandler, useState } from 'react'
import { Message, MessageBlock } from './MessageBlock'

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

  const [messages, setMessages] = useState<Message[]>(
    conversationMessagesQuery.data.map((rec) => ({
      role: rec.roleType,
      content: rec.content,
    }))
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (userMessage === '') {
      return
    }
    setUserMessage('')
    setMessages((prev) => [
      ...prev,
      { role: 3, content: userMessage },
      { role: 2, content: '' },
    ])
    for await (const message of postConversationMessage({
      conversationId,
      userMessage: userMessage,
    })) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { role: 2, content: prev[prev.length - 1].content + message },
      ])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value)
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
          <Input value={userMessage} onChange={handleInputChange} />
          <button className={styles['button']}>送信</button>
        </form>
      </main>
    </div>
  )
}
