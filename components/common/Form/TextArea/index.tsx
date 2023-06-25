import styles from './styles.module.scss'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

type TextareaProps = TextareaAutosizeProps

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <TextareaAutosize
      className={[styles['textarea'], className].join(' ')}
      {...props}
    />
  )
}
