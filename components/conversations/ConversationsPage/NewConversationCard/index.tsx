import { ComponentProps } from 'react'
import styles from './styles.module.scss'

type NewConversationCardProps = ComponentProps<'button'>

export const NewConversationCard = ({
  className,
  ...props
}: NewConversationCardProps) => {
  return (
    <button
      className={[styles['new-conversation-card'], className].join(' ')}
      {...props}
    >
      新しい会話を開始する
    </button>
  )
}
