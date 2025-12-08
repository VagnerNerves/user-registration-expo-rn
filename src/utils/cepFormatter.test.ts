import { formatCEP, unformatCEP } from '@/src/utils/cepFormatter'

describe('Utils: cepFormatter', () => {
  it('should be formatted cep', () => {
    const formattedCEP = formatCEP('94950460')

    expect(formattedCEP).toBe('94950-460')
  })

  it('should be unformatted cep', () => {
    const formattedCEP = unformatCEP('94950-460')

    expect(formattedCEP).toBe('94950460')
  })
})
