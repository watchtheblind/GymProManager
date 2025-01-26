import type React from 'react'
import {useState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Switch,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import Settingsbutton from '@/components/ui/Settingsbutton'
type ActivityType = 'yoga' | 'cardio' | 'pilates' | 'strength' | 'dance'

interface Activity {
  id: string
  name: string
  time: string
  date: string
  instructor: string
  capacity: number
  available: number
  type: ActivityType
}

interface DateButton {
  date: Date
  day: number
  month: string
}

const API_TOKEN = 'gym_manager_2024_token'
const API_URL = 'https://your-api-url.com/api/activities' // Replace with your actual API URL

const getNextTwoWeeks = (): DateButton[] => {
  const dates = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push({
      date: date,
      day: date.getDate(),
      month: date.toLocaleString('es', {month: 'short'}),
    })
  }

  return dates
}

const fetchActivities = async (date: string): Promise<Activity[]> => {
  const url = `${API_URL}?date=${date}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch activities')
  }

  const data = await response.json()
  return data.activities
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])
  const [dates] = useState<DateButton[]>(getNextTwoWeeks())

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        const data = await fetchActivities(
          selectedDate.toISOString().split('T')[0],
        )
        setActivities(data)
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [selectedDate])

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesFavorites = showFavorites
      ? favorites.includes(activity.id)
      : true
    return matchesSearch && matchesFavorites
  })

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    )
  }

  const getActivityTypeColor = (type: ActivityType): string => {
    const colors: Record<ActivityType, string> = {
      yoga: '#9333ea',
      cardio: '#dc2626',
      pilates: '#2563eb',
      strength: '#ea580c',
      dance: '#db2777',
    }
    return colors[type]
  }

  const renderDateButton = ({item}: {item: DateButton}) => (
    <TouchableOpacity
      style={[
        styles.dateButton,
        item.date.toDateString() === selectedDate.toDateString() &&
          styles.selectedDateButton,
      ]}
      onPress={() => setSelectedDate(item.date)}>
      <Text style={styles.dateButtonDay}>{item.day}</Text>
      <Text style={styles.dateButtonMonth}>{item.month}</Text>
    </TouchableOpacity>
  )

  const renderActivity = ({item}: {item: Activity}) => (
    <View
      style={[
        styles.activityCard,
        {backgroundColor: `${getActivityTypeColor(item.type)}20`},
      ]}>
      <View>
        <Text style={styles.activityName}>{item.name}</Text>
        <Text style={styles.activityDetails}>
          {item.time} - {item.instructor}
        </Text>
        <Text style={styles.activityDetails}>
          Disponibles: {item.available}/{item.capacity}
        </Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Text style={styles.favoriteIcon}>
          {favorites.includes(item.id) ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.header}
        className='mt-12'>
        <Text style={styles.title}>ACTIVIDADES</Text>
        <Settingsbutton></Settingsbutton>
      </View>

      <TextInput
        placeholder='Buscar'
        placeholderTextColor={'#fff'}
        className='pl-12 pr-10 py-2 text-white rounded-bl-3xl rounded-tr-3xl bg-[#B0A462] border-2 border-solid border-[#FEF4C9]'
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.favoritesToggle}>
        <Switch
          value={showFavorites}
          onValueChange={setShowFavorites}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={showFavorites ? '#f5dd4b' : '#f4f3f4'}
        />
        <Text style={styles.favoritesText}>Ver mis favoritas</Text>
      </View>

      <Text style={styles.dateInstructions}>
        Seleccione una <Text style={styles.highlightText}>fecha</Text> y{' '}
        <Text style={styles.highlightText}>hora</Text>
      </Text>

      <FlatList
        horizontal
        data={dates}
        renderItem={renderDateButton}
        keyExtractor={(item) => item.date.toISOString()}
        style={styles.dateList}
      />

      {loading ? (
        <ActivityIndicator
          size='large'
          color='#14b8a6'
          style={styles.loader}
        />
      ) : filteredActivities.length === 0 ? (
        <Text style={styles.noActivities}>
          No hay actividades disponibles para esta fecha
        </Text>
      ) : (
        <FlatList
          data={filteredActivities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id}
          style={styles.activityList}
        />
      )}

      <Text style={styles.footer}>GYM PRO MANAGER</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1B',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Copperplate',
  },
  searchButton: {
    backgroundColor: 'rgba(20, 184, 166, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 20,
  },
  searchInput: {},
  favoritesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  favoritesText: {
    color: 'white',
    marginLeft: 8,
  },
  dateInstructions: {
    color: 'white',
    marginBottom: 16,
  },
  highlightText: {
    color: '#14b8a6',
  },
  dateList: {
    marginBottom: 24,
  },
  dateButton: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(20, 184, 166, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedDateButton: {
    backgroundColor: '#14b8a6',
  },
  dateButtonDay: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateButtonMonth: {
    color: 'white',
    fontSize: 12,
  },
  activityList: {
    flex: 1,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  activityName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDetails: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#fbbf24',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noActivities: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: 32,
  },
  footer: {
    color: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    marginTop: 16,
  },
})

export default App
