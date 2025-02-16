import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native'
import {WebView} from 'react-native-webview'
import {Stack} from 'expo-router'
import {fetchEjercicios} from '@/hooks/Data/Endpoints'
import {useNavigation} from '@react-navigation/native'
import SearchBar from '@/components/common/SearchBar'
import Card from '@/components/ui/Card'
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null) // URL del video seleccionado
  const colors = ['#CC7751', '#518893', '#B0A462']
  const nivels = ['Principiante', 'Intermedio', 'Experto']
  const colorNivel = (nivel: number) => colors[nivel - 1]

  const searchClass = async (text: string) => {
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
    const vimeoMatch = url.match(/vimeo\.com\/video\/(\d+)/)
    if (vimeoMatch) {
      return {platform: 'vimeo', videoId: vimeoMatch[1]}
    }
    const youtubeMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
    if (youtubeMatch) {
      return {platform: 'youtube', videoId: youtubeMatch[1]}
    }
    console.error('URL no soportada:', url)
    return {platform: null, videoId: null}
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'Contraseña...' // Reemplaza con tu token real
        const data = await fetchEjercicios(token, undefined) // Habilitar caché
        const decodedData = data.map((item: Ejercicio) => ({
          ...item,
          url: decodeURIComponent(item.url),
        }))
        setEjercicios(decodedData)
        setSearchedEjercicios(decodedData)
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
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{headerShown: false}} />
      <Header
        title='CLASES VIRTUALES'
        onBackPress={handlePress}
      />
      <SearchBar
        onSearch={searchClass}
        onClear={clearSearch}
      />
      <FlatList
        data={searchedEjercicios}
        keyExtractor={(item) => item.ID}
        numColumns={2} // Dos columnas
        contentContainerStyle={styles.flatListContent} // Estilo para el contenedor interno
        columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
        renderItem={({item}) => {
          const thumbnailUrl =
            thumbnails[item.ID] ||
            'https://via.placeholder.com/640x360?text=Thumbnail+no+disponible'
          return (
            <Card
              image={thumbnailUrl}
              title={item.nombre}
              type={item.g_ejercicio_valor || 'Otro'}
              accentColor={colorNivel(1)}
              level={item.g_muscular_valor || undefined}
              duration='GymPro'
              isFavorite={false}
              showFavoriteIcon={false}
              onPress={() => setSelectedVideo(item.url)} // Abrir el video seleccionado
            />
          )
        }}
      />

      {/* Modal para el reproductor de video */}
      <Modal
        visible={!!selectedVideo}
        animationType='slide'
        onRequestClose={() => setSelectedVideo(null)}>
        <View style={styles.modalContainer}>
          <WebView
            source={{uri: selectedVideo || ''}}
            style={styles.webview}
            allowsFullscreenVideo={true} // Habilita pantalla completa
            mediaPlaybackRequiresUserAction={false} // Habilita autoplay
          />
          <TouchableOpacity
            onPress={() => setSelectedVideo(null)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  flatListContent: {
    paddingBottom: 80, // Espacio al final para evitar recortes
  },
  columnWrapper: {
    justifyContent: 'space-between', // Añade espacio entre las columnas
    alignItems: 'stretch',
    paddingBlock: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1D1D1B',
  },
  webview: {
    flex: 1,
    backgroundColor: '#1D1D1B',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#5D5D5B',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontFamily: 'MyriadPro',
    fontWeight: '500',
  },
})
