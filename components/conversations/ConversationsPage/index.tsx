import { useQuery } from '@tanstack/react-query'
import { getConversations } from '../../../services/conversation/getConversations'
import Link from 'next/link'
import styles from './styles.module.scss'

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
          <Link
            key={conversation.conversationId}
            className={styles['card']}
            href={`/conversations/${conversation.conversationId}`}
          >
            <div>id: {conversation.conversationId}</div>
            <div>title: {conversation.title}</div>
            <div>createdAt: {conversation.createdAt}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
