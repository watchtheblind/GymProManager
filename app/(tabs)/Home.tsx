import React, {useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
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
import Settingsbutton from '@/components/ui/Settingsbutton'

export default function Home() {
  const AnimatedView = Animated.createAnimatedComponent(View)
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
          <AnimatedView
            entering={FadeInDown.delay(300).duration(500)}
            className='mt-10'>
            <Settingsbutton />
          </AnimatedView>
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
            <ButtonImage href='/Homesections/Classes'>
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
            <ButtonImage href='/Homesections/Activities'>
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
            <ButtonImage href='/Workouts'>
              <Image
                style={[styles.boderLeft]}
                className='h-40 w-full'
                source={require('@/assets/images/entrenamiento.jpeg')}
              />
            </ButtonImage>
            <Text className='mt-4 text-white font-Copperplate'>
              ENTRENAMIENTOS
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(900).duration(500)}
            className='flex flex-col justify-center items-center mt-4'>
            <View className='flex flex-row w-full gap-2'>
              <View className='flex flex-col items-center w-1/2'>
                <ButtonImage href='/Notifications'>
                  <Image
                    style={[styles.minibox, styles.boderLeft]}
                    source={require('@/assets/images/notifications.jpeg')}
                    className='bg-red-500'
                  />
                </ButtonImage>
                <Text className='mt-4 text-white uppercase font-Copperplate'>
                  Notificaciones
                </Text>
              </View>
              <View className='flex flex-col items-center w-1/2'>
                <ButtonImage href='/Questionnaires'>
                  <Image
                    style={[styles.minibox, styles.boderLeft]}
                    source={require('@/assets/images/cuestionarios.jpeg')}
                    className='bg-red-500'
                  />
                </ButtonImage>
                <Text className='mt-4 text-white uppercase font-Copperplate'>
                  Cuestionarios
                </Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1000).duration(500)}
            className='flex flex-col justify-center items-center mt-4 mb-20'>
            <View className='flex flex-row w-full gap-2'>
              <View className='flex flex-col items-center w-full'>
                <Image
                  style={[
                    styles.minibox,
                    styles.boderRight,
                    styles.improvedImage,
                  ]} // Agregamos un nuevo estilo
                  source={require('@/assets/images/servicios.jpeg')}
                />
                <Text className='mt-4 text-white font-Copperplate uppercase w-full text-center'>
                  Servicios
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
    backgroundSize: 'cover', // Cambiado a 'cover' para que la imagen cubra el contenedor
  },
  boderLeft: {
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  boderRight: {
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  improvedImage: {
    height: 200, // Altura fija
    width: '100%', // Ancho completo
    borderTopRightRadius: 0,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 16,
    resizeMode: 'cover', // Asegura que la imagen cubra el contenedor sin deformarse
  },
})
