import { Text, type TextProps } from 'react-native'

type TextAppProps = Readonly<TextProps>
export function TextApp({ children, style, ...rest }: TextAppProps) {
  return (
    <Text
      style={[
        { fontFamily: 'Roboto_400Regular', fontSize: 14, color: '#0c0a09' },
        style
      ]}
      {...rest}
    >
      {children}
    </Text>
  )
}
