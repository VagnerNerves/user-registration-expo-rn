import { useState } from 'react'

import { onlyNumberText } from '@/src/utils/onlyNumberText'

import { getCep } from '@/src/services/cepService'

export function useCep() {
  const [loadingSearchDataCep, setLoadingSearchDataCep] = useState(false)
  const [errorSearchCep, setErrorSearchCep] = useState(false)

  async function searchDataCep(cep: string) {
    const cepOnlyNumber = onlyNumberText(cep)

    if (cepOnlyNumber.length !== 8) return

    try {
      setLoadingSearchDataCep(true)

      const data = await getCep(cepOnlyNumber)

      if ('erro' in data) {
        setErrorSearchCep(true)

        return null
      }

      setErrorSearchCep(false)
      return data
    } catch (error) {
      console.log(error)
      setErrorSearchCep(true)
    } finally {
      setLoadingSearchDataCep(false)
    }
  }

  return {
    loadingSearchDataCep,
    searchDataCep,
    errorSearchCep
  }
}
