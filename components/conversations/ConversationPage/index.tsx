import styles from './styles.module.scss'
import { MessageBlock } from './MessageBlock'
import { ConversationSettingForm } from './ConversationSettingForm'
import { useConversationPageHooks } from './useConversationPageHooks'
import { useConversationPageQueries } from './useConversationPageQueries'
import { ConversationTitle } from './ConversationTitle'
import { useConversationState } from './useConversationState'
import { useMessagesAutoScroll } from './useMessagesAutoScroll'
import { UserMessageForm } from './UserMessageForm'
import { ConversationSettingBlock } from './ConversationSettingBlock'

type ConversationPageProps = {
  conversationId: number
}

export const ConversationPage = ({ conversationId }: ConversationPageProps) => {
  const { conversation, conversationMessages, systemMessages } =
    useConversationPageQueries({ conversationId })

  const [state, dispatch] = useConversationState({
    conversationMessages: conversationMessages,
    modelType: conversation.modelType,
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
        </div>
      </header>
      <main className={styles['main']}>
        <div className={styles['messages']}>
          <>
            {isNoMessages && (
              <ConversationSettingForm
                systemMessage={systemMessage}
                modelType={state.modelType}
                dispatch={dispatch}
                onSendRequest={handleSystemMessageSendRequest}
              />
            )}

            {!isNoMessages && (
              <ConversationSettingBlock
                systemMessages={systemMessages}
                modelType={conversation.modelType}
              />
            )}

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
        </div>
      </main>
    </div>
  )
}
