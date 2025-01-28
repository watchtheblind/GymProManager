import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import SearchBar from '@/components/ui/SearchBar'
import {MaterialIcons} from '@expo/vector-icons'
import Tabs from '@/components/Tabs'

const workouts = [
  {
    id: '1',
    title: 'Entrenamiento Funcional',
    level: 'Experto',
    duration: '32 min',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    title: 'Boxeo',
    level: 'Intermedio',
    duration: '32 min',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '3',
    title: 'HIIT',
    level: 'Principiante',
    duration: '32 min',
    image:
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '4',
    title: 'Yoga',
    level: 'Experto',
    duration: '32 min',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
]

export default function WorkoutList() {
  const [activeTab, setActiveTab] = useState('listado')
  const [showFavorites, setShowFavorites] = useState(false)

  const searchClass = (text: string) => {
    console.log('Searching:', text)
  }

  const clearSearch = () => {
    console.log('Clear search')
  }

  type Workout = {
    id: string
    title: string
    level: string
    duration: string
    image: string
  }

  const WorkoutCard = ({workout}: {workout: Workout}) => (
    <View style={styles.workoutCard}>
      <Image
        source={{uri: workout.image}}
        style={styles.workoutImage}
        resizeMode='cover'
      />
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>{workout.level}</Text>
      </View>
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{workout.title}</Text>
        <Text style={styles.workoutDuration}>{workout.duration}</Text>
      </View>
    </View>
  )

  const tabs = [
    {id: 'listado', label: 'Listado'},
    {id: 'mis-entrenamientos', label: 'Mis entrenamientos'},
  ]

  const ListadoContent = () => (
    <>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <SearchBar
          onSearch={searchClass}
          onClear={clearSearch}
        />
      </View>

      {/* Favorites Toggle */}
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesText}>Ver solo mis favoritos</Text>
        <TouchableOpacity
          onPress={() => setShowFavorites(!showFavorites)}
          style={[
            styles.toggleButton,
            showFavorites ? styles.toggleButtonOn : styles.toggleButtonOff,
          ]}>
          <View
            style={[styles.toggleCircle, {marginLeft: showFavorites ? 24 : 4}]}
          />
        </TouchableOpacity>
      </View>

      {/* Workout Cards */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </ScrollView>
    </>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
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
            <Text style={styles.headerText}>Listado de</Text>
            <Text style={styles.headerText}>Entrenamientos</Text>
          </View>
        </View>

        {/* Tabs */}
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

        {/* Conditional Content */}
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
    fontSize: 18,
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
    marginBottom: 16,
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
  searchBarContainer: {
    marginBottom: 16,
  },
  favoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  favoritesText: {
    color: '#fff',
    marginRight: 8,
  },
  toggleButton: {
    width: 48,
    height: 24,
    borderRadius: 999,
    justifyContent: 'center',
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
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  levelBadge: {
    backgroundColor: '#B5AD6F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomRightRadius: 12,
    margin: 8,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
  },
  workoutInfo: {
    padding: 8,
  },
  workoutTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  workoutDuration: {
    color: '#fff',
    fontSize: 12,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
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
