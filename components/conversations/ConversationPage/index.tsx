import { useQuery } from '@tanstack/react-query'
import { getConversation } from '../../../services/conversation/getConversationMessages'

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
  const messages = conversationMessagesQuery.data

  return (
    <div>
      <h1>Conversation Page</h1>
      {messages.map((message) => (
        <div key={message.conversationMessageId}>
          <div>id: {message.conversationMessageId}</div>
          <div>content: {message.content}</div>
          <div>createdAt: {message.createdAt}</div>
        </div>
      ))}
    </div>
  )
}
