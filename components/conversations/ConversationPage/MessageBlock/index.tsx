import { MarkdownMessageBlock } from '../MarkdownMessageBlock'
import styles from './styles.module.scss'

export type Message = {
  role: number
  content: string
}

export type MessageBlockProps = Message

export const MessageBlock = ({ role, content }: MessageBlockProps) => {
  return (
    <div
      className={[
        styles['message-block-wrapper'],
        styles[`message-block-wrapper-role-${role}`],
      ].join(' ')}
    >
      <div className={styles['message-block']}>
        <div>{role}</div>
        <div>
          <MarkdownMessageBlock message={content} />
        </div>
      </div>
    </div>
  )
}
