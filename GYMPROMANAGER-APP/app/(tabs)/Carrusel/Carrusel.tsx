import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  Pressable,
} from 'react-native'
import Carruselsecciones from './Carruselsecciones'
import Carruselitem from '../Carruselitem'
import React, {useRef, useState} from 'react'
import Paginacion from './Paginacion'
import Button from '@/components/ui/Button'
import {Link, router} from 'expo-router'
import {ThemedText} from '@/components/ThemedText'

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slideRef = useRef(null)

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {},
  ).current

  const handleSubmit = async () => {
    router.navigate('./login')
  }

  return (
    <View style={styles.container}>
      <View
        className='rounded-xl border border-blue-500 border-dotted'
        style={{flex: 3}}>
        <FlatList
          data={Carruselsecciones}
          renderItem={({item}) => <Carruselitem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300,
            viewAreaCoveragePercentThreshold: 10,
          }}
          ref={slideRef}
        />
      </View>
      <View style={{flex: 1, backgroundColor: '#1d1d1b'}}>
        <Paginacion
          data={Carruselsecciones}
          scrollX={scrollX}
        />
        <View
          className='flex flex-row justify-center '
          style={{backgroundColor: '#1D1D1B'}}>
          <Button
            title='Empezar'
            onPress={handleSubmit}
          />
        </View>
        <View className='flex flex-row justify-center items-center mt-2'>
          <ThemedText style={{color: '#ffffff'}}>¿Ya tienes cuenta?</ThemedText>
          <Link
            href='/'
            asChild>
            <Pressable>
              <Text style={styles.linkColor}>Acceder</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  )
}

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
