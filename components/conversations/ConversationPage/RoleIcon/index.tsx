import Image from 'next/image'
import { RoleType } from '../../../../constants/RoleType'
import styles from './styles.module.scss'
import { AssistantIcon } from '../../../common/Icons/AssistantIcon'
import { UserIcon } from '../../../common/Icons/UserIcon'

type RoleIconProps = {
  role: number
}
export const RoleIcon = ({ role }: RoleIconProps) => {
  if (role === RoleType.USER) {
    return (
      <UserIcon className={[styles['icon'], styles['user-icon']].join(' ')} />
    )
  } else if (role === RoleType.ASSISTANT) {
    return (
      <AssistantIcon
        className={[styles['icon'], styles['assistant-icon']].join(' ')}
      />
    )
  } else if (role === RoleType.SYSTEM) {
    return (
      <Image
        src="/images/assistant-icon.svg"
        width="40"
        height="40"
        alt="system"
      />
    )
  } else {
    throw new Error('Invalid role')
  }
}
