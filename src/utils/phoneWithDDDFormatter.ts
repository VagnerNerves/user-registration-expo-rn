import { onlyNumberText } from '@/src/utils/onlyNumberText'

export function formatPhoneWithDDD(text: string) {
  const onlyNumber = onlyNumberText(text)

  if (onlyNumber.length === 0) return ''
  if (onlyNumber.length === 1) return `(${onlyNumber}`
  if (onlyNumber.length === 2) return `(${onlyNumber}`

  const totDigits = onlyNumber.length <= 10 ? 4 : 5
  const regexTotDigits = new RegExp(`(\\d{${totDigits}})(\\d)`)

  const formatted = onlyNumber
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(regexTotDigits, '$1-$2')
    .slice(0, 15)

  return formatted
}

export function unformatPhoneWithDDD(text: string) {
  return onlyNumberText(text).slice(0, 11)
}
