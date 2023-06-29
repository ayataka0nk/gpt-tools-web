import { forwardRef } from 'react'
import styles from './styles.module.scss'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

type TextareaProps = TextareaAutosizeProps

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        ref={ref}
        className={[styles['textarea'], className].join(' ')}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
