import axios from 'axios'

type DataCepReturn =
  | {
      cep: string
      logradouro: string
      complemento: string
      bairro: string
      localidade: string
      uf: string
      estado: string
    }
  | {
      erro: string
    }

export async function getCep(cep: string) {
  const { data } = await axios.get<DataCepReturn>(
    `https://viacep.com.br/ws/${cep}/json/`
  )

  return data
}
