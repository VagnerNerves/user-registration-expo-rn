import {
  View,
  ActivityIndicator,
  StyleSheet,
  type ColorValue,
  type ViewProps
} from 'react-native'

import { theme } from '@/src/theme/theme'

type LoadingProps = Readonly<{
  color?: ColorValue
  viewProps?: ViewProps
}>
export function Loading({
  color = theme.COLORS.GREEN[500],
  viewProps
}: LoadingProps) {
  return (
    <View style={styles.container} {...viewProps}>
      <ActivityIndicator color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
} as const)
