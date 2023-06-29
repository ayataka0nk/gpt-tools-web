import { FormEventHandler, useCallback } from 'react'
import { Textarea } from '../../../common/Form/TextArea'
import styles from './styles.module.scss'
import { RoleIcon } from '../RoleIcon'
import { SendIcon } from '../../../common/Icons/SendIcon'

export type ConversationSettings = {
  systemMessage: string
  modelType: number
}
type ConversationSettingFormProps = {
  value: string
  onChange: (value: string) => void
  onSendRequest: () => void
}

export const ConversationSettingForm = ({
  value,
  onChange,
  onSendRequest,
}: ConversationSettingFormProps) => {
  // 親コンポーネントで別経路でのシステムメッセージ更新をするので、その辺の制御も親に任せる。
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      onSendRequest()
    },
    [onSendRequest]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onSendRequest()
      }
    },
    [onSendRequest]
  )

  return (
    <form
      className={styles['system-message-form-wrapper']}
      onSubmit={handleSubmit}
    >
      <div className={styles['system-message-form']}>
        <RoleIcon role={1} />
        <div className={styles['textarea-wrapper']}>
          <Textarea
            className={styles['textarea']}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className={styles['send-button']}>
            <SendIcon />
          </button>
        </div>
      </div>
    </form>
  )
}
