import { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Toast from 'react-native-toast-message'

import { StatusBar } from 'expo-status-bar'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useCep } from '@/src/hooks/useCep'
import { useLocation } from '@/src/hooks/useLocation'
import { useKeyboardStatus } from '@/src/hooks/useKeyboardStatus'

import { theme } from '@/src/theme/theme'

import { onlyNumberText } from '@/src/utils/onlyNumberText'

import { TextApp } from '@/src/components/TextApp'
import { Input } from '@/src/components/Input'
import { ButtonApp } from '@/src/components/ButtonApp'
import { ModalOptions } from '../components/ModalOptions'

const userRegisterSchema = z.object({
  name: z
    .string({ error: 'Informe o nome completo.' })
    .trim()
    .min(4, 'O nome deve ter no mínimo 4 caracteres.'),
  email: z
    .email({
      error: iss =>
        iss.input && iss.input !== '' ? 'E-mail inválido.' : 'Informe o email.'
    })
    .trim(),
  password: z
    .string({ error: 'Informe a senha.' })
    .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
  phone: z
    .string({ error: 'Informe o telefone.' })
    .optional()
    .refine(
      value => !value || (value.length >= 10 && value.length <= 11),
      'Informe o telefone.'
    ),
  cep: z.string({ error: 'Informe o CEP.' }).length(8, 'Informe o CEP.').trim(),
  street: z
    .string({ error: 'Informe o logradouro/rua.' })
    .min(1, { error: 'Informe o logradouro/rua.' })
    .trim(),
  number: z.number({ error: 'Informe o número.' }).min(1, 'Informe o número.'),
  complement: z.string().optional(),
  neighborhood: z
    .string({ error: 'Informe o bairro.' })
    .min(1, { error: 'Informe o bairro.' }),
  city: z
    .string({ error: 'Informe a cidade.' })
    .min(1, { error: 'Informe a cidade.' }),
  state: z
    .string({ error: 'Informe o estado/uf.' })
    .min(1, { error: 'Informe o estado/uf.' })
})

type FormDataProps = z.infer<typeof userRegisterSchema>

