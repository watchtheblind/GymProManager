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
import {MaterialIcons} from '@expo/vector-icons'
import Tabs from '@/components/common/Tabs'
import GenericCard from '@/components/common/GenericCard'
import {useFilter} from '@/hooks/Common/useFilter'
import Header from '@/components/common/Header'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {fetchRutinas, getProgramas} from '@/hooks/Data/Endpoints'
import SearchBar from '@/components/common/SearchBar'

// Interfaz para una rutina
interface Rutina {
  ID: string
  modified: string
  nombre: string
  descripcion: string
  ejercicios: string // JSON serializado
}

export default function WorkoutList() {
  const [activeTab, setActiveTab] = useState('rutinas')
  const [searchQuery, setSearchQuery] = useState('')
  const [rutinas, setRutinas] = useState<Rutina[]>([])
  const [programas, setProgramas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRutina, setSelectedRutina] = useState<Rutina | null>(null)
  const [selectedPrograma, setSelectedPrograma] = useState<any | null>(null)
  const [rutinaFavorites, setRutinaFavorites] = useState<string[]>([])
  const [programaFavorites, setProgramaFavorites] = useState<string[]>([])
  const [showRutinaFavorites, setShowRutinaFavorites] = useState(false)
  const [showProgramaFavorites, setShowProgramaFavorites] = useState(false)
  const navigation = useNavigation()

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
        const data = await fetchRutinas(token)
        setRutinas(Array.isArray(data) ? data : [data])
      } catch (error) {
        console.error('Error loading rutinas:', error)
      }
    }
    loadRutinas()
  }, [])

  // Cargar programas desde el endpoint
  useEffect(() => {
    const loadProgramas = async () => {
      try {
        const token = 'Contraseña...' // Reemplaza con tu token real
        const data = await getProgramas(token)
        setProgramas(Array.isArray(data) ? data : [data])
      } catch (error) {
        console.error('Error loading programas:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProgramas()
  }, [])

  // Funciones para alternar favoritos
  const toggleRutinaFavorite = (id: string) => {
    if (rutinaFavorites.includes(id)) {
      setRutinaFavorites(rutinaFavorites.filter((favId) => favId !== id))
    } else {
      setRutinaFavorites([...rutinaFavorites, id])
    }
  }

  const toggleProgramaFavorite = (id: string) => {
    if (programaFavorites.includes(id)) {
      setProgramaFavorites(programaFavorites.filter((favId) => favId !== id))
    } else {
      setProgramaFavorites([...programaFavorites, id])
    }
  }

  // Filtrar rutinas
  const filteredRutinas = useFilter({
    searchQuery,
    showFavorites: showRutinaFavorites,
    favorites: rutinaFavorites,
    data: rutinas,
    searchKeys: ['nombre', 'descripcion'],
  })

  // Filtrar programas
  const filteredProgramas = useFilter({
    searchQuery,
    showFavorites: showProgramaFavorites,
    favorites: programaFavorites,
    data: programas,
    searchKeys: ['nombre', 'descripcion'],
  })

  const tabs = [
    {id: 'rutinas', label: 'Rutinas'},
    {id: 'mis-entrenamientos', label: 'Mis entrenamientos'},
  ]

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
      <SearchBar
        onSearch={(query) => setSearchQuery(query)}
        onClear={() => setSearchQuery('')}
      />
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesText}>Ver solo mis favoritos</Text>
        <Switch
          value={showRutinaFavorites}
          onValueChange={setShowRutinaFavorites}
          trackColor={{false: '#767577', true: '#FEF4C9'}}
          thumbColor={showRutinaFavorites ? '#B0A462' : '#f4f3f4'}
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
            <GenericCard
              title={item.nombre}
              subtitle={item.descripcion}
              type='rutina'
              isFavorite={rutinaFavorites.includes(item.ID)}
              onToggleFavorite={() => toggleRutinaFavorite(item.ID)}
              onViewDetails={() => setSelectedRutina(item)} // Abrir modal
            />
          )}
          keyExtractor={(item) => item.ID}
          numColumns={1}
          contentContainerStyle={styles.workoutList}
        />
      )}
    </View>
  )

  const MyWorkoutsContent = () => (
    <View style={{flex: 1}}>
      <SearchBar
        onSearch={(query) => setSearchQuery(query)}
        onClear={() => setSearchQuery('')}
      />
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesText}>Ver solo mis favoritos</Text>
        <Switch
          value={showProgramaFavorites}
          onValueChange={setShowProgramaFavorites}
          trackColor={{false: '#767577', true: '#FEF4C9'}}
          thumbColor={showProgramaFavorites ? '#B0A462' : '#f4f3f4'}
        />
      </View>
      {filteredProgramas.length === 0 ? (
        <View style={styles.noWorkoutsContainer}>
          <Text style={styles.noWorkoutsText}>
            No hay programas disponibles
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProgramas}
          renderItem={({item}) => (
            <GenericCard
              title={item.nombre}
              subtitle={item.descripcion}
              type='programa'
              isFavorite={programaFavorites.includes(item.ID)}
              onToggleFavorite={() => toggleProgramaFavorite(item.ID)}
              onViewDetails={() => setSelectedPrograma(item)} // Abrir modal
            />
          )}
          keyExtractor={(item) => item.ID}
          numColumns={1}
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
            onBackPress={handlePress}
          />
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
        {activeTab === 'rutinas' ? <RoutinesContent /> : <MyWorkoutsContent />}
        {/* Modal para Rutinas */}
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
                  <Text style={styles.modalTitle}>{selectedRutina.nombre}</Text>
                  <Text style={styles.modalDescription}>
                    {selectedRutina.descripcion}
                  </Text>
                </View>
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
        {/* Modal para Programas */}
        {selectedPrograma && (
          <Modal
            visible={!!selectedPrograma}
            transparent
            animationType='fade'
            onRequestClose={() => setSelectedPrograma(null)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => setSelectedPrograma(null)}
                  style={styles.closeButton}>
                  <MaterialIcons
                    name='close'
                    size={17}
                    color='white'
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.modalTitle}>
                    {selectedPrograma.nombre}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedPrograma.descripcion}
                  </Text>
                </View>
                {JSON.parse(selectedPrograma.rutinas).map(
                  (rutina: any, index: number) => (
                    <View
                      key={index}
                      style={styles.exerciseItem}>
                      <Text style={styles.exerciseType}>
                        {rutina.tipo === 'texto' ? 'Información:' : 'Rutina:'}
                      </Text>
                      <Text
                        style={styles.exerciseValue}
                        ellipsizeMode='tail'>
                        {rutina.valor}
                      </Text>
                    </View>
                  ),
                )}
                <TouchableOpacity
                  onPress={() => {
                    // Lógica de inscripción/desinscripción
                    setSelectedPrograma(null) // Cerrar modal después de la acción
                  }}
                  style={styles.signUpButton}>
                  <Text style={styles.signUpButtonText}>
                    {selectedPrograma.isEnrolled
                      ? 'Desinscribirme'
                      : 'Inscribirme'}
                  </Text>
                </TouchableOpacity>
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
    marginBottom: 19,
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
    marginBottom: 10,
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
    fontFamily: 'MyriadPro',
  },
  workoutList: {
    paddingBottom: 5,
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
  signUpButton: {
    backgroundColor: '#B0A462',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontFamily: 'MyriadPro',
    textAlign: 'center',
  },
})
