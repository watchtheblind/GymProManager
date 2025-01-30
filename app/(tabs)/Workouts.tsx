import {useState, useCallback} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  BackHandler,
} from 'react-native'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {MaterialIcons} from '@expo/vector-icons'
import Tabs from '@/components/Tabs'
import SearchBar from '@/components/ui/SearchBar'
import {Settingsicon} from '@/components/ui/Bottomnav/Icons'

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
  const [favorites, setFavorites] = useState<string[]>([])
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>(workouts)
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

  const filterWorkouts = useCallback(() => {
    let filtered = workouts
    if (searchQuery) {
      filtered = filtered.filter(
        (workout) =>
          workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workout.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }
    if (showFavorites) {
      filtered = filtered.filter((workout) => favorites.includes(workout.id))
    }
    setFilteredWorkouts(filtered)
  }, [searchQuery, showFavorites, favorites])

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id],
    )
  }

  const onSearch = (text: string) => {
    setSearchQuery(text)
    let filtered = workouts.filter(
      (workout) =>
        workout.title.toLowerCase().includes(text.toLowerCase()) ||
        workout.type.toLowerCase().includes(text.toLowerCase()),
    )
    if (showFavorites) {
      filtered = filtered.filter((workout) => favorites.includes(workout.id))
    }
    setFilteredWorkouts(filtered)
  }

  const onClear = () => {
    setSearchQuery('')
    setFilteredWorkouts(
      showFavorites
        ? workouts.filter((workout) => favorites.includes(workout.id))
        : workouts,
    )
  }

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev)
    if (!showFavorites) {
      setFilteredWorkouts(
        workouts.filter((workout) => favorites.includes(workout.id)),
      )
    } else {
      setFilteredWorkouts(workouts)
    }
  }

  const WorkoutCard = ({workout}: {workout: Workout}) => (
    <View style={styles.workoutCard}>
      <Image
        source={{uri: workout.image}}
        style={styles.workoutImage}
        resizeMode='cover'
      />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(workout.id)}>
        <MaterialIcons
          name={favorites.includes(workout.id) ? 'favorite' : 'favorite-border'}
          size={24}
          color='#fff'
        />
      </TouchableOpacity>
      <View
        style={[styles.typeTriangle, {backgroundColor: workout.accentColor}]}>
        <Text style={styles.typeText}>{workout.type}</Text>
      </View>
      <View style={styles.workoutOverlay}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutTitle}>{workout.title}</Text>
          <View style={styles.workoutMetaInfo}>
            <Text style={[styles.workoutLevel, {color: workout.accentColor}]}>
              {workout.level}
            </Text>
            <Text style={styles.workoutDot}>•</Text>
            <Text style={styles.workoutDuration}>{workout.duration}</Text>
          </View>
        </View>
      </View>
    </View>
  )

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
        <TouchableOpacity
          onPress={toggleShowFavorites}
          style={[
            styles.toggleButton,
            showFavorites ? styles.toggleButtonOn : styles.toggleButtonOff,
          ]}>
          <View
            style={[styles.toggleCircle, {marginLeft: showFavorites ? 24 : 4}]}
          />
        </TouchableOpacity>
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
          renderItem={({item}) => <WorkoutCard workout={item} />}
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
            onPress={() => console.log('Back')}
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
  toggleButton: {
    width: 48,
    height: 24,
    borderRadius: 999,
  },
  toggleButtonOn: {
    backgroundColor: '#B5AD6F',
  },
  toggleButtonOff: {
    backgroundColor: '#4B5563',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  workoutCard: {
    width: '48%',
    aspectRatio: 16 / 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    position: 'relative',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  typeTriangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-45deg'}],
    marginLeft: -20,
    marginTop: -5,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
    marginLeft: -6,
  },
  workoutOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  workoutInfo: {
    gap: 4,
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  workoutLevel: {
    fontSize: 14,
    fontWeight: '500',
  },
  workoutDot: {
    color: '#fff',
    opacity: 0.7,
  },
  workoutDuration: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
  },
  workoutRow: {
    justifyContent: 'space-between',
  },
  workoutList: {
    paddingBottom: 5,
    height: 'auto',
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
})
