import { MarkdownMessageBlock } from '../MarkdownMessageBlock'

export type Message = {
  role: number
  content: string
}

export type MessageBlockProps = Message

export const MessageBlock = ({ role, content }: MessageBlockProps) => {
  return (
    <div>
      <div>{role}</div>
      <div>
        <MarkdownMessageBlock message={content} />
      </div>
    </div>
  )
}
