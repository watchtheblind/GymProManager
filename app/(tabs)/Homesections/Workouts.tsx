import React, {useState, useCallback} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  BackHandler,
  Switch,
} from 'react-native'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {MaterialIcons} from '@expo/vector-icons'
import Tabs from '@/components/common/Tabs'
import SearchBar from '@/components/common/SearchBar'
import {Settingsicon} from '@/components/ui/Bottomnav/Icons'
import UniversalCard from '@/components/ui/Card'
import {useFavorites} from '@/hooks/Activities/useFavorites'
import {useFilter} from '@/hooks/Common/useFilter' // Importamos el hook useFilter

// Tu JSON de workouts
const workouts = [
  {
    id: '1',
    type: 'Pilates',
    title: 'Entrenamiento de Core',
    level: 'Experto',
    duration: '32 min',
    accentColor: '#4FD1C5',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    type: 'Boxeo',
    title: 'Boxeo Cardio',
    level: 'Intermedio',
    duration: '45 min',
    accentColor: '#ED8936',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '3',
    type: 'HIIT',
    title: 'Quema Grasa Intenso',
    level: 'Principiante',
    duration: '25 min',
    accentColor: '#F06292',
    image:
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '4',
    type: 'Yoga',
    title: 'Yoga Flow',
    level: 'Experto',
    duration: '60 min',
    accentColor: '#A0D2EB',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
]

type Workout = {
  id: string
  type: string
  title: string
  level: string
  duration: string
  accentColor: string
  image: string
}

export default function WorkoutList() {
  const [activeTab, setActiveTab] = useState('listado')
  const [showFavorites, setShowFavorites] = useState(false)
  const {favorites, toggleFavorite} = useFavorites()
  const [searchQuery, setSearchQuery] = useState('')
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Bottomnav' as never)
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [navigation]),
  )

  // Usamos el hook useFilter para filtrar los workouts
  const filteredWorkouts = useFilter({
    searchQuery,
    showFavorites,
    favorites,
    data: workouts,
    searchKeys: ['title', 'type'], // Campos por los que se puede buscar
  })

  const onSearch = (text: string) => {
    setSearchQuery(text)
  }

  const onClear = () => {
    setSearchQuery('')
  }

  const tabs = [
    {id: 'listado', label: 'Listado'},
    {id: 'mis-entrenamientos', label: 'Mis entrenamientos'},
  ]

  const ListadoContent = () => (
    <View style={{flex: 1}}>
      <View className='flex flex-row justify-center items-center'>
        <View className='flex-3'>
          <View className='w-11/12'>
            <SearchBar
              onSearch={onSearch}
              onClear={onClear}
            />
          </View>
        </View>
        <View className='flex-1 flex items-center justify-center w-1/4'>
          <TouchableOpacity className='h-12 w-12 p-2 rounded-xl mr-2'>
            <Settingsicon size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesText}>Ver solo mis favoritos</Text>
        <Switch
          value={showFavorites}
          onValueChange={setShowFavorites}
          trackColor={{false: '#767577', true: '#FEF4C9'}}
          thumbColor={showFavorites ? '#B0A462' : '#f4f3f4'}
        />
      </View>

      {filteredWorkouts.length === 0 ? (
        <View style={styles.noWorkoutsContainer}>
          <Text style={styles.noWorkoutsText}>
            No hay entrenamientos disponibles
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredWorkouts}
          renderItem={({item}) => (
            <UniversalCard
              image={item.image}
              title={item.title}
              type={item.type}
              accentColor={item.accentColor}
              level={item.level}
              duration={item.duration}
              isFavorite={favorites.includes(item.id)}
              onFavoritePress={() => toggleFavorite(item.id)}
              showFavoriteIcon={true}
            />
          )}
          keyExtractor={(item) => item.id}
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Bottomnav' as never)}
            style={styles.backButton}>
            <MaterialIcons
              name='arrow-back'
              color='white'
              size={24}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text
              style={styles.headerText}
              className='uppercase'>
              Listado de
            </Text>
            <Text
              style={styles.headerText}
              className='uppercase'>
              Entrenamientos
            </Text>
          </View>
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
          <ListadoContent />
        ) : (
          <View style={styles.misEntrenamientosContent}>
            <Text style={styles.misEntrenamientosText}>
              Contenido de Mis Entrenamientos
            </Text>
          </View>
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
  headerTextContainer: {
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'Copperplate',
  },
  backButton: {
    position: 'absolute',
    left: 0,
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
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#9CA3AF',
  },
  favoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  favoritesText: {
    color: '#fff',
    marginRight: 8,
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
})
