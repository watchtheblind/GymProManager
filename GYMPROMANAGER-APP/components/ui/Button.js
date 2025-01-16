import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native'

export default function Button({title, onPress = () => {}}) {
  const {width} = useWindowDimensions()

  // 1. Animated value
  const backgroundColorRef = new Animated.Value(0)

  // 2. The handlers
  const handlePress = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }).start()
  }
  const handleRelease = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true,
    }).start()
  }

  // Interpolate the background color
  const backgroundColor = backgroundColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['#B0A462', '#b0a462d1'],
  })

  // Applying the interpolated backgroundColor
  return (
    <Pressable
      onPressIn={handlePress}
      onPressOut={handleRelease}
      onPress={onPress}>
      <Animated.View
        style={[styles.buttonContainer, {backgroundColor, width: width - 32}]}>
        <Text style={styles.buttonText}> {title} </Text>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 24,
    marginHorizontal: 10,
    padding: 15,
    borderColor: '#fef4c9',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    userSelect: 'none',
  },
})
