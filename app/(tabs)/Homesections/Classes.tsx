import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native'
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
  const [thumbnails, setThumbnails] = useState<{[key: string]: string}>({})

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

  // Función para obtener la miniatura de Vimeo
  const getVimeoThumbnail = async (videoId: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://vimeo.com/api/v2/video/${videoId}.json`,
      )
      const data = await response.json()
      return data[0].thumbnail_medium // O thumbnail_large
    } catch (error) {
      console.error('Error al obtener la miniatura de Vimeo:', error)
      return 'https://via.placeholder.com/640x360?text=Thumbnail+no+disponible' // Placeholder en caso de error
    }
  }

  // Función para generar la thumbnail de YouTube
  const getYoutubeThumbnail = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  // Función para extraer la ID del video y determinar la plataforma
  const extractVideoIdAndPlatform = (
    url: string,
  ): {platform: 'vimeo' | 'youtube' | null; videoId: string | null} => {
    // Detectar si es Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/video\/(\d+)/)
    if (vimeoMatch) {
      return {platform: 'vimeo', videoId: vimeoMatch[1]}
    }

    // Detectar si es YouTube
    const youtubeMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
    if (youtubeMatch) {
      return {platform: 'youtube', videoId: youtubeMatch[1]}
    }

    // Si no es ninguna de las dos plataformas
    console.error('URL no soportada:', url)
    return {platform: null, videoId: null}
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'Contraseña...' // Reemplaza con tu token real
        const data = await fetchEjercicios(token, undefined) // Habilitar caché

        // Decodificar las URLs antes de guardar los datos
        const decodedData = data.map((item: Ejercicio) => ({
          ...item,
          url: decodeURIComponent(item.url), // Decodificar la URL
        }))

        setEjercicios(decodedData)
        setSearchedEjercicios(decodedData)

        // Obtener miniaturas de Vimeo
        const thumbnailPromises = decodedData.map(async (item) => {
          const {platform, videoId} = extractVideoIdAndPlatform(item.url)
          if (platform === 'vimeo' && videoId) {
            const thumbnailUrl = await getVimeoThumbnail(videoId)
            setThumbnails((prev) => ({...prev, [item.ID]: thumbnailUrl}))
          } else if (platform === 'youtube' && videoId) {
            const thumbnailUrl = getYoutubeThumbnail(videoId)
            setThumbnails((prev) => ({...prev, [item.ID]: thumbnailUrl}))
          }
        })

        await Promise.all(thumbnailPromises)
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

  // Indicador de carga
  if (loading) {
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
          {searchedEjercicios.map((item, index) => {
            const thumbnailUrl =
              thumbnails[item.ID] ||
              'https://via.placeholder.com/640x360?text=Thumbnail+no+disponible'

            return (
              <UniversalCard
                key={index}
                image={thumbnailUrl} // Usamos la URL de la thumbnail
                title={item.nombre}
                type={item.g_ejercicio_valor || 'Otro'} // Mostrar categoría o un valor por defecto
                accentColor={colorNivel(1)} // Puedes ajustar esto según el nivel
                level={item.g_muscular_valor || undefined} // Puedes ajustar esto según el nivel
                duration='GymPro' // Duración fija o dinámica si está disponible
                isFavorite={false} // Puedes manejar favoritos si es necesario
                showFavoriteIcon={false} // Oculta el ícono de favoritos si no lo necesitas
              />
            )
          })}
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
  loadingText: {
    color: '#B0A462',
    marginTop: 10,
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
