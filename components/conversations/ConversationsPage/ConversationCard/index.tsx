import Link from 'next/link'
import { Conversation } from '../../../../services/conversation/getConversation'
import styles from './styles.module.scss'

type ConversationCardProps = Conversation
export const ConversationCard = ({
  conversationId,
  title,
  createdAt,
}: ConversationCardProps) => {
  return (
    <Link className={styles['card']} href={`/conversations/${conversationId}`}>
      <p>{title ?? 'No Title'}</p>
      <p>{createdAt}</p>
    </Link>
  )
}
