import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  Pressable,
} from 'react-native'
import CarouselSections from './Carousel/Cardsexport'
import Carouselcardformat from './Carouselcardformat'
import React, {useRef, useState} from 'react'
import Pagination from './Carousel/Paginator'
import Button from '@/components/ui/Button'
import {router} from 'expo-router'
import {ThemedText} from '@/components/ThemedText'

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slideRef = useRef(null)

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {},
  ).current

  const handleSubmit = async () => {
    router.navigate('./Iniciosesion')
  }

  return (
    <View style={styles.container}>
      <View
        className='rounded-xl'
        style={{flex: 3}}>
        <FlatList
          data={CarouselSections}
          renderItem={({item}) => <Carouselcardformat item={item} />}
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
        <Pagination
          data={CarouselSections}
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
        <View className='flex flex-row justify-center items-center mt-4'>
          <ThemedText style={{color: '#ffffff'}}>
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
