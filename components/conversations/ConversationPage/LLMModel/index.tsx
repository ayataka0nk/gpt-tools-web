import { LLMModelType } from '../../../../constants/LLMModelType'

type Props = {
  modelType: number
}
export const LLMModel = ({ modelType }: Props) => {
  return <div>{LLMModelType.valueOf(modelType)} </div>
}
