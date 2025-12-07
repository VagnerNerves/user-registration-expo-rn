import 'react-native-reanimated'

import { useEffect } from 'react'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { SplashScreen, Stack } from 'expo-router'

import { StatusBar } from 'expo-status-bar'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { theme } from '@/src/theme/theme'

import { Loading } from '@/src/components/Loading'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  const themeProvider = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.COLORS.STONE[50]
    }
  } as const

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  return (
    <ThemeProvider value={themeProvider}>
      <StatusBar style="dark" translucent />

      {fontsLoaded ? (
        <Stack screenOptions={{ headerShown: false }} />
      ) : (
        <Loading />
      )}
    </ThemeProvider>
  )
}
