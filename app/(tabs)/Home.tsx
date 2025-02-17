// Home.tsx
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native'
import ButtonImage from '@/components/ui/ButtonImage'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInLeft,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import Settingsbutton from '@/components/ui/Settingsbutton'
import {useFocusEffect} from '@react-navigation/native'
import ConfirmationModal from './ConfirmModal'
import {useSession} from '@/hooks/SessionContext'

// Animaciones reutilizables
const animations = {
  fadeInDown: (delay: number) => FadeInDown.delay(delay).duration(500),
  fadeInRight: (delay: number) => FadeInRight.delay(delay).duration(500),
  fadeInLeft: (delay: number) => FadeInLeft.delay(delay).duration(500),
}

export default function Home() {
  const {logout} = useSession()
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  // Ocultar el modal cuando la pantalla pierde el foco
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setIsModalVisible(false) // Oculta el modal cuando el componente no está en foco
      }
    }, []),
  )

  // Animación del logo
  const logoStyle = useAnimatedStyle(() => ({
    opacity: withDelay(500, withTiming(1, {duration: 1000})),
  }))

  // Funciones para manejar el modal
  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  const handleAccept = () => {
    logout()
    handleCloseModal()
  }

  const handleReject = () => {
    console.log('Usuario rechazó')
    handleCloseModal()
  }

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

        {/* Botón de configuración y salida */}
        <Animated.View
          className={'flex-row-reverse justify-between'}
          entering={animations.fadeInDown(300)}
          style={styles.settingsButton}>
          <Settingsbutton />
          <TouchableOpacity
            className='flex items-center justify-center h-12 w-11'
            onPress={handleOpenModal}>
            <MaterialIcons
              className='transform scale-x-[-1]'
              name='exit-to-app'
              size={32}
              color='red'
            />
          </TouchableOpacity>
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

        {/* Sección de Actividades */}
        <Animated.View
          entering={animations.fadeInDown(700)}
          style={styles.mt4}>
          <ButtonImage href='/Homesections/Activities'>
            <Image
              style={[styles.image, styles.borderLeft]}
              source={require('@/assets/images/actividades.jpeg')}
            />
          </ButtonImage>
          <Text style={styles.sectionTitle}>ACTIVIDADES</Text>
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
          <Text style={styles.sectionTitle}>ENTRENAMIENTOS Y PROGRAMAS</Text>
        </Animated.View>

        {/* Sección de Cuestionarios */}
        <Animated.View
          entering={animations.fadeInDown(1000)}
          style={styles.mt4}>
          <View style={styles.fullWidth}>
            <ButtonImage href='/Homesections/Questionnaires'>
              <Image
                style={[
                  styles.miniImage,
                  styles.borderRight,
                  styles.improvedImage,
                ]}
                source={require('@/assets/images/cuestionarios.jpeg')}
              />
            </ButtonImage>
            <Text style={styles.sectionTitle}>CUESTIONARIOS</Text>
          </View>
        </Animated.View>
        {/* Modal Personalizado */}
        <ConfirmationModal
          isVisible={isModalVisible}
          onAccept={handleAccept}
          onReject={handleReject}
          onClose={handleCloseModal}
        />
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
    lineHeight: 24,
  },
  mt4: {
    marginTop: 16,
  },
  fullWidth: {
    width: '100%',
  },
})
