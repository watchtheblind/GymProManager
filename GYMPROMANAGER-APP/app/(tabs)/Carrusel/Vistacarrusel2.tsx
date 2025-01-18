import {ThemedText} from '@/components/ThemedText'
import {Image, StyleSheet, View, useWindowDimensions, Text} from 'react-native'

export default function Vistacarrusel2() {
  const {width} = useWindowDimensions()
  return (
    <View className='flex flex-col items-center rounded-xl pt-8 bg-[#1D1D1B] h-[680px]'>
      <View className='flex flex-col items-center'>
        <View className='absolute left-1 top-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </View>
        <View className='flex flex-row mb-2 mt-4'>
          <Text className='text-white font-Copperplate text-3xl'>
            {' '}
            CONOCE NUESTRO
          </Text>
        </View>
        <View className='flex flex-row mb-2'>
          <Text className='font-Copperplate text-3xl text-[#DFAA8C]'>
            {' '}
            SOFTWARE
          </Text>
          <Text className='font-Copperplate text-3xl text-white'> PARA</Text>
        </View>
        <View className='flex flex-row mb-2'>
          <Text className='font-Copperplate text-3xl text-[#B0A462]'>
            GIMNASIOS
          </Text>
        </View>
        <View
          className='flex flex-row px-6 mt-4'
          style={{width}}>
          <Text className='text-lg text-white text-center'>
            Capta más clientes, aumenta tus ingresos, fideliza a tus usuarios y
            fortalece tu imagen corporativa, todo con nuestra app. 
          </Text>
        </View>
        <View className='absolute right-3 bottom-0 top-56'>
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
  polygonContainer: {
    height: 45,
    width: 42,
  },
})
