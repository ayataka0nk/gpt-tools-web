import { FC, memo } from 'react'
import ReactMarkdownBase, { Options } from 'react-markdown'

export const ReactMarkdown: FC<Options> = memo(
  ReactMarkdownBase,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)
