import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native'

interface CarouselCardInfoProps {
  titulo?: string
  texto?: string
  imagen?: string
  titleSize?: number // Tamaño del título (opcional)
  polygonTopPosition?: number // Posición vertical de la primera imagen
}

// Función para generar un color basado en el título
const getColorFromTitle = (title: string): string => {
  const colors = ['#B0A462', '#6CB0B4', '#DFAA8C', '#FFFFFF']
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function CarouselCardInfo({
  titulo,
  texto,
  titleSize = 3, // Valor por defecto para el tamaño del título
  polygonTopPosition = 0, // Valor por defecto para la posición de la imagen
}: CarouselCardInfoProps) {
  const {width} = useWindowDimensions()
  const CARD_WIDTH = width
  const titleColor = titulo ? getColorFromTitle(titulo) : '#FFFFFF'

  return (
    <View
      className='flex flex-col items-center rounded-xl p-4 pt-8'
      style={[styles.colorBackground, styles.box, {width: CARD_WIDTH}]}>
      <View className='flex flex-col items-center w-full'>
        {/* Imagen de fondo (polygon-01) */}
        <View
          className={`absolute left-0 top-${polygonTopPosition}`}
          style={{top: polygonTopPosition}}>
          <Image
            style={styles.polygonContainer}
            source={require('@/assets/images/polygon-01.png')}
          />
        </View>

        {/* Título de la tarjeta */}
        <View className='flex flex-col justify-center items-center w-full'>
          <Text
            className={`font-Copperplate text-${titleSize}xl lowercase text-center`}
            numberOfLines={5}
            ellipsizeMode='tail'
            style={{color: titleColor}}>
            {titulo}
          </Text>
        </View>

        {/* Texto de la tarjeta */}
        <View className='flex flex-row mt-4 items-center justify-center w-full'>
          <Text
            className='text-white text-2xl text-center'
            style={{fontFamily: 'MyriadPro'}}
            numberOfLines={7}
            ellipsizeMode='tail'>
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
  polygonContainer: {
    height: 45,
    width: 42,
  },
  colorBackground: {
    backgroundColor: '#1D1D1B',
  },
})
