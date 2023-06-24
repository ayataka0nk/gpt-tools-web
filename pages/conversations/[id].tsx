import { NextPage } from 'next'
import { ConversationPage } from '../../components/conversations/ConversationPage'
import { useRouter } from 'next/router'

const Conversation: NextPage = () => {
  const router = useRouter()
  const id = Number(router.query.id)
  return <ConversationPage conversationId={id} />
}

export default Conversation
