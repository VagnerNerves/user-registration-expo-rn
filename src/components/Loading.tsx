import {
  View,
  ActivityIndicator,
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
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      {...viewProps}
    >
      <ActivityIndicator color={color} />
    </View>
  )
}
