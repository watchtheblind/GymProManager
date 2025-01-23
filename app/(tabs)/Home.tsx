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
import {Polygon} from 'react-native-svg'

const Settingsbutton = () => {
  return (
    <TouchableOpacity className='flex items-center justify-center mt-10 h-12 w-12 rounded-xl bg-[#518893] border-4 border-[#6CB0B4]'>
      <Settingsicon size={22} />
    </TouchableOpacity>
  )
}

export default function Home() {
  const {width} = useWindowDimensions()
  return (
    <ScrollView style={styles.container}>
      <View className='p-6'>
        <View className='flex items-end'>
          <View className='absolute left-6 top-28'>
            <Image
              style={styles.polygonContainer}
              source={require('@/assets/images/polygon-01.png')}
            />
          </View>
          <Settingsbutton></Settingsbutton>
          <View className='absolute right-7 top-56'>
            <Image
              style={[styles.polygonContainer, styles.PolygonRotate]}
              source={require('@/assets/images/polygon-02.png')}
            />
          </View>
        </View>
        <View className='gap-3'>
          <View className='flex flex-row justify-center'>
            <Image
              style={styles.logo}
              source={require('@/assets/images/logo.png')}
            />
          </View>
          <View className='flex flex-col justify-center'>
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
          </View>
          <View className='flex flex-col justify-center mt-4'>
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
          </View>
          <View className='flex flex-col justify-center mt-4'>
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
          </View>
          <View className='flex flex-col justify-center items-center mt-4'>
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
          </View>
          <View className='flex flex-col justify-center items-center mt-4 mb-20'>
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
          </View>
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
