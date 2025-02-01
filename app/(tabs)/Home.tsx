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
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import Settingsbutton from '@/components/ui/Settingsbutton'
import {green} from 'react-native-reanimated/lib/typescript/Colors'

// Animaciones reutilizables
const animations = {
  fadeInDown: (delay: number) => FadeInDown.delay(delay).duration(500),
  fadeInRight: (delay: number) => FadeInRight.delay(delay).duration(500),
  fadeInLeft: (delay: number) => FadeInLeft.delay(delay).duration(500),
}

export default function Home() {
  const {width} = useWindowDimensions()

  const logoStyle = useAnimatedStyle(() => ({
    opacity: withDelay(500, withTiming(1, {duration: 1000})),
  }))

  return (
    <ScrollView style={styles.container}>
      <View style={styles.paddingContainer}>
        {/* Polígono izquierdo */}
        <Animated.View
          entering={animations.fadeInLeft(200)}
          style={styles.polygonLeft}>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </Animated.View>

        {/* Botón de configuración */}
        <Animated.View
          entering={animations.fadeInDown(300)}
          style={styles.settingsButton}>
          <Settingsbutton />
        </Animated.View>

        {/* Polígono derecho */}
        <Animated.View
          entering={animations.fadeInRight(200)}
          style={styles.polygonRight}>
          <Image
            style={[styles.polygonContainer, styles.PolygonRotate]}
            source={require('@/assets/images/polygon-02.png')}
          />
        </Animated.View>

        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Image
            style={styles.logo}
            source={require('@/assets/images/logo.png')}
          />
        </Animated.View>

        {/* Sección de Clases Virtuales */}
        <Animated.View entering={animations.fadeInDown(600)}>
          <ButtonImage href='/Homesections/Classes'>
            <Image
              style={[styles.image, styles.borderLeft]}
              source={require('@/assets/images/clases.jpeg')}
            />
          </ButtonImage>
          <Text style={styles.sectionTitle}>CLASES VIRTUALES</Text>
        </Animated.View>

        {/* Sección de Actividades en Streaming */}
        <Animated.View
          entering={animations.fadeInDown(700)}
          style={styles.mt4}>
          <ButtonImage href='/Homesections/Activities'>
            <Image
              style={[styles.image, styles.borderLeft]}
              source={require('@/assets/images/actividades.jpeg')}
            />
          </ButtonImage>
          <Text style={styles.sectionTitle}>ACTIVIDADES EN STREAMING</Text>
        </Animated.View>

        {/* Sección de Entrenamientos */}
        <Animated.View
          entering={animations.fadeInDown(800)}
          style={styles.mt4}>
          <ButtonImage href='/Homesections/Workouts'>
            <Image
              style={[styles.image, styles.borderLeft]}
              source={require('@/assets/images/entrenamiento.jpeg')}
            />
          </ButtonImage>
          <Text style={styles.sectionTitle}>ENTRENAMIENTOS</Text>
        </Animated.View>

        {/* Sección de Notificaciones y Cuestionarios */}
        <Animated.View
          entering={animations.fadeInDown(900)}
          style={styles.mt4}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <ButtonImage href='/Homesections/Notifications'>
                <Image
                  style={[styles.miniImage, styles.borderLeft]}
                  source={require('@/assets/images/notifications.jpeg')}
                />
              </ButtonImage>
              <Text style={styles.sectionTitle2}>NOTIFICACIONES</Text>
            </View>
            <View style={styles.halfWidth}>
              <ButtonImage href='/Homesections/Questionnaires'>
                <Image
                  style={[styles.miniImage, styles.borderLeft]}
                  source={require('@/assets/images/cuestionarios.jpeg')}
                />
              </ButtonImage>
              <Text style={styles.sectionTitle2}>CUESTIONARIOS</Text>
            </View>
          </View>
        </Animated.View>

        {/* Sección de Servicios */}
        <Animated.View
          entering={animations.fadeInDown(1000)}
          style={styles.mt4}>
          <View style={styles.fullWidth}>
            <ButtonImage href='/Homesections/Services'>
              <Image
                style={[
                  styles.miniImage,
                  styles.borderRight,
                  styles.improvedImage,
                ]}
                source={require('@/assets/images/servicios.jpeg')}
              />
            </ButtonImage>
            <Text style={styles.sectionTitle}>SERVICIOS</Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D1B',
    flex: 1,
    paddingBottom: 40,
  },
  paddingContainer: {
    padding: 24,
    paddingBottom: 85,
  },
  polygonLeft: {
    position: 'absolute',
    left: 24,
    top: 112,
  },
  polygonRight: {
    position: 'absolute',
    right: 28,
    top: 224,
  },
  PolygonRotate: {
    transform: [{rotate: '58deg'}],
  },
  polygonContainer: {
    height: 38,
    width: 35,
  },
  settingsButton: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    height: 100,
    width: '100%',
    maxWidth: 300,
    marginBlock: 30,
  },
  image: {
    height: 144,
    width: '100%',
  },
  miniImage: {
    height: 200,
    width: '100%',
  },
  borderLeft: {
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  borderRight: {
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  improvedImage: {
    resizeMode: 'cover',
  },
  sectionTitle: {
    marginTop: 16,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Copperplate',
    textAlign: 'center',
  },
  sectionTitle2: {
    marginTop: 16,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Copperplate',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    gap: 8,
  },
  halfWidth: {
    width: '48%',
  },
  fullWidth: {
    width: '100%',
  },
  mt4: {
    marginTop: 16,
  },
})
