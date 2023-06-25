import { ReactMarkdown } from '../../../common/ReactMarkdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '../CodeBlock'

type MarkdownMessageBlockProps = {
  message: string
}
export const MarkdownMessageBlock = ({
  message,
}: MarkdownMessageBlockProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return <span>▍</span>
            }

            children[0] = (children[0] as string).replace('`▍`', '▍')
          }

          const match = /language-(\w+)/.exec(className || '')

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ''}
              code={String(children).replace(/\n$/, '')}
              {...props}
            />
          )
        },
      }}
    >
      {message}
    </ReactMarkdown>
  )
}
