import React, {useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native'
import {Settingsicon} from '@/components/ui/Bottomnav/Icons'
import ButtonImage from '@/components/ui/ButtonImage'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Settingsbutton = () => {
  return (
    <AnimatedTouchableOpacity
      entering={FadeInDown.delay(300).duration(500)}
      className='flex items-center justify-center mt-10 h-12 w-12 rounded-xl bg-[#518893] border-4 border-[#6CB0B4]'>
      <Settingsicon size={22} />
    </AnimatedTouchableOpacity>
  )
}

export default function Home() {
  const {width} = useWindowDimensions()
  const logoOpacity = useSharedValue(0)

  useEffect(() => {
    logoOpacity.value = withDelay(500, withTiming(1, {duration: 1000}))
  }, [])

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
    }
  })

  return (
    <ScrollView style={styles.container}>
      <View className='p-6'>
        <View className='flex items-end'>
          <Animated.View
            entering={FadeInLeft.delay(200).duration(500)}
            className='absolute left-6 top-28'>
            <Image
              style={styles.polygonContainer}
              source={require('@/assets/images/polygon-01.png')}
            />
          </Animated.View>
          <Settingsbutton />
          <Animated.View
            entering={FadeInRight.delay(200).duration(500)}
            className='absolute right-7 top-56'>
            <Image
              style={[styles.polygonContainer, styles.PolygonRotate]}
              source={require('@/assets/images/polygon-02.png')}
            />
          </Animated.View>
        </View>
        <View className='gap-3'>
          <Animated.View
            className='flex flex-row justify-center'
            style={logoStyle}>
            <Image
              style={styles.logo}
              source={require('@/assets/images/logo.png')}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(500)}
            className='flex flex-col justify-center'>
            <ButtonImage href='/classes'>
              <Image
                style={[styles.boderLeft]}
                className='h-36 w-full'
                source={require('@/assets/images/clases.jpeg')}
              />
            </ButtonImage>
            <Text className='mt-4 text-white text-lg font-Copperplate'>
              CLASES VIRTUALES
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(700).duration(500)}
            className='flex flex-col justify-center mt-4'>
            <ButtonImage href='/activities'>
              <Image
                style={[styles.boderLeft]}
                className='h-36 w-full'
                source={require('@/assets/images/actividades.jpeg')}
              />
            </ButtonImage>
            <Text className='mt-4 text-white font-Copperplate'>
              ACTIVIDADES EN STREAMING
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(800).duration(500)}
            className='flex flex-col justify-center mt-4'>
            <ButtonImage href='/trainer'>
              <Image
                style={[styles.boderLeft]}
                className='h-40 w-full'
                source={require('@/assets/images/entrenamiento.jpeg')}
              />
            </ButtonImage>
            <Text className='mt-4 text-white font-Copperplate'>
              ENTRENAMIENTO
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(900).duration(500)}
            className='flex flex-col justify-center items-center mt-4'>
            <View className='flex flex-row w-full gap-2'>
              <View className='flex flex-col items-center w-1/2'>
                <Image
                  style={[styles.minibox, styles.boderLeft]}
                  source={require('@/assets/images/notifications.jpeg')}
                  className='bg-red-500'
                />
                <Text className='mt-4 text-white uppercase font-Copperplate'>
                  Notificaciones
                </Text>
              </View>
              <View className='flex flex-col items-center w-1/2'>
                <Image
                  style={[styles.minibox, styles.boderRight]}
                  source={require('@/assets/images/nutricion.jpeg')}
                  className='bg-red-500'
                />
                <Text className='mt-4 text-white uppercase font-Copperplate'>
                  Nutrición
                </Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1000).duration(500)}
            className='flex flex-col justify-center items-center mt-4 mb-20'>
            <View className='flex flex-row w-full gap-2'>
              <View className='flex flex-col items-center w-1/2'>
                <Image
                  style={[styles.minibox, styles.boderRight]}
                  source={require('@/assets/images/servicios.jpeg')}
                />
                <Text className='mt-4 text-white font-Copperplate'>
                  Servicios
                </Text>
              </View>
              <View className='flex flex-col items-center w-1/2'>
                <Image
                  style={[styles.minibox, styles.boderLeft]}
                  source={require('@/assets/images/cuestionarios.jpeg')}
                />
                <Text className='mt-4 text-white uppercase font-Copperplate'>
                  Cuestionarios
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D1B',
    height: '100%',
  },
  logo: {
    marginBlock: 31,
    height: 100,
    width: '80%',
    maxWidth: 300,
    marginBottom: 58,
  },
  polygonContainer: {
    height: 38,
    width: 35,
  },
  PolygonRotate: {
    transform: [{rotate: '58deg'}],
  },
  box: {
    height: 200,
    width: '100%',
  },
  minibox: {
    height: 200,
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  boderLeft: {
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  boderRight: {
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
})
