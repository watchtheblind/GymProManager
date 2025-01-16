import {View, StyleSheet, useWindowDimensions, Animated} from 'react-native'

export default function Paginacion({data, scrollX}: {data: any; scrollX: any}) {
  const {width} = useWindowDimensions()

  return (
    <View
      style={{
        justifyContent: 'center',
        paddingTop: 24,
        flexDirection: 'row',
        height: 64,
        backgroundColor: '#1D1D1B',
      }}>
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

        // Mantener un ancho fijo para los puntos
        const dotWidth = 10 // Ancho fijo
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
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
