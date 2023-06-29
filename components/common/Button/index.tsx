import { ComponentProps } from 'react'
import styles from './styles.module.scss'

export type ButtonVariant = 'primary' | 'none'
type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
}
export const Button = ({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={[
        styles['button'],
        styles[`button-${variant}`],
        className,
      ].join(' ')}
      {...props}
    >
      {props.children}
    </button>
  )
}
