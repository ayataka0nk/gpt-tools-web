import { useQuery } from '@tanstack/react-query'
import { getConversations } from '../../../services/conversation/getConversations'
import styles from './styles.module.scss'
import { ConversationCard } from './ConversationCard'

export const ConversationsPage = () => {
  const conversationsQuery = useQuery(['/conversations'], () =>
    getConversations()
  )
  if (typeof conversationsQuery.data === 'undefined') {
    throw new Error('conversationsQuery.data is undefined')
  }
  return (
    <div>
      <h1>Conversations Page</h1>
      <div className={styles['cards']}>
        {conversationsQuery.data.map((conversation) => (
          <ConversationCard
            key={conversation.conversationId}
            {...conversation}
          />
        ))}
      </div>
    </div>
  )
}
