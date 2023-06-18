import { ComponentProps } from 'react'
import styles from './styles.module.scss'

export const Button = ({ className, ...props }: ComponentProps<'button'>) => {
  return (
    <button className={[styles['button'], className].join(' ')} {...props}>
      {props.children}
    </button>
  )
}
