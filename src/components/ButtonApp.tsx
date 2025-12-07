import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps
} from 'react-native'

import { PlusIcon, EraserIcon } from 'phosphor-react-native'

import { theme } from '@/src/theme/theme'

import { Loading } from '@/src/components/Loading'
import { TextApp } from '@/src/components/TextApp'

type IconType = 'plus' | 'eraser'

type ButtonProps = Readonly<{
  text?: string
  type: 'green' | 'gray' | 'black'
  iconLeft?: IconType
  iconRight?: IconType
  isLoading?: boolean
  buttonProps?: TouchableOpacityProps
}>
export function ButtonApp({
  text,
  type,
  iconLeft,
  iconRight,
  isLoading = false,
  buttonProps
}: ButtonProps) {
  const { style, ...restButtonProps } = buttonProps || {}

  const bgColor = {
    green: theme.COLORS.GREEN[600],
    gray: theme.COLORS.STONE[200],
    black: theme.COLORS.STONE[950]
  }
  const textColor = {
    green: theme.COLORS.STONE[50],
    gray: theme.COLORS.STONE[800],
    black: theme.COLORS.STONE[50]
  }

  const Icon = {
    plus: <PlusIcon weight="regular" size={16} color={textColor[type]} />,
    eraser: <EraserIcon weight="regular" size={16} color={textColor[type]} />
  } as const

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor[type],
          opacity: isLoading ? 0.7 : 1
        },
        style
      ]}
      disabled={isLoading}
      {...restButtonProps}
    >
      {isLoading ? (
        <Loading color={textColor[type]} />
      ) : (
        <>
          {iconLeft && Icon[iconLeft]}

          {text && (
            <TextApp
              style={[
                styles.text,
                {
                  color: textColor[type]
                }
              ]}
            >
              {text}
            </TextApp>
          )}

          {iconRight && Icon[iconRight]}
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 4
  },
  text: {
    fontFamily: theme.FONTS.ROBOTO_BOLD,
    fontSize: theme.FONTS.SIZE.SM
  }
} as const)
