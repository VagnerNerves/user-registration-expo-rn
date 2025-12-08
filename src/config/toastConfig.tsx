import { View, StyleSheet } from 'react-native'

import type { ToastConfig } from 'react-native-toast-message'

import {
  WarningCircleIcon,
  InfoIcon,
  CheckCircleIcon
} from 'phosphor-react-native'

import { theme } from '@/src/theme/theme'

import { TextApp } from '@/src/components/TextApp'

export const toastConfig: ToastConfig = {
  success: ({ text1 }) => <ToastCard type="success" message={text1} />,
  error: ({ text1 }) => <ToastCard type="error" message={text1} />,
  info: ({ text1 }) => <ToastCard type="info" message={text1} />
}

type ToastCardProps = Readonly<{
  type: 'success' | 'error' | 'info'
  message: string | undefined
}>
function ToastCard({ type, message }: ToastCardProps) {
  const colorsCard = {
    success: theme.COLORS.GREEN[600],
    error: theme.COLORS.RED[600],
    info: theme.COLORS.STONE[600]
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorsCard[type]
        }
      ]}
    >
      {type === 'success' && (
        <CheckCircleIcon
          weight="fill"
          size={18}
          color={theme.COLORS.STONE[50]}
        />
      )}

      {type === 'error' && (
        <WarningCircleIcon
          weight="fill"
          size={18}
          color={theme.COLORS.STONE[50]}
        />
      )}

      {type === 'info' && (
        <InfoIcon weight="fill" size={18} color={theme.COLORS.STONE[50]} />
      )}

      <TextApp style={styles.text}>{message}</TextApp>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginRight: 24,
    padding: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4
  },
  text: {
    fontFamily: theme.FONTS.ROBOTO_BOLD,
    fontSize: theme.FONTS.SIZE.SM,
    color: theme.COLORS.STONE[50]
  }
} as const)
