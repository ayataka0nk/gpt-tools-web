import { MarkdownMessageBlock } from '../MarkdownMessageBlock'
import styles from './styles.module.scss'
import { RoleIcon } from '../RoleIcon'
import { SystemMessage } from '../../../../services/conversation/getSystemMessage'
import { LLMModelType } from '../../../../constants/LLMModelType'

export type ConversationSettingBlockProps = {
  systemMessages: SystemMessage[]
  modelType: number
}

export const ConversationSettingBlock = ({
  systemMessages,
  modelType,
}: ConversationSettingBlockProps) => {
  return (
    <>
      <div className={[styles['message-block-wrapper']].join(' ')}>
        <div className={styles['message-block']}>
          <RoleIcon role={1} />
          <div>
            <div>
              <p>Model: {LLMModelType.valueOf(modelType).name}</p>
            </div>
            {systemMessages.map((message) => (
              <MarkdownMessageBlock
                key={message.conversationMessageId}
                message={message.content}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
