import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import ButtonImage from '@/components/ui/ButtonImage'

export default function Home() {
  const {width} = useWindowDimensions()
  return (
    <ScrollView style={styles.container}>
      <View className='p-4'>
        <View className='flebx flex-row justify-center'>
          <Image
            style={styles.logo}
            source={require('@/assets/images/logo.png')}
          />
        </View>
        <View className='flex flex-col justify-center items-center'>
          <ButtonImage href='/classes'>
            <Image
              style={[styles.box, styles.boderLeft]}
              source={require('@/assets/images/clases.jpeg')}
            />
          </ButtonImage>
          <Text className='mt-4 text-white font-bold'>CLASES VIRTUALES</Text>
        </View>
        <View className='flex flex-col justify-center items-center mt-4'>
          <ButtonImage href='/activities'>
            <Image
              style={[styles.box, styles.boderLeft]}
              source={require('@/assets/images/actividades.jpeg')}
            />
          </ButtonImage>
          <Text className='mt-4 text-white font-bold'>
            ACTIVIDADES EN STREAMING
          </Text>
        </View>
        <View className='flex flex-col justify-center items-center mt-4'>
          <ButtonImage href='/trainer'>
            <Image
              style={[styles.box, styles.boderLeft]}
              source={require('@/assets/images/entrenamiento.jpeg')}
            />
          </ButtonImage>
          <Text className='mt-4 text-white font-bold'>ENTRENAMIENTO</Text>
        </View>
        <View className='flex flex-col justify-center items-center mt-4'>
          <View className='flex flex-row w-full gap-2'>
            <View className='flex flex-col items-center w-1/2'>
              <Image
                style={[styles.minibox, styles.boderLeft]}
                source={require('@/assets/images/notifications.jpeg')}
                className='bg-red-500'
              />
              <Text className='mt-4 text-white font-bold uppercase'>
                Notifications
              </Text>
            </View>
            <View className='flex flex-col items-center w-1/2'>
              <Image
                style={[styles.minibox, styles.boderRight]}
                source={require('@/assets/images/nutricion.jpeg')}
                className='bg-red-500'
              />
              <Text className='mt-4 text-white font-bold uppercase'>
                Nutrición
              </Text>
            </View>
          </View>
        </View>
        <View className='flex flex-col justify-center items-center mt-4'>
          <View className='flex flex-row w-full gap-2'>
            <View className='flex flex-col items-center w-1/2'>
              <Image
                style={[styles.minibox, styles.boderRight]}
                source={require('@/assets/images/servicios.jpeg')}
              />
              <Text className='mt-4 text-white font-bold uppercase'>
                Servicios
              </Text>
            </View>
            <View className='flex flex-col items-center w-1/2'>
              <Image
                style={[styles.minibox, styles.boderLeft]}
                source={require('@/assets/images/cuestionarios.jpeg')}
              />
              <Text className='mt-4 text-white font-bold uppercase'>
                Cuestionarios
              </Text>
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
    height: 200,
    width: '100%',
    maxWidth: 300,
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
