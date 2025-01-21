import {View, StyleSheet, useWindowDimensions, Animated} from 'react-native'

export default function Pagination({data, scrollX}: {data: any; scrollX: any}) {
  const {width} = useWindowDimensions()

  return (
    <View style={styles.paginationContainer}>
      {data.map((_: any, index: any) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ]

        const dotWidth = 10
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={index.toString()}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    justifyContent: 'center',
    paddingTop: 24,
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#1D1D1B',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6CB0B4',
    marginHorizontal: 8,
  },
})
