import { Dispatch, FormEventHandler, useCallback } from 'react'
import { Textarea } from '../../../common/Form/TextArea'
import styles from './styles.module.scss'
import { RoleIcon } from '../RoleIcon'
import { ConversationAction } from '../useConversationState'
import { LLMModelType } from '../../../../constants/LLMModelType'
import { Select } from '../../../common/Form/Select'
import { Button } from '../../../common/Button'
import { ConfirmIcon } from '../../../common/Icons/ConfirmIcon'
import { CloseIcon } from '../../../common/Icons/CloseIcon'

type ConversationSettingFormProps = {
  systemMessage: string
  modelType: number
  dispatch: Dispatch<ConversationAction>
  onSendRequest: () => void
}

export const ConversationSettingForm = ({
  systemMessage,
  modelType,
  dispatch,
  onSendRequest,
}: ConversationSettingFormProps) => {
  // 親コンポーネントで別経路でのシステムメッセージ更新をするので、その辺の制御も親に任せる。
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({
        type: 'changeSystemMessage',
        payload: { systemMessage: e.target.value },
      })
    },
    [dispatch]
  )

  const handleModelTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: 'changeModelType',
        payload: { modelType: Number(e.target.value) },
      })
    },
    [dispatch]
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      onSendRequest()
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
          <Select
            className={styles['llm-select']}
            value={modelType}
            onChange={handleModelTypeChange}
          >
            {LLMModelType.values().map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </Select>
          <Textarea
            className={styles['textarea']}
            placeholder="Send a system message"
            value={systemMessage}
            onChange={handleChange}
          />
          <div className={styles['buttons']}>
            <Button variant="none" type="submit">
              <ConfirmIcon className={styles['confirm-icon']} />
            </Button>
            <Button variant="none" type="button">
              <CloseIcon className={styles['cancel-icon']} />
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
