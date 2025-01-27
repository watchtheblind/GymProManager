import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Switch,
  SafeAreaView,
} from 'react-native'
import Settingsbutton from '@/components/ui/Settingsbutton'
import SearchBar from '@/components/ui/SearchBar'
import moment from 'moment' // Importar moment.js para manejar fechas

type ActivityType = 'yoga' | 'cardio' | 'pilates' | 'strength' | 'dance'

interface Activity {
  id: string
  name: string
  time: string // Formato: "Jan 27, 2025 7:40 PM"
  type: ActivityType
  capacity: number
  available: number
  Instructor: string // Nota: El campo en la API es "Instructor" (con mayúscula)
}

interface DateButton {
  date: Date
  day: number
  month: string
}

const API_URL = 'https://retoolapi.dev/ugkMJ5/GYMACTIVITIESAPP' // Endpoint de la API

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
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch activities')
    }
    const data = await response.json()

    // Filtrar actividades por fecha
    const filteredData = data.filter((activity: Activity) => {
      const activityDate = moment(activity.time, 'MMM DD, YYYY h:mm A').format(
        'YYYY-MM-DD',
      )
      return activityDate === date
    })

    return filteredData
  } catch (error) {
    console.error('Error fetching activities:', error)
    throw error
  }
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activities, setActivities] = useState<Activity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])
  const [dates] = useState<DateButton[]>(getNextTwoWeeks())
  const [error, setError] = useState<string | null>(null)

  // Cargar actividades cuando cambia la fecha seleccionada
  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        setError(null)
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD') // Formatear fecha seleccionada
        const data = await fetchActivities(formattedDate)
        setActivities(data)
        setFilteredActivities(data)
      } catch (error) {
        console.error('Error fetching activities:', error)
        setError('Failed to load activities. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [selectedDate])

  // Función para buscar actividades
  const searchClass = (text: string) => {
    setSearchQuery(text)
    if (text.trim() === '') {
      setFilteredActivities(activities)
    } else {
      const filtered = activities.filter((activity) =>
        activity.name.toLowerCase().includes(text.toLowerCase()),
      )
      setFilteredActivities(filtered)
    }
  }

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    setSearchQuery('')
    setFilteredActivities(activities)
  }

  // Filtrar actividades por favoritos si está activado
  const finalActivities = showFavorites
    ? filteredActivities.filter((activity) => favorites.includes(activity.id))
    : filteredActivities

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

    // Color predeterminado para actividades no clasificadas
    const defaultColor = '#9A9A98' // Un tono oscuro similar al fondo, pero con contraste

    // Si el tipo no está en la lista, devuelve el color predeterminado
    return colors[type] || defaultColor
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

  const renderActivity = ({item}: {item: Activity}) => {
    // Separar fecha y hora
    const activityDateTime = moment(item.time, 'MMM DD, YYYY h:mm A')
    const activityDate = activityDateTime.format('YYYY-MM-DD')
    const activityTime = activityDateTime.format('h:mm A')

    return (
      <View
        style={[
          styles.activityCard,
          {backgroundColor: `${getActivityTypeColor(item.type)}20`},
        ]}>
        <View>
          <Text style={styles.activityName}>{item.name}</Text>
          <Text style={styles.activityDetails}>
            {activityTime} - {item.Instructor} {/* Usar item.Instructor */}
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.header}
        className='mt-10'>
        <Text style={styles.title}>ACTIVIDADES</Text>
        <Settingsbutton />
      </View>

      {/* Barra de búsqueda */}
      <SearchBar
        onSearch={searchClass}
        onClear={clearSearch}
      />

      <View style={styles.favoritesToggle}>
        <Switch
          value={showFavorites}
          onValueChange={setShowFavorites}
          trackColor={{false: '#767577', true: '#FEF4C9'}}
          thumbColor={showFavorites ? '#B0A462' : '#f4f3f4'}
        />
        <Text
          style={styles.favoritesText}
          className='text-lg'>
          Ver mis favoritas
        </Text>
      </View>

      <Text
        style={styles.dateInstructions}
        className='text-xl'>
        Seleccione una <Text style={styles.highlightText}>fecha</Text>
      </Text>

      <FlatList
        horizontal
        data={dates}
        renderItem={renderDateButton}
        keyExtractor={(item) => item.date.toISOString()}
        style={styles.dateList}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : loading ? (
        <ActivityIndicator
          size='large'
          color='#14b8a6'
          style={styles.loader}
        />
      ) : finalActivities.length === 0 ? (
        <Text
          style={styles.noActivities}
          className='mb-60'>
          No hay actividades disponibles para esta fecha.
        </Text>
      ) : (
        <FlatList
          data={finalActivities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id}
          style={styles.activityList}
        />
      )}

      <Text style={styles.footer}>GYM PRO MANAGER</Text>
    </SafeAreaView>
  )
}

// Estilos (sin cambios)
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
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Copperplate',
  },
  favoritesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  favoritesText: {
    fontFamily: 'MyriadPro',
    color: 'white',
    marginLeft: 8,
  },
  dateInstructions: {
    color: 'white',
    marginBottom: 16,
    fontFamily: 'MyriadPro',
  },
  highlightText: {
    color: '#6CB0B4',
  },
  highlightText2: {
    color: '#DFAA8C',
  },
  dateList: {
    alignSelf: 'flex-start', // Asegura que el height sea el mínimo necesario
    flexShrink: 1, // Evita que el contenedor se expanda
    paddingVertical: 0,
    marginVertical: 0,
    minHeight: 0, // Asegura que el height no sea más grande que el contenido
    flexGrow: 0, // Evita que el contenedor crezca más allá de su contenido
  },
  dateButton: {
    width: 64,
    height: 64,
    backgroundColor: '#6CB0B4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedDateButton: {
    backgroundColor: '#2C4A5D',
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
    marginTop: 20,
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
    fontSize: 18,
    flex: 1,
    textAlignVertical: 'center',
    fontFamily: 'MyriadPro',
  },
  footer: {
    color: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'MyriadPro',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 32,
  },
})

export default App
