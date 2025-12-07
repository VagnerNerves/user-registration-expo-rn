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

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style="dark" translucent />

      {fontsLoaded ? <Stack screenOptions={{ headerShown: false }} /> : null}
    </ThemeProvider>
  )
}
