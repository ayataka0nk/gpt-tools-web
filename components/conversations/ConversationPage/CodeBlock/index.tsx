import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import styles from './styles.module.scss'

type CodeBlockProps = {
  code: string
  language: string
}

export const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <div className={styles['code-block']}>
      <div className={styles['language']}>{language}</div>
      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={coldarkDark}
        PreTag="div"
        customStyle={{
          padding: '10px',
          background: 'transparent',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
