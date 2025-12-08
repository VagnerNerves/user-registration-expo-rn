import {
  formatPhoneWithDDD,
  unformatPhoneWithDDD
} from '@/src/utils/phoneWithDDDFormatter'

describe('Utils: phoneWithDDDFormatter', () => {
  it('should be formatted phone with DDD', () => {
    const formattedCEP = formatPhoneWithDDD('5130202201')

    expect(formattedCEP).toBe('(51) 3020-2201')
  })

  it('should be formatted cel phone with DDD', () => {
    const formattedCEP = formatPhoneWithDDD('51991092600')

    expect(formattedCEP).toBe('(51) 99109-2600')
  })

  it('should be formatted cel phone with DDD without number', () => {
    const formattedCEP = formatPhoneWithDDD('')

    expect(formattedCEP).toBe('')
  })

  it('should be formatted cel phone with DDD one number', () => {
    const formattedCEP = formatPhoneWithDDD('5')

    expect(formattedCEP).toBe('(5')
  })

  it('should be formatted cel phone with DDD two number', () => {
    const formattedCEP = formatPhoneWithDDD('51')

    expect(formattedCEP).toBe('(51')
  })

  it('should be unformatted cel phone with DDD', () => {
    const formattedCEP = unformatPhoneWithDDD('(51) 99109-2600')

    expect(formattedCEP).toBe('51991092600')
  })
})
