import { useQueries } from '@tanstack/react-query'
import { getConversation } from '../../../services/conversation/getConversation'
import { getConversationMessages } from '../../../services/conversation/getConversationMessages'
import { getSystemMessages } from '../../../services/conversation/getSystemMessage'
import { QueryKeys } from './QueryKeys'

type ConversationPageQueriresProps = {
  conversationId: number
}
export const useConversationPageQueries = ({
  conversationId,
}: ConversationPageQueriresProps) => {
  const [conversationQuery, conversationMessagesQuery, systemMessagesQuery] =
    useQueries({
      queries: [
        {
          queryKey: QueryKeys.conversation(conversationId),
          queryFn: () => getConversation({ conversationId }),
        },
        {
          queryKey: QueryKeys.conversationMessages(conversationId),
          queryFn: () => getConversationMessages({ conversationId }),
        },
        {
          queryKey: QueryKeys.systemMessages(conversationId),
          queryFn: () => getSystemMessages({ conversationId }),
        },
      ],
    })

  if (
    typeof conversationMessagesQuery.data === 'undefined' ||
    typeof conversationQuery.data === 'undefined' ||
    typeof systemMessagesQuery.data === 'undefined'
  ) {
    throw new Error('conversationQuery.data is undefined')
  }
  return {
    conversation: conversationQuery.data,
    conversationMessages: conversationMessagesQuery.data,
    systemMessages: systemMessagesQuery.data,
  }
}
