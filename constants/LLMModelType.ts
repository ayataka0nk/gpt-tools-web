export const LLMModelType = Object.freeze({
  1: 'GPT-3.5',
  2: 'GPT-4',
  valueOf: (type: number): string => {
    for (const [key, value] of Object.entries(LLMModelType)) {
      if (typeof value === 'string' && Number(key) === type) {
        return value
      }
    }
    throw new Error(`LLMModelType: ${type} is not a valid type`)
  },
})
