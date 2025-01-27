import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from 'react-native'
import {Stack} from 'expo-router'
import {useFetchAPI} from '@/hooks/useFetchAPI'
import {ThemedText} from '@/components/ThemedText'
import Settingsbutton from '@/components/ui/Settingsbutton'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import SearchBar from '@/components/ui/SearchBar'
export default function Classes() {
  const {data, loading, error} = useFetchAPI('/clases', {})
  const [searchedClasses, setSearchedClasses] = useState<any[]>([])

  const colors = ['#CC7751', '#518893', '#B0A462']
  const nivels = ['Principiante', 'Intermedio', 'Experto']
  const colorNivel = (nivel: number) => colors[nivel - 1]
  const TextNivel = (nivel: number) => nivels[nivel - 1]

  const fakeDelay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const searchClass = async (text: string) => {
    await fakeDelay(1000)
    if (text.trim() === '') {
      setSearchedClasses(data)
    } else {
      const validationSource = data.filter((item: any) => item.titulo)
      const filteredClasses = validationSource.filter((item: any) => {
        return item.titulo.toLowerCase().includes(text.toLowerCase())
      })
      setSearchedClasses(filteredClasses)
    }
  }

  const clearSearch = () => {
    setSearchedClasses(data)
  }

  useEffect(() => {
    setSearchedClasses(data)
  }, [data])

  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Bottomnav' as never)
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [navigation]),
  )

  return (
    <ScrollView
      scrollEventThrottle={16}
      bounces={false}
      style={styles.container}>
      <SafeAreaView>
        <Stack.Screen options={{headerShown: false}} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{color: '#fff', fontSize: 20, fontFamily: 'Copperplate'}}>
            CLASES VIRTUALES
          </Text>
          <Settingsbutton />
        </View>
        <SearchBar
          onSearch={searchClass}
          onClear={clearSearch}
        />
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 80}}>
          {searchedClasses &&
            Array.from({length: 3}).map((_, outerIndex) =>
              searchedClasses.map((item: any, index: number) => (
                <View
                  key={`${outerIndex}-${index}`}
                  style={{width: '50%', padding: 8}}>
                  <Image
                    style={{height: 150, width: '100%', borderRadius: 8}}
                    source={{uri: item.imagen}}
                    resizeMode='cover'
                  />
                  <ThemedText
                    type='subtitle'
                    style={{fontFamily: 'Myriad Pro'}}>
                    {item.titulo}
                  </ThemedText>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: colorNivel(item.nivel)}}>
                      {TextNivel(item.nivel)}
                    </Text>
                    <View style={{paddingHorizontal: 8}}>
                      <Text style={{color: '#fff'}}>•</Text>
                    </View>
                    <Text style={{color: '#fff'}}>{item.time}</Text>
                  </View>
                </View>
              )),
            )}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D1B',
    color: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    position: 'absolute',
    height: '100%',
    paddingTop: 64,
  },
})
