import { FormEventHandler, useCallback } from 'react'
import { Textarea } from '../../../common/Form/TextArea'
import styles from './styles.module.scss'
import { SendIcon } from '../../../common/Icons/SendIcon'

type UserMessageFormProps = {
  value: string
  onChange: (value: string) => void
  onSendRequest: () => void
}

export const UserMessageForm = ({
  value,
  onChange,
  onSendRequest,
}: UserMessageFormProps) => {
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
    <form className={styles['message-form-wrapper']} onSubmit={handleSubmit}>
      <div className={styles['message-form']}>
        <div className={styles['textarea-wrapper']}>
          <Textarea
            className={styles['textarea']}
            placeholder="Send a message"
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
