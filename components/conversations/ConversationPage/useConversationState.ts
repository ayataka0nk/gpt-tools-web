import { useReducer } from 'react'
import { ConversationMessage } from '../../../services/conversation/getConversationMessages'
import { Message } from './MessageBlock'
import { RoleType } from '../../../constants/RoleType'

export type ConversationState = {
  isPending: boolean
  userMessage: string
  systemMessage: string
  messages: Message[]
}
export type ConversationAction =
  | {
      type: 'changeUserMessage'
      payload: { userMessage: string }
    }
  | {
      type: 'changeSystemMessage'
      payload: { systemMessage: string }
    }
  | {
      type: 'beforeSendUserMessage'
    }
  | {
      type: 'addAssistantMessageFragment'
      payload: { fragment: string }
    }
  | {
      type: 'afterSendUserMessage'
    }
  | {
      type: 'afterSendSystemMessage'
    }

type UseConversationStateProps = {
  conversationMessages: ConversationMessage[]
}

const reducer = (state: ConversationState, action: ConversationAction) => {
  if (action.type === 'changeUserMessage') {
    return { ...state, userMessage: action.payload.userMessage }
  } else if (action.type === 'changeSystemMessage') {
    return { ...state, systemMessage: action.payload.systemMessage }
  } else if (action.type === 'beforeSendUserMessage') {
    return {
      ...state,
      isPending: true,
      userMessage: '',
      messages: [
        ...state.messages,
        { role: RoleType.USER, content: state.userMessage },
        { role: RoleType.ASSISTANT, content: '' },
      ],
    }
  } else if (action.type === 'addAssistantMessageFragment') {
    return {
      ...state,
      messages: [
        ...state.messages.slice(0, state.messages.length - 1),
        {
          role: 2,
          content:
            state.messages[state.messages.length - 1].content +
            action.payload.fragment,
        },
      ],
    }
  } else if (action.type === 'afterSendUserMessage') {
    return {
      ...state,
      isPending: false,
    }
  } else if (action.type === 'afterSendSystemMessage') {
    return {
      ...state,
      systemMessage: '',
    }
  } else {
    throw new Error('Invalid action type')
  }
}

export const useConversationState = ({
  conversationMessages,
}: UseConversationStateProps) => {
  const initialState: ConversationState = {
    isPending: false,
    userMessage: '',
    systemMessage: '',
    messages: [
      ...conversationMessages.map((rec) => ({
        role: rec.roleType,
        content: rec.content,
      })),
    ],
  }
  return useReducer(reducer, initialState)
}
