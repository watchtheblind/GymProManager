import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native'

interface Card01Props {
  titulo?: string
  texto?: string
  imagen?: string
}

// Función para generar un color basado en el título
const getColorFromTitle = (title: string): string => {
  // Lista de colores a usar
  const colors = ['#B0A462', '#6CB0B4', '#DFAA8C', '#FFFFFF']

  // Generar un hash simple basado en el título
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Seleccionar un color basado en el hash
  const index = Math.abs(hash) % colors.length
  return colors[index]
}

export default function Card01({titulo, texto, imagen}: Card01Props) {
  const {width} = useWindowDimensions()
  const CARD_WIDTH = width

  // Obtener el color del título
  const titleColor = titulo ? getColorFromTitle(titulo) : '#FFFFFF'

  return (
    <View
      className='flex flex-col items-center rounded-xl p-4 pt-8'
      style={[styles.colorBackground, styles.box, {width: CARD_WIDTH}]} // Aplicamos el ancho dinámico aquí
    >
      <View className='flex flex-col items-center w-full'>
        {/* Imagen de fondo (polygon-01) */}
        <View className='absolute left-0 top-0'>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </View>

        {/* Título de la tarjeta */}
        <View className='flex flex-col justify-center items-center w-full'>
          <Text
            className='font-Copperplate text-3xl lowercase text-center'
            numberOfLines={5}
            ellipsizeMode='tail'
            style={{color: titleColor}} // Aplicamos el color generado
          >
            {titulo}
          </Text>
        </View>

        {/* Texto de la tarjeta */}
        <View className='flex flex-row mt-4 items-center justify-center w-full'>
          <Text
            className='text-white text-2xl text-center'
            style={[{fontFamily: 'MyriadPro'}]}
            numberOfLines={7} // Limita el número de líneas
            ellipsizeMode='tail' // Añade puntos suspensivos si el texto es demasiado largo
          >
            {texto}
          </Text>
        </View>

        {/* Imagen de fondo (polygon-02) */}
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
    fontFamily: 'Copperplate', // Default font family
  },
})
