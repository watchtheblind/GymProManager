import {useRef} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import Carouselcardformat from './Carouselcardformat'
import Pagination from './Carousel/Paginator'
import Button from '@/components/ui/Button'
import {router} from 'expo-router'
import {ThemedText} from '@/components/ThemedText'
import useCarouselData from './Carousel/Cardsexport'

// Main carousel component
export default function Carousel() {
  // Reference for horizontal scroll animation
  const scrollX = useRef(new Animated.Value(0)).current
  // Reference for the FlatList containing the carousel items
  const slideRef = useRef(null)

  // Get carousel data and loading state using the custom hook
  const {carouselData, isLoading} = useCarouselData()

  // Function executed when visible items change (not implemented)
  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {},
  ).current

  const handleSubmit = async () => {
    router.navigate('./Login')
  }

  // While data is loading, show a loading indicator
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size='large'
          color='#B0A462'
        />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Main carousel container */}
      <View
        className='rounded-xl'
        style={{flex: 3}}>
        {/* FlatList rendering the carousel items */}
        <FlatList
          data={carouselData} // Carousel data
          renderItem={({item}) => <Carouselcardformat item={item} />} // Render each item using the Carouselcardformat component
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
            minimumViewTime: 300, // Minimum time an item must be visible
            viewAreaCoveragePercentThreshold: 10,
          }}
          ref={slideRef} // Reference to the FlatList
        />
      </View>

      {/* Bottom container with pagination and buttons */}
      <View style={{flex: 1, backgroundColor: '#1d1d1b'}}>
        <Pagination
          data={carouselData}
          scrollX={scrollX}
        />
        <View className='flex flex-row justify-center'>
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

// Component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d1b',
  },
  loadingText: {
    marginTop: 16,
    color: '#B0A462',
    fontSize: 18,
    fontFamily: 'MyriadPro',
  },
  linkColor: {
    color: '#B0A462',
    padding: 4,
    fontSize: 16,
    fontFamily: 'Myriad Pro',
  },
})
