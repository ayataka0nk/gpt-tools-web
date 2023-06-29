import styles from './styles.module.scss'
import { FormEventHandler } from 'react'
import { MessageBlock } from './MessageBlock'
import { Textarea } from '../../common/Form/TextArea'
import { SystemMessageForm } from './SystemMessageForm'
import { useConversationState } from './useConversationState'
import { useConversationPageQueries } from './useConversationPageQueries'
import { ConversationTitle } from './ConversationTitle'

type ConversationPageProps = {
  conversationId: number
}

export const ConversationPage = ({ conversationId }: ConversationPageProps) => {
  const { conversation, conversationMessages, systemMessages } =
    useConversationPageQueries({ conversationId })

  const {
    isPending,
    isNoMessages,
    systemMessage,
    messages,
    userMessage,
    changeUserMessage,
    changeSystemMessage,
    sendMessage,
    sendSystemMessage,
  } = useConversationState({
    conversation: conversation,
    conversationMessages: conversationMessages,
    systemMessages: systemMessages,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeUserMessage(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSystemMessageChange = (value: string) => {
    changeSystemMessage(value)
  }

  const handleSystemMessageSendRequest = () => {
    sendSystemMessage()
  }

  return (
    <div>
      <header className={styles['header']}>
        <div className={styles['header-inner']}>
          <ConversationTitle
            conversationId={conversation.conversationId}
            title={conversation.title}
          />
        </div>
      </header>
      <main className={styles['main']}>
        <div className={styles['messages']}>
          <>
            {isNoMessages && (
              <SystemMessageForm
                value={systemMessage}
                onChange={handleSystemMessageChange}
                onSendRequest={handleSystemMessageSendRequest}
              />
            )}
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
