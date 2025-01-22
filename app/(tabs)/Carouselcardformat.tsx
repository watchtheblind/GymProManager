import {View, Image, StyleSheet, useWindowDimensions} from 'react-native'

export default function Carouselcardformat({item}: {item: any}) {
  const {width} = useWindowDimensions()

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1.2,
          backgroundColor: 'skyblue',
          width: width,
        }}>
        <Image
          source={item.image}
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
