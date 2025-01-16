import {View, Image, StyleSheet, useWindowDimensions} from 'react-native'

export default function Carruselitem({item}: {item: any}) {
  const {width} = useWindowDimensions()

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1.2,
          backgroundColor: 'skyblue',
          width: width, // Asegúrate de que el contenedor tenga el ancho de la pantalla
        }}>
        <Image
          source={item.image}
          style={[styles.image, {width: '100%', height: '100%'}]}
          resizeMode='cover' // Cambia a 'contain' si no quieres que se recorte
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
