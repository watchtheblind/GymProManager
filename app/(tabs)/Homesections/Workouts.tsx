import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Switch,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {MaterialIcons} from '@expo/vector-icons' // Importar Material Icons
import Tabs from '@/components/common/Tabs'
import Card from '@/components/ui/Card'
import {useFavorites} from '@/hooks/Activities/useFavorites'
import {useFilter} from '@/hooks/Common/useFilter'
import Header from '@/components/common/Header'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {fetchRutinas} from '@/hooks/Data/Endpoints'

// Interfaz para una rutina
interface Rutina {
  ID: string
  modified: string
  nombre: string
  descripcion: string
  ejercicios: string // JSON serializado
}

export default function WorkoutList() {
  const [activeTab, setActiveTab] = useState('listado')
  const [showFavorites, setShowFavorites] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [rutinas, setRutinas] = useState<Rutina[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRutina, setSelectedRutina] = useState<Rutina | null>(null) // Estado para el modal
  const navigation = useNavigation()
  const {favorites, toggleFavorite} = useFavorites()

  const handlePress = () => {
    navigation.goBack()
  }

  useBackHandler(() => {
    navigation.goBack()
    return true
  })

  // Cargar rutinas desde el endpoint
  useEffect(() => {
    const loadRutinas = async () => {
      try {
        const token = 'Contraseña...' // Reemplaza con tu token real
        const data = await fetchRutinas(token) // Obtener todas las rutinas
        setRutinas(Array.isArray(data) ? data : [data]) // Asegurar que siempre sea un array
      } catch (error) {
        console.error('Error loading rutinas:', error)
      } finally {
        setLoading(false)
      }
    }
    loadRutinas()
  }, [])

  // Filtrar rutinas usando el hook useFilter
  const filteredRutinas = useFilter({
    searchQuery,
    showFavorites,
    favorites,
    data: rutinas,
    searchKeys: ['nombre', 'descripcion'], // Campos por los que se puede buscar
  })

  const tabs = [
    {id: 'listado', label: 'Rutinas'},
    {id: 'mis-entrenamientos', label: 'Mis entrenamientos'},
  ]

  // Loader personalizado
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

  const RoutinesContent = () => (
    <View style={{flex: 1}}>
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesText}>Ver solo mis favoritos</Text>
        <Switch
          value={showFavorites}
          onValueChange={setShowFavorites}
          trackColor={{false: '#767577', true: '#FEF4C9'}}
          thumbColor={showFavorites ? '#B0A462' : '#f4f3f4'}
        />
      </View>
      {filteredRutinas.length === 0 ? (
        <View style={styles.noWorkoutsContainer}>
          <Text style={styles.noWorkoutsText}>No hay rutinas disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRutinas}
          renderItem={({item}) => (
            <Card
              title={item.nombre}
              subtitle={item.descripcion}
              accentColor='#14b8a6'
              isFavorite={favorites.includes(item.ID)}
              onFavoritePress={() => toggleFavorite(item.ID)}
              showFavoriteIcon={true}
              onPress={() => setSelectedRutina(item)} // Abrir el modal con la rutina seleccionada
            />
          )}
          keyExtractor={(item) => item.ID}
          numColumns={2}
          columnWrapperStyle={styles.workoutRow}
          contentContainerStyle={styles.workoutList}
        />
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Header
            title='RUTINAS'
            onBackPress={handlePress}></Header>
        </View>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
          containerStyle={styles.tabContainer}
          tabStyle={styles.tabButton}
          activeTabStyle={styles.activeTab}
          tabTextStyle={styles.inactiveTabText}
          activeTabTextStyle={styles.activeTabText}
        />
        {activeTab === 'listado' ? (
          <RoutinesContent />
        ) : (
          <View style={styles.misEntrenamientosContent}>
            <Text style={styles.misEntrenamientosText}>
              Contenido de Mis Entrenamientos
            </Text>
          </View>
        )}

        {/* Modal */}
        {selectedRutina && (
          <Modal
            visible={!!selectedRutina}
            transparent
            animationType='fade'
            onRequestClose={() => setSelectedRutina(null)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => setSelectedRutina(null)}
                  style={styles.closeButton}>
                  <MaterialIcons
                    name='close'
                    size={17}
                    color='white'
                  />
                </TouchableOpacity>
                <View>
                  <Text
                    style={styles.modalTitle}
                    ellipsizeMode='tail'>
                    {selectedRutina.nombre}
                  </Text>
                  <Text
                    style={styles.modalDescription}
                    ellipsizeMode='tail'>
                    {selectedRutina.descripcion}
                  </Text>
                </View>

                {/* Mostrar los ejercicios */}
                {JSON.parse(selectedRutina.ejercicios).map(
                  (ejercicio: any, index: number) => (
                    <View
                      key={index}
                      style={styles.exerciseItem}>
                      <Text style={styles.exerciseType}>
                        {ejercicio.tipo === 'texto'
                          ? 'Información:'
                          : 'Ejercicio:'}
                      </Text>
                      <Text
                        style={styles.exerciseValue}
                        ellipsizeMode='tail'>
                        {ejercicio.valor}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginTop: 50,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'MyriadPro',
  },
  favoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  favoritesText: {
    color: '#14b8a6',
    marginRight: 8,
    fontFamily: 'MyriadPro',
    fontSize: 16,
  },
  noWorkoutsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWorkoutsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  misEntrenamientosContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  misEntrenamientosText: {
    color: '#fff',
    fontSize: 18,
  },
  workoutRow: {
    justifyContent: 'space-between',
  },
  workoutList: {
    paddingBottom: 5,
    height: 'auto',
  },
  tabContainer: {
    backgroundColor: '#333333',
    borderRadius: 999,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  activeTab: {
    backgroundColor: '#B5AD6F',
  },
  inactiveTabText: {
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'MyriadProBold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseType: {
    fontFamily: 'MyriadProBold',
    fontSize: 16,
    marginRight: 5,
    color: '#14b8a6',
  },
  exerciseValue: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontFamily: 'MyriadPro',
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    top: 3,
    right: 3,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
