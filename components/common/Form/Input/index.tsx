import { ComponentProps, forwardRef } from 'react'
import styles from './styles.module.scss'

type InputProps = ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[styles['input'], className].join(' ')}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
