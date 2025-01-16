import {ThemedText} from '@/components/ThemedText'
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native'
export default function Vistacarrusel1() {
  const {width} = useWindowDimensions()

  return (
    <View
      className='flex flex-col items-center rounded-xl p-4 pt-8'
      style={[styles.colorBackground, styles.box]}>
      <View className='flex flex-col items-center w-full'>
        <View className='absolute left-0 top-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </View>
        <View className='flex flex-row mb-4 leading-3'>
          <ThemedText
            className='text-white mr-2 '
            style={styles.defaultText}
            type='title'>
            HAZLO
          </ThemedText>
          <ThemedText
            className=''
            style={[styles.colorYellow, styles.defaultText]}
            type='title'>
            SIMPLE:
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4 leading-3'>
          <ThemedText
            className='text-white'
            type='title'>
            CRECE CON NUESTRO
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
            style={styles.colorBlue}
            type='title'>
            GIMNASIOS
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4'>
          <ThemedText
            className=''
            style={styles.colorWhite}>
            No te conformes con lo básico,
          </ThemedText>
          <ThemedText
            className='mr-2'
            style={styles.colorBlue}>
            ve más allá
          </ThemedText>
          <ThemedText
            className=''
            style={styles.colorWhite}>
            con
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4'>
          <ThemedText
            className=''
            style={styles.colorYellow}>
            Gym Pro Manager
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
  linkColor: {
    color: '#B0A462',
    padding: 4,
    fontSize: 16,
    fontFamily: 'Copperplate',
  },
})
