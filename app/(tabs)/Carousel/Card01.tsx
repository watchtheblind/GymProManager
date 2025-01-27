import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native'
export default function Card01() {
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
        <View className='flex flex-col items-center'>
          {[
            ['HAZLO', 'text-white', 'SIMPLE:', 'text-[#B0A462]'],
            ['CRECE', 'text-white', 'CON', 'text-white'],
            ['NUESTRO', 'text-white'],
            ['SOFTWARE', 'text-[#DFAA8C]', 'PARA', 'text-white'],
            ['GIMNASIOS', 'text-[#6CB0B4]'],
          ].map(([text1, color1, text2, color2], index) => (
            <View
              key={index}
              className='flex flex-row'>
              <Text className={`${color1} font-Copperplate text-3xl`}>
                {text1}{' '}
              </Text>
              {text2 && (
                <Text className={`${color2} font-Copperplate text-3xl`}>
                  {text2}
                </Text>
              )}
            </View>
          ))}
        </View>

        <View className='flex flex-row mt-4'>
          <Text
            className={'text-white text-xl'}
            style={[{fontFamily: 'MyriadPro'}]}>
            No te conformes con lo básico,{' '}
          </Text>
          <View>
            <Text
              className={'text-[#6CB0B4] text-xl'}
              style={[{fontFamily: 'MyriadPro'}]}>
              {' '}
              ve más allá{' '}
            </Text>
          </View>
        </View>
        <View className='flex flex-row'>
          <Text
            className={'text-white text-xl'}
            style={[{fontFamily: 'MyriadPro'}]}>
            {' '}
            con{' '}
          </Text>
          <Text className={'text-[#B0A462] text-lg font-bold'}>
            {' '}
            Gym Pro Manager{' '}
          </Text>
        </View>
        <View className='absolute right-0 bottom-0 top-56'>
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
  defaultText: {
    fontFamily: 'Copperplate', //Default font family
  },
})
