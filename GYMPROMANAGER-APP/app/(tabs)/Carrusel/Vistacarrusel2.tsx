import ParallaxScrollView from '@/components/ParallaxScrollView'
import {ThemedText} from '@/components/ThemedText'
import {ThemedView} from '@/components/ThemedView'
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native'

export default function Vistacarrusel2() {
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
            CONOCE NUESTRO
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4'>
          <ThemedText
            className='mr-2'
            style={styles.colorRed}
            type='title'>
            SOFTWARE
          </ThemedText>
          <ThemedText
            className='text-white'
            type='title'>
            PARA
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4'>
          <ThemedText
            className=''
            style={styles.colorYellow}
            type='title'>
            GIMNASIOS
          </ThemedText>
        </View>
        <View
          className='flex flex-row mb-4 p-8'
          style={{width}}>
          <ThemedText style={[styles.colorWhite]}>
            Capta más clientes, aumenta tus ingresos, fideliza a tus usuarios y
            fortalece tu imagen corporativa, todo en un solo lugar con Gym Pro
            Manager. 
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
