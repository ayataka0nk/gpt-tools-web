export const isEmpty = (value: string) => {
  return value.replaceAll(/\n/g, '').replaceAll(' ', '') === ''
}
