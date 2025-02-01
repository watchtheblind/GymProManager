import {View, Image, StyleSheet, useWindowDimensions} from 'react-native'

export default function Carouselcardformat({item}: {item: any}) {
  const {width} = useWindowDimensions()

  // Determina si la imagen es una URL o una ruta local
  const imageSource =
    typeof item.image === 'string' && item.image.startsWith('http')
      ? {uri: item.image} // Es una URL
      : item.image // Es una ruta local

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1.2,
          backgroundColor: '#2B2B25',
          width: width,
        }}>
        <Image
          source={imageSource} // Usamos imageSource
          style={[styles.image, {width: '100%', height: '100%'}]}
          resizeMode='cover'
        />
      </View>
      <View
        className='rounded-xl'
        style={{flex: 1, backgroundColor: '#1D1D1B'}}>
        {item.content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
  },
})
