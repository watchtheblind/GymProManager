import {ThemedText} from '@/components/ThemedText'
import {Image, StyleSheet, View, useWindowDimensions, Text} from 'react-native'

export default function Card03() {
  const {width} = useWindowDimensions()

  return (
    <View
      className='flex flex-col items-center rounded-6xl pt-8 '
      style={[styles.colorBackground, styles.box]}>
      <View className='flex flex-col items-center gap-1'>
        <View className='absolute left-3 top-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </View>
        <View className='flex flex-row leading-3'>
          <Text className='text-4xl font-Copperplate text-white'>
            ¿Listo para
          </Text>
        </View>
        <View className='flex flex-row'>
          <Text className='text-4xl font-Copperplate text-[#DFAA8C]'>
            transformar
          </Text>
        </View>
        <View className='flex flex-row'>
          <Text className='text-4xl font-Copperplate text-white'>tu </Text>
          <Text className='text-4xl font-Copperplate text-[#B0A462]'>
            negocio
          </Text>
          <Text className='text-4xl font-Copperplate text-white'>?</Text>
        </View>
        <View
          className='flex flex-row mt-2 mx-1 px-3'
          style={{width}}>
          <Text
            className='text-white text-center text-lg'
            style={[{fontFamily: 'MyriadPro'}]}>
            Con Gym Pro Manager, tendrás acceso a un software de gestión
            avanzado que te permitirá optimizar la administración, la
            comunicación, el cobro y el control de tus operaciones.  
          </Text>
        </View>
        <View className='absolute right-4 top-56'>
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
