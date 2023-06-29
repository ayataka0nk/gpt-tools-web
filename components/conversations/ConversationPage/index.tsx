import styles from './styles.module.scss'
import { MessageBlock } from './MessageBlock'
import { ConversationSettingForm } from './SystemMessageForm'
import { useConversationPageHooks } from './useConversationPageHooks'
import { useConversationPageQueries } from './useConversationPageQueries'
import { ConversationTitle } from './ConversationTitle'
import { useConversationState } from './useConversationState'
import { RoleType } from '../../../constants/RoleType'
import { useMessagesAutoScroll } from './useMessagesAutoScroll'
import { UserMessageForm } from './UserMessageForm'

type ConversationPageProps = {
  conversationId: number
}

export const ConversationPage = ({ conversationId }: ConversationPageProps) => {
  const { conversation, conversationMessages, systemMessages } =
    useConversationPageQueries({ conversationId })

  const [state, dispatch] = useConversationState({
    conversationMessages: conversationMessages,
  })

  const { isPending, systemMessage, messages, userMessage } = state

  const isNoMessages =
    messages.length === 0 && systemMessages.length === 0 && !isPending

  useMessagesAutoScroll({ userMessage: userMessage, messages: messages })

  const { sendMessage, sendSystemMessage } = useConversationPageHooks({
    conversationId: conversationId,
    state: state,
    dispatch: dispatch,
  })

  const handleUserMessageChange = (value: string) => {
    dispatch({
      type: 'changeUserMessage',
      payload: { userMessage: value },
    })
  }

  const handleSystemMessageChange = (value: string) => {
    dispatch({
      type: 'changeSystemMessage',
      payload: { systemMessage: value },
    })
  }
  const handleUserMessageSendRequest = () => {
    sendMessage()
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
          {/* <LLMModel modelType={conversation.modelType} /> */}
        </div>
      </header>
      <main className={styles['main']}>
        <div className={styles['messages']}>
          <>
            {isNoMessages && (
              <ConversationSettingForm
                value={systemMessage}
                onChange={handleSystemMessageChange}
                onSendRequest={handleSystemMessageSendRequest}
              />
            )}
            {systemMessages.map((message, index) => (
              <MessageBlock key={index} role={RoleType.SYSTEM} {...message} />
            ))}

            {messages.map((message, index) => (
              <MessageBlock key={index} {...message} />
            ))}
          </>
        </div>
        <div className={styles['form-block']}>
          <UserMessageForm
            value={userMessage}
            onChange={handleUserMessageChange}
            onSendRequest={handleUserMessageSendRequest}
          />
          {/* <form className={styles['form']} onSubmit={handleSubmit}>
            <Textarea
              className={styles['text-area']}
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <button className={styles['button']} disabled={isPending}>
              送信
            </button>
          </form> */}
        </div>
      </main>
    </div>
  )
}
