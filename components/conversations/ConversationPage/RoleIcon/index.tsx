import { RoleType } from '../../../../constants/RoleType'
import styles from './styles.module.scss'
import { AssistantIcon } from '../../../common/Icons/AssistantIcon'
import { UserIcon } from '../../../common/Icons/UserIcon'
import { SystemIcon } from '../../../common/Icons/SystemIcon'

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
      <SystemIcon
        className={[styles['icon'], styles['system-icon']].join(' ')}
      />
    )
  } else {
    throw new Error('Invalid role')
  }
}