export default function Index() {
  const [
    isOpenModalConfirmationClearForm,
    setIsOpenModalConfirmationClearForm
  ] = useState<boolean>(false)
  const [
    isOpenModalConfirmationRegisterUser,
    setIsOpenModalConfirmationRegisterUser
  ] = useState<boolean>(false)

  const insets = useSafeAreaInsets()

  const { control, handleSubmit, reset, watch, setValue, getValues } =
    useForm<FormDataProps>({
      resolver: zodResolver(userRegisterSchema)
    })

  const { searchDataCep, loadingSearchDataCep, errorSearchCep } = useCep()

  const { getLocation, loadingLocation } = useLocation()

  const { keyboardOpen } = useKeyboardStatus()

  const cepWatchForm = watch('cep')

  function handleRegisterUser() {
    const dataForm = getValues()

    console.log('cadastrou', dataForm)

    // reset()

    Toast.show({
      type: 'success',
      text1: 'Usuário cadastrado com sucesso!'
    })

    setIsOpenModalConfirmationRegisterUser(false)
  }

  function handleEraseForm() {
    reset()
    setIsOpenModalConfirmationClearForm(false)
  }

  async function getDataCep(cep: string) {
    try {
      const dataCep = await searchDataCep(cep)

      if (!dataCep) {
        Toast.show({
          type: 'error',
          text1: 'CEP inválido ou não encontrado'
        })

        return
      }

      setValue('street', dataCep.logradouro, { shouldValidate: true })
      setValue('neighborhood', dataCep.bairro, { shouldValidate: true })
      setValue('city', dataCep.localidade, { shouldValidate: true })
      setValue('state', dataCep.uf, { shouldValidate: true })
    } catch (error) {
      console.log(error)

      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar o CEP. Tente novamente.'
      })
    }
  }

  async function handleGetLocation() {
    try {
      const result = await getLocation()

      if (!result) return

      const { street, district, city, region, postalCode } = result.address

      const cep = postalCode ? onlyNumberText(postalCode) : ''

      setValue('street', street ?? '', { shouldValidate: true })
      setValue('neighborhood', district ?? '', { shouldValidate: true })
      setValue('city', city ?? '', { shouldValidate: true })
      setValue('state', region ?? '', { shouldValidate: true })
      setValue('cep', cep, { shouldValidate: true })
    } catch (error) {
      console.log(error)

      Toast.show({
        type: 'error',
        text1: 'Erro ao obter a localização. Tente novamente.'
      })
    }
  }

  useEffect(() => {
    const cepOnlyNumbers = onlyNumberText(cepWatchForm)

    if (cepOnlyNumbers?.length === 8) {
      getDataCep(cepOnlyNumbers)
    }
  }, [cepWatchForm])

  return (
    <>
      <StatusBar style="dark" translucent />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1
        }}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.header,
              {
                paddingTop: insets.top + 20
              }
            ]}
          >
            <TextApp style={styles.titleHeader}>Cadastro de Usuário</TextApp>
          </View>

          <View style={styles.containerForm}>
            <ScrollView
              contentContainerStyle={styles.containerFormScrollView}
              keyboardShouldPersistTaps="always"
            >
              <View style={styles.containerFormGroup}>
                <TextApp style={styles.titleFormGroup}>Dados Pessoais</TextApp>

                <Controller
                  name="name"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Nome Completo*"
                      inputProps={{
                        placeholder: 'Ex. João Silva',
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="E-mail*"
                      inputProps={{
                        placeholder: 'Ex. joaosilva@gmail.com',
                        keyboardType: 'email-address',
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Senha*"
                      type="password"
                      inputProps={{
                        placeholder: '******',
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Telefone"
                      mask="phone"
                      inputProps={{
                        placeholder: '(99) 99999-9999',
                        keyboardType: 'numeric',
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />
              </View>

              <View
                style={styles.containerFormGroup}
                pointerEvents={
                  loadingSearchDataCep || loadingLocation ? 'none' : 'auto'
                }
              >
                <TextApp style={styles.titleFormGroup}>Endereço</TextApp>

                <ButtonApp
                  text="Usar minha localização"
                  type="gray"
                  iconLeft="mapPin"
                  buttonProps={{
                    onPress: handleGetLocation
                  }}
                  isLoading={loadingLocation}
                />

                <Controller
                  name="cep"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => {
                    const messageErrorSearchCep = errorSearchCep
                      ? 'CEP inválido ou não encontrado'
                      : null
                    const errorMessage = error?.message || messageErrorSearchCep

                    return (
                      <Input
                        label="CEP*"
                        mask="cep"
                        loading={loadingSearchDataCep}
                        inputProps={{
                          placeholder: '99999-999',
                          keyboardType: 'numeric',
                          onBlur,
                          onChangeText: onChange,
                          value
                        }}
                        errorMessage={errorMessage}
                      />
                    )
                  }}
                />

                <Controller
                  name="street"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Logradouro/Rua"
                      inputProps={{
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="number"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Número*"
                      mask="onlyNumberText"
                      inputProps={{
                        keyboardType: 'numeric',
                        onBlur,
                        onChangeText: text => onChange(Number(text)),
                        value: value ? String(value) : undefined
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="complement"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Complemento"
                      inputProps={{
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="neighborhood"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Bairro"
                      inputProps={{
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="city"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Cidade"
                      inputProps={{
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />

                <Controller
                  name="state"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Estado/UF"
                      inputProps={{
                        onBlur,
                        onChangeText: onChange,
                        value
                      }}
                      errorMessage={error?.message}
                    />
                  )}
                />
              </View>
            </ScrollView>
          </View>

          <View
            style={[
              styles.containerFooterButtons,
              {
                paddingBottom:
                  !keyboardOpen && Platform.OS === 'ios'
                    ? insets.bottom + 16
                    : 16
              }
            ]}
          >
            <ButtonApp
              text="Limpar"
              type="gray"
              iconLeft="eraser"
              buttonProps={{
                style: { flex: 1 },
                onPress: () => setIsOpenModalConfirmationClearForm(true)
              }}
            />
            <ButtonApp
              text="Cadastrar"
              type="green"
              iconLeft="plus"
              buttonProps={{
                style: { flex: 1 },
                onPress: handleSubmit(() => {
                  if (errorSearchCep) {
                    return
                  }

                  setIsOpenModalConfirmationRegisterUser(true)
                })
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <ModalOptions
        isVisible={isOpenModalConfirmationClearForm}
        title="Deseja realmente limpar os dados?"
        textButtonOK="Sim, limpar"
        onOK={handleEraseForm}
        textButtonCancel="Cancelar"
        onCancel={() => setIsOpenModalConfirmationClearForm(false)}
      />

      <ModalOptions
        isVisible={isOpenModalConfirmationRegisterUser}
        title="Deseja realmente cadastrar o usuário?"
        textButtonOK="Sim, cadastrar"
        onOK={handleRegisterUser}
        textButtonCancel="Cancelar"
        onCancel={() => setIsOpenModalConfirmationRegisterUser(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.COLORS.STONE[50] },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 20 + 16,
    backgroundColor: theme.COLORS.GREEN[600]
  },
  titleHeader: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    color: theme.COLORS.STONE[50]
  },
  containerForm: {
    flex: 1,
    marginTop: -16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,

    backgroundColor: theme.COLORS.STONE[50]
  },
  containerFormScrollView: {
    flexGrow: 1,
    padding: 16,
    gap: 32
  },
  containerFormGroup: {
    width: '100%',
    gap: 16
  },
  titleFormGroup: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold'
  },
  containerFooterButtons: {
    flexDirection: 'row',
    gap: 8,
    padding: 16
  }
} as const)
