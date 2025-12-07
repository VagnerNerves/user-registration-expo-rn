import { useState } from 'react'

import {
  TextInput,
  type TextInputProps,
  View,
  TouchableOpacity,
  StyleSheet,
  type StyleProp,
  type ViewStyle
} from 'react-native'

import { EyeIcon, EyeSlashIcon, WarningCircleIcon } from 'phosphor-react-native'

import { theme } from '@/src/theme/theme'

import {
  formatPhoneWithDDD,
  unformatPhoneWithDDD
} from '@/src/utils/phoneWithDDDFormatter'
import { formatCEP, unformatCEP } from '@/src/utils/cepFormatter'

import { TextApp } from '@/src/components/TextApp'

type InputProps = Readonly<{
  type?: 'text' | 'password'
  label?: string
  mask?: 'phone' | 'cep'
  errorMessage?: string | null
  styleViewContainer?: StyleProp<ViewStyle>
  inputProps?: TextInputProps
}>

export function Input({
  type = 'text',
  label,
  mask,
  errorMessage = null,
  styleViewContainer,
  inputProps
}: InputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(
    type === 'password'
  )

  const [value, setValue] = useState<string | undefined>()

  const invalid = !!errorMessage

  function formattedValue(text: string | undefined) {
    if (!text) {
      return ''
    }

    switch (mask) {
      case 'phone': {
        return formatPhoneWithDDD(text)
      }

      case 'cep': {
        return formatCEP(text)
      }
    }

    return text
  }

  function unformattedValue(text: string | undefined) {
    if (!text) {
      return ''
    }

    switch (mask) {
      case 'phone': {
        return unformatPhoneWithDDD(text)
      }

      case 'cep': {
        return unformatCEP(text)
      }
    }

    return text
  }

  return (
    <View style={[styles.container, styleViewContainer]}>
      {label && <TextApp style={styles.label}>{label}</TextApp>}

      <View
        style={[
          styles.containerInput,
          {
            borderColor: invalid
              ? theme.COLORS.RED[500]
              : theme.COLORS.STONE[300]
          }
        ]}
      >
        <TextInput
          placeholderTextColor={theme.COLORS.STONE[600]}
          selectionColor={theme.COLORS.STONE[600]}
          secureTextEntry={isSecureTextEntry}
          {...inputProps}
          style={[
            styles.input,
            {
              paddingRight: type === 'text' ? 16 : 0
            },
            inputProps?.style
          ]}
          value={formattedValue(inputProps?.value ? inputProps.value : value)}
          onChangeText={text => {
            const formatted = unformattedValue(text)

            inputProps?.onChangeText && inputProps.onChangeText(formatted)
            setValue(formatted)
          }}
        />

        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setIsSecureTextEntry(prevState => !prevState)}
            style={styles.buttonPassword}
          >
            {isSecureTextEntry ? (
              <EyeIcon
                weight="regular"
                size={20}
                color={theme.COLORS.STONE[700]}
              />
            ) : (
              <EyeSlashIcon
                weight="regular"
                size={20}
                color={theme.COLORS.STONE[700]}
              />
            )}
          </TouchableOpacity>
        )}
      </View>

      {invalid && (
        <View style={styles.containerErrorMessage}>
          <WarningCircleIcon
            weight="regular"
            size={18}
            color={theme.COLORS.RED[500]}
          />

          <TextApp style={styles.textErrorMessage}>{errorMessage}</TextApp>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 4
  },
  label: {
    fontSize: theme.FONTS.SIZE.SM
  },
  containerInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.STONE[50],
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden'
  },
  input: {
    flex: 1,
    fontFamily: theme.FONTS.ROBOTO_REGULAR,
    fontSize: theme.FONTS.SIZE.BASE,
    color: theme.COLORS.STONE[950],
    backgroundColor: theme.COLORS.STONE[50],

    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16
  },
  buttonPassword: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 8
  },
  containerErrorMessage: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textErrorMessage: {
    flex: 1,
    fontSize: theme.FONTS.SIZE.SM,
    color: theme.COLORS.RED[500]
  }
} as const)
