import { useMutation, useQuery } from '@tanstack/react-query'
import { getConversations } from '../../../services/conversation/getConversations'
import styles from './styles.module.scss'
import { ConversationCard } from './ConversationCard'
import { NewConversationCard } from './NewConversationCard'
import { postConversation } from '../../../services/conversation/postConversation'
import { useRouter } from 'next/router'

export const ConversationsPage = () => {
  const conversationsQuery = useQuery(['/conversations'], () =>
    getConversations()
  )
  const postConversationMutation = useMutation(() => postConversation())
  const router = useRouter()

  if (typeof conversationsQuery.data === 'undefined') {
    throw new Error('conversationsQuery.data is undefined')
  }

  const handleNewConversationClick = async () => {
    const result = await postConversationMutation.mutateAsync()
    router.push(`/conversations/${result.conversationId}`)
  }
  return (
    <div className={styles['conversations-page-wrapper']}>
      <div className={styles['conversations-page']}>
        <h1>Conversations</h1>
        <div className={styles['tools-section']}>
          <NewConversationCard
            className={styles['new-conversation-card']}
            onClick={handleNewConversationClick}
          />
        </div>
        <div className={styles['cards']}>
          {conversationsQuery.data.map((conversation) => (
            <ConversationCard
              key={conversation.conversationId}
              {...conversation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
