import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {useFonts} from 'expo-font'
import {Stack} from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import {StatusBar} from 'expo-status-bar'
import {useEffect} from 'react'
import 'react-native-reanimated'
import '../global.css'
import {useColorScheme} from '@/hooks/useColorScheme'
import {SessionProvider} from '@/hooks/SessionContext' // 📌 Importa SessionProvider

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    Copperplate: require('../assets/fonts/Copperplate.otf'),
    MyriadPro: require('../assets/fonts/MyriadPro.otf'),
    MyriadProBold: require('../assets/fonts/MyriadProSemibold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null // or a loading indicator
  }

  return (
    <SessionProvider>
      {/* 📌 Envuelve la app con SessionProvider */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name='(tabs)'
            options={{headerShown: false}}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar
          style='auto'
          backgroundColor='#1D1D1B'
        />
      </ThemeProvider>
    </SessionProvider>
  )
}
