import {View, Image, StyleSheet, useWindowDimensions} from 'react-native'

export default function Carruselitem({item}: {item: any}) {
  const {width} = useWindowDimensions()
  //este componente define los elementos de cada seccion del carrusel, tanto estilo como distribución
  return (
    <View style={{flex: 1}}>
      <View
        style={{flex: 2, backgroundColor: 'skyblue'}} // Cambia flex: 2 a flex: 1
      >
        <Image
          source={item.image}
          style={[styles.image, {width: '100%', height: '100%'}]} // Asegúrate de que la imagen ocupe todo el contenedor
          resizeMode='cover'
        />
      </View>
      <View
        className='rounded-xl mt-4'
        style={{flex: 1, backgroundColor: '#1D1D1B'}}>
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
