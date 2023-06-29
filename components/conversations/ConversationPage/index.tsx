import styles from './styles.module.scss'
import { FormEventHandler } from 'react'
import { MessageBlock } from './MessageBlock'
import { Textarea } from '../../common/Form/TextArea'
import { ConversationSettingForm } from './SystemMessageForm'
import { useConversationPageHooks } from './useConversationPageHooks'
import { useConversationPageQueries } from './useConversationPageQueries'
import { ConversationTitle } from './ConversationTitle'
import { useConversationState } from './useConversationState'
import { RoleType } from '../../../constants/RoleType'
import { useMessagesAutoScroll } from './useMessagesAutoScroll'

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
    state.messages.length === 0 &&
    systemMessages.length === 0 &&
    !state.isPending

  useMessagesAutoScroll({ userMessage: userMessage, messages: messages })

  const { sendMessage, sendSystemMessage } = useConversationPageHooks({
    conversationId: conversationId,
    state: state,
    dispatch: dispatch,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'changeUserMessage',
      payload: { userMessage: e.target.value },
    })
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSystemMessageChange = (value: string) => {
    dispatch({
      type: 'changeSystemMessage',
      payload: { systemMessage: value },
    })
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
