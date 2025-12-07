import { StyleSheet, Text, type TextProps } from 'react-native'

import { theme } from '../theme/theme'

type TextAppProps = Readonly<TextProps>
export function TextApp({ children, style, ...rest }: TextAppProps) {
  return (
    <Text style={[styles.textDefault, style]} {...rest}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  textDefault: {
    fontFamily: theme.FONTS.ROBOTO_REGULAR,
    fontSize: theme.FONTS.SIZE.BASE,
    color: theme.COLORS.STONE[950]
  }
} as const)
