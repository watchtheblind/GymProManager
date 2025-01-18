import {ThemedText} from '@/components/ThemedText'
import {Image, StyleSheet, View, useWindowDimensions, Text} from 'react-native'

export default function Vistacarrusel2() {
  const {width} = useWindowDimensions()
  return (
    <View className='flex flex-col items-center rounded-xl pt-8 bg-[#1D1D1B] h-[680px]'>
      <View className='flex flex-col items-center'>
        <View className='absolute right-80 top-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-02.png')}
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
        <View className='flex flex-row mt-2'>
          <Text className={'text-[#6CB0B4]  text-lg font-bold'}>Capta</Text>
          <Text className={'text-white text-lg'}> más clientes,</Text>
          <Text className={'text-[#DFAA8C]  text-lg font-bold'}> aumenta</Text>
          <Text className={'text-white text-lg'}> tus ingresos,</Text>
        </View>
        <View className='flex flex-row'>
          <Text className={'text-[#B0A462] text-lg font-bold'}>fideliza </Text>
          <Text className={'text-white text-lg '}>a tus usuarios y </Text>
          <Text className={'text-[#6CB0B4]  text-lg font-bold'}>fortalece</Text>
        </View>
        <View>
          <Text className={'text-white text-lg '}>tu imagen corporativa.</Text>
        </View>
        <View className='absolute right-0 bottom-0 top-56'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
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
