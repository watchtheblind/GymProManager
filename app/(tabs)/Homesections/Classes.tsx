import React, {useEffect, useState} from 'react'
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native'
import {Stack} from 'expo-router'
import {fetchEjercicios} from '@/hooks/Data/Endpoints'
import {useNavigation} from '@react-navigation/native'
import SearchBar from '@/components/ui/SearchBar'
import UniversalCard from '@/components/ui/Card'
import Header from '@/components/common/Header'
import useBackHandler from '@/hooks/Common/useBackHandler'

// Definición del tipo para un ejercicio
type Ejercicio = {
  ID: string
  modified: string
  nombre: string
  descripcion: string
  url: string
  g_ejercicio_valor: string | null
  g_muscular_valor: string | null
}

export default function Classes() {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([])
  const [searchedEjercicios, setSearchedEjercicios] = useState<Ejercicio[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const colors = ['#CC7751', '#518893', '#B0A462']
  const nivels = ['Principiante', 'Intermedio', 'Experto']

  const colorNivel = (nivel: number) => colors[nivel - 1]
  const TextNivel = (nivel: number) => nivels[nivel - 1]

  const fakeDelay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const searchClass = async (text: string) => {
    await fakeDelay(1000)
    if (text.trim() === '') {
      setSearchedEjercicios(ejercicios)
    } else {
      const filteredEjercicios = ejercicios.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase()),
      )
      setSearchedEjercicios(filteredEjercicios)
    }
  }

  const clearSearch = () => {
    setSearchedEjercicios(ejercicios)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'Contraseña...' // Reemplaza con tu token real
        const data = await fetchEjercicios(token, undefined, true) // Habilitar caché
        setEjercicios(data)
        setSearchedEjercicios(data)
      } catch (err) {
        setError('Error al cargar los ejercicios')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const navigation = useNavigation()

  useBackHandler(() => {
    navigation.goBack()
    return true
  })

  const handlePress = () => {
    navigation.goBack()
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView
      scrollEventThrottle={16}
      bounces={false}
      style={styles.container}>
      <SafeAreaView>
        <Stack.Screen options={{headerShown: false}} />
        <Header
          title='CLASES VIRTUALES'
          onBackPress={handlePress}
        />
        <SearchBar
          onSearch={searchClass}
          onClear={clearSearch}
        />
        <View style={styles.cardsContainer}>
          {searchedEjercicios.map((item, index) => (
            <UniversalCard
              key={index}
              image={item.url} // Usamos la URL del video como imagen
              title={item.nombre}
              type={item.g_ejercicio_valor || 'Sin categoría'} // Mostrar categoría o un valor por defecto
              accentColor={colorNivel(1)} // Puedes ajustar esto según el nivel
              level={TextNivel(1)} // Puedes ajustar esto según el nivel
              duration={'30 min'} // Duración fija o dinámica si está disponible
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1B',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 80,
    gap: 12,
  },
})
