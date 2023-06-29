import { useEffect, useState } from 'react'
import { Message } from './MessageBlock'

export const useMessagesAutoScroll = ({
  userMessage,
  messages,
}: {
  userMessage: string
  messages: Message[]
}) => {
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      if (scrollPos === scrollHeight) {
        setAtBottom(true)
      } else {
        setAtBottom(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, document.documentElement.scrollHeight)
  }, [])

  useEffect(() => {
    if (atBottom) {
      window.scrollTo(0, document.documentElement.scrollHeight)
    }
    // メッセージ履歴変更時、ユーザメッセージ変更時に自動スクロールする
  }, [atBottom, messages, userMessage])
}
