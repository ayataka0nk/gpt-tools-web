import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from './styles.module.scss'
import {
  PatchConversationParams,
  patchConversation,
} from '../../../../services/conversation/patchConversation'
import { useState } from 'react'
import { QueryKeys } from '../QueryKeys'
import { Input } from '../../../common/Form/Input'
import { EditIcon } from '../../../common/Icons/EditIcon'
import { Button } from '../../../common/Button'
import { ConfirmIcon } from '../../../common/Icons/ConfirmIcon'
import { CloseIcon } from '../../../common/Icons/CloseIcon'

type Props = {
  conversationId: number
  title?: string
}

export const ConversationTitle = ({ conversationId, title }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [titleForm, setTitleForm] = useState(title || 'No Title')
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (params: PatchConversationParams) => patchConversation(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.conversation(conversationId))
      },
    }
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleForm(e.target.value)
  }
  const handleEditClick = () => {
    setIsEditing(true)
  }
  const handleCloseClick = () => {
    setIsEditing(false)
    setTitleForm(title || '')
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await mutation.mutateAsync({
      conversationId: conversationId,
      title: titleForm,
    })
    setIsEditing(false)
  }
  if (isEditing) {
    return (
      <form className={styles['conversation-title']} onSubmit={handleSubmit}>
        <Input value={titleForm} onChange={handleChange} />
        <Button variant="none" type="submit">
          <ConfirmIcon className={styles['icon']} />
        </Button>
        <Button variant="none" type="button" onClick={handleCloseClick}>
          <CloseIcon className={styles['icon']} />
        </Button>
      </form>
    )
  } else {
    return (
      <div className={styles['conversation-title']}>
        <h1 className={styles['h1']}>{title ?? 'No Title'}</h1>
        <Button variant="none" onClick={handleEditClick}>
          <EditIcon className={styles['icon']} />
        </Button>
      </div>
    )
  }
}
