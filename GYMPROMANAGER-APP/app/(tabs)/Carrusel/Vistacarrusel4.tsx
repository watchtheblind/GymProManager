import {ThemedText} from '@/components/ThemedText'
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native'

export default function Vistacarrusel4() {
  const {width} = useWindowDimensions()
  const plans = [
    {
      id: 1,
      description: 'GYM PRO MANAGER BRONCE',
      color: styles.boxRed,
      price: 0,
    },
    {
      id: 2,
      description: 'GYM PRO MANAGER SILVER',
      color: styles.boxBlue,
      price: 100,
    },
  ]
  return (
    <View
      className='relative flex flex-col items-center rounded-xl pt-8'
      style={[styles.colorBackground, styles.box]}>
      <View className='relative flex flex-col items-center'>
        <View className='absolute left-0 top-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </View>
        <View className='flex flex-row mb-4 leading-3'>
          <ThemedText
            className='text-white pr-2'
            type='title'>
            La
          </ThemedText>
          <ThemedText
            className='pr-2'
            style={styles.colorRed}
            type='title'>
            aplicación
          </ThemedText>
          <ThemedText
            className='text-white'
            type='title'>
            que se
          </ThemedText>
        </View>
        <View className='flex flex-row mb-4'>
          <ThemedText
            className='mr-2'
            style={styles.colorBlue}
            type='title'>
            ADAPTA
          </ThemedText>
          <ThemedText
            className='mr-2'
            style={styles.colorWhite}
            type='title'>
            a
          </ThemedText>
          <ThemedText
            className='mr-2'
            style={styles.colorYellow}
            type='title'>
            TI
          </ThemedText>
        </View>
        <View className='w-full'>
          {plans.map((item: any) => {
            return (
              <View
                className='flex flex-col items-center mb-4'
                style={[styles.card, item.color, {width: width - 30}]}
                key={item.id}>
                <ThemedText className='mb-4'>{item.description}</ThemedText>
                <ThemedText style={styles.sizePrice}>
                  {item.price} €/mes
                </ThemedText>
              </View>
            )
          })}
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
  card: {
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 4,
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
    fontSize: 12,
    lineHeight: 32,
  },
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
    fontFamily: 'Copperplate',
  },
  boxRed: {
    backgroundColor: '#DFAA8C',
  },
  boxBlue: {
    backgroundColor: '#6CB0B4',
  },
  boxYellow: {
    backgroundColor: '#B0A462',
  },
  sizePrice: {
    fontSize: 24,
    lineHeight: 24,
  },
})
