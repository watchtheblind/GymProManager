import {View, Image, StyleSheet, useWindowDimensions} from 'react-native'

export default function Carruselitem({item}: {item: any}) {
  const {width} = useWindowDimensions()
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2, backgroundColor: 'skyblue'}}>
        <Image
          source={item.image}
          style={[styles.image, {width}]}
          resizeMode='cover'
        />
      </View>
      <View
        className='rounded-xl -mt-3'
        style={{flex: 3, backgroundColor: '#1D1D1B'}}>
        {item.content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 2,
    height: '100%',
  },
})
