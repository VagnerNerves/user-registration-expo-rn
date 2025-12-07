import { onlyNumberText } from '@/src/utils/onlyNumberText'

export function formatCEP(text: string) {
  const onlyNumber = onlyNumberText(text)

  const formatted = onlyNumber.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9)

  return formatted
}

export function unformatCEP(text: string) {
  return onlyNumberText(text).slice(0, 8)
}
