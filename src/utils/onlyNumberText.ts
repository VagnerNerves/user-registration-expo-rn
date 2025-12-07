export function onlyNumberText(text: string) {
  return text ? text.replace(/\D/g, '') : ''
}
