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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/*header*/}
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
          <View>
            <Text
              style={styles.headerText}
              className='uppercase'>
              listado de
            </Text>
            <View style={{height: 5}} /> {/* Espacio entre las líneas */}
            <Text
              style={styles.headerText}
              className='uppercase'>
              entrenamientos
            </Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('listado')}
            style={[
              styles.tabButton,
              activeTab === 'listado' && styles.activeTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'listado'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}>
              Listado
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('mis-entrenamientos')}
            style={[
              styles.tabButton,
              activeTab === 'mis-entrenamientos' && styles.activeTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'mis-entrenamientos'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}>
              Mis entrenamientos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <SearchBar
            onSearch={searchClass}
            onClear={clearSearch}
          />
        </View>

        <View style={styles.favoritesContainer}>
          <Text style={styles.favoritesText}>Ver solo mis favoritos</Text>
          <TouchableOpacity
            onPress={() => setShowFavorites(!showFavorites)}
            style={[
              styles.toggleButton,
              showFavorites ? styles.toggleButtonOn : styles.toggleButtonOff,
            ]}>
            <View
              style={[
                styles.toggleCircle,
                {marginLeft: showFavorites ? 24 : 4},
              ]}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderRadius: 999,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  activeTab: {
    backgroundColor: '#B5AD6F',
  },
  tabText: {
    textAlign: 'center',
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
    position: 'relative',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  levelBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#B5AD6F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomRightRadius: 12,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
  },
  workoutInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
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
})
