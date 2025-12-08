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

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Toast from 'react-native-toast-message'
import { toastConfig } from '@/src/config/toastConfig'

import { theme } from '@/src/theme/theme'

import { Loading } from '@/src/components/Loading'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  const insets = useSafeAreaInsets()

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

      <GestureHandlerRootView style={{ flex: 1 }}>
        {fontsLoaded ? (
          <Stack screenOptions={{ headerShown: false }} />
        ) : (
          <Loading />
        )}

        <Toast config={toastConfig} topOffset={insets.top + 10} />
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
