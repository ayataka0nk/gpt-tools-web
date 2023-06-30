export class LLMModelType {
  public static GPT3p5 = new LLMModelType(1, 'GPT-3.5')
  public static GPT4 = new LLMModelType(2, 'GPT-4')
  public readonly id: number
  public readonly name: string

  public constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  public static values() {
    return [this.GPT3p5, this.GPT4]
  }

  public static valueOf(id: number) {
    if (id === this.GPT3p5.id) {
      return this.GPT3p5
    } else if (id === this.GPT4.id) {
      return this.GPT4
    } else {
      throw new Error(`LLMModelType: ${id} is not a valid type`)
    }
  }

  public equals(other: LLMModelType) {
    return this.id === other.id
  }

  public toString() {
    return {
      id: this.id,
      name: this.name,
    }.toString()
  }
}
