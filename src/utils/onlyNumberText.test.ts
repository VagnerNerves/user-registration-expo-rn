import { onlyNumberText } from '@/src/utils/onlyNumberText'

describe('Utils: onlyNumberText', () => {
  it('should be return only number text', () => {
    const onlyNumber = onlyNumberText('125ABC58!@#')

    expect(onlyNumber).toBe('12558')
  })

  it('should be unformatted cep', () => {
    const empty = onlyNumberText('')

    expect(empty).toBe('')
  })
})
