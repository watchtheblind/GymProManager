import {ThemedText} from '@/components/ThemedText'
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native'

export default function Vistacarrusel3() {
  const {width} = useWindowDimensions()

  return (
    <View
      className='flex flex-col items-center rounded-xl pt-8'
      style={[styles.colorBackground, styles.box]}>
      <View className='flex flex-col items-center'>
        <View className='absolute left-0 top-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </View>
        <View className='flex flex-row mb-4 leading-3'>
          <ThemedText
            className='text-white'
            type='title'>
            ¿Listo para
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4'>
          <ThemedText
            className='mr-2'
            style={styles.colorRed}
            type='title'>
            Transformar
          </ThemedText>
          <ThemedText
            className='mr-2'
            style={styles.colorWhite}
            type='title'>
            tu
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4'>
          <ThemedText
            className=''
            style={styles.colorYellow}
            type='title'>
            negocio?
          </ThemedText>
        </View>
        <View
          className='flex flex-row mb-4 p-8'
          style={{width}}>
          <ThemedText style={[styles.colorWhite]}>
            Con Gym Pro Manager, tendrás acceso a un software de gestión
            avanzado que te permitirá optimizar la administración, la
            comunicación, el cobro y el control de tus operaciones.  
          </ThemedText>
        </View>
        <View className='absolute right-0 bottom-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-02.png')}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    height: 680,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  imageContainer: {
    height: 250,
    backgroundPosition: 'right',
  },
  polygonContainer: {
    height: 45,
    width: 42,
  },
  colorBackground: {
    backgroundColor: '#1D1D1B',
  },
  colorWhite: {
    color: '#FFFFFF',
  },
  colorYellow: {
    color: '#B0A462',
  },
  colorRed: {
    color: '#DFAA8C',
  },
  colorBlue: {
    color: '#6CB0B4',
  },
  defaultText: {
    fontFamily: 'Copperplate', //Default font family
  },
})
