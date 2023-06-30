import { ComponentProps } from 'react'
import styles from './styles.module.scss'

type Props = ComponentProps<'select'>

export const Select = ({ className, ...props }: Props) => {
  return (
    <select className={[className, styles['select']].join(' ')} {...props} />
  )
}
