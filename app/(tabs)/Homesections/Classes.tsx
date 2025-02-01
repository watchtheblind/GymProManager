import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from 'react-native'
import {Stack} from 'expo-router'
import {useFetchAPI} from '@/hooks/useFetchAPI'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import SearchBar from '@/components/ui/SearchBar'
import UniversalCard from '@/components/ui/Card'
import Settingsbutton from '@/components/ui/Settingsbutton'

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
        <View style={styles.header}>
          <Text style={styles.headerText}>CLASES VIRTUALES</Text>
          <Settingsbutton />
        </View>
        <SearchBar
          onSearch={searchClass}
          onClear={clearSearch}
        />
        <View style={styles.cardsContainer}>
          {searchedClasses.map((item: any, index: number) => (
            <UniversalCard
              key={index}
              image={item.imagen}
              title={item.titulo}
              type={item.tipo} // Asegúrate de que la API devuelva un campo "tipo"
              accentColor={colorNivel(item.nivel)}
              level={TextNivel(item.nivel)}
              duration={item.time}
              isFavorite={false} // Puedes manejar favoritos si es necesario
              onFavoritePress={() => console.log('Favorito presionado')}
              showFavoriteIcon={false} // Oculta el ícono de favoritos si no lo necesitas
            />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D1B',
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Copperplate',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 80,
    gap: 12,
  },
})
