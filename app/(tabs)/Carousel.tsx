import {useRef, useState} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  Pressable,
} from 'react-native'
import Carouselcardformat from './Carouselcardformat'
import Pagination from './Carousel/Paginator'
import Button from '@/components/ui/Button'
import {router} from 'expo-router'
import {ThemedText} from '@/components/ThemedText'
import useCarouselData from './Carousel/Cardsexport'

// Componente principal del carrusel
export default function Carousel() {
  // Referencia para la animación de desplazamiento horizontal
  const scrollX = useRef(new Animated.Value(0)).current

  // Referencia para el FlatList que contiene los elementos del carrusel
  const slideRef = useRef(null)

  // Obtenemos los datos del carrusel usando un hook personalizado
  const carouselData = useCarouselData()

  // Función que se ejecuta cuando los elementos visibles cambian (no está implementada)
  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {},
  ).current

  const handleSubmit = async () => {
    router.navigate('./Login')
  }

  return (
    <View style={styles.container}>
      {/* Contenedor principal del carrusel */}
      <View
        className='rounded-xl'
        style={{flex: 3}}>
        {/* FlatList que renderiza los elementos del carrusel */}
        <FlatList
          data={carouselData} // Datos del carrusel
          renderItem={({item}) => <Carouselcardformat item={item} />} // Renderiza cada elemento usando el componente Carouselcardformat
          horizontal // Desplazamiento horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled // Habilita el desplazamiento por páginas
          bounces={false} // Desactiva el efecto de rebote
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}], // Animación del desplazamiento
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300, // Tiempo mínimo que un elemento debe estar visible
            viewAreaCoveragePercentThreshold: 10,
          }}
          ref={slideRef} // Referencia al FlatList
        />
      </View>

      {/* Contenedor inferior con la paginación y botones */}
      <View style={{flex: 1, backgroundColor: '#1d1d1b'}}>
        <Pagination
          data={carouselData}
          scrollX={scrollX}
        />
        <View className='flex flex-row justify-center '>
          <Button
            title='Empezar'
            onPress={handleSubmit}
          />
        </View>
        <View className='flex flex-row justify-center items-center mt-4'>
          <ThemedText
            style={{
              backgroundColor: '#1D1D1B',
              fontFamily: 'MyriadPro',
            }}>
            ¿Aún no tienes cuenta?{' '}
          </ThemedText>
          <Pressable
            onPress={() => {
              router.navigate('./Signup')
            }}>
            <Text className='text-[#B0A462] text-lg underline font-bold'>
              Regístrate
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  linkColor: {
    color: '#B0A462',
    padding: 4,
    fontSize: 16,
    fontFamily: 'Myriad Pro',
  },
})
