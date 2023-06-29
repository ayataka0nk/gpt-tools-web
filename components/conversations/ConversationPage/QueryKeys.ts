export const QueryKeys = {
  conversation: (conversationId: number) => ['/conversation', conversationId],
  conversationMessages: (conversationId: number) => [
    '/conversation/messages',
    conversationId,
  ],
  systemMessages: (conversationId: number) => [
    '/conversation/system-messages',
    conversationId,
  ],
}
