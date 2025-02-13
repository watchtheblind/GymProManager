// components/ui/Loader.tsx
import React, {memo} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

const Loader = memo(() => (
  <View style={styles.container}>
    <ActivityIndicator
      size='large'
      color='#14b8a6'
    />
  </View>
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loader
