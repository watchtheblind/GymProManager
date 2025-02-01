import React, {useState} from 'react'
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Switch,
  StyleSheet,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useFavorites} from '@/hooks/Activities/useFavorites'
import {useActivities} from '@/hooks/Activities/useActivities'
import {ActivityCard} from '@/components/ui/Activities/ActivityCard'
import {DateButton} from '@/components/ui/Activities/Datebutton'
import SearchBar from '@/components/ui/SearchBar'
import Settingsbutton from '@/components/ui/Settingsbutton'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {useFilter} from '@/hooks/Common/useFilter'

// Definimos la interfaz para las fechas
interface DateInfo {
  date: Date
  day: number
  month: string
}

// Definimos la interfaz para las actividades
interface Activity {
  id: number
  name: string
  time: string
  type: string
  capacity: number
  available: number
  Instructor: string
}

const getNextTwoWeeks = (): DateInfo[] => {
  const dates: DateInfo[] = []
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

const Activities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const {activities, loading, error} = useActivities(selectedDate)
  const {favorites, toggleFavorite} = useFavorites()
  const navigation = useNavigation()

  // Lógica de BackHandler usando el hook personalizado
  useBackHandler(() => {
    navigation.navigate('Bottomnav' as never)
    return true
  })

  // Usamos el hook useFilter para filtrar las actividades
  const filteredActivities = useFilter<Activity>({
    searchQuery,
    showFavorites,
    favorites: favorites.map(String), // Convertimos los favoritos a strings
    data: activities,
    searchKeys: ['name'], // Clave de búsqueda
  })

  const dates = getNextTwoWeeks()

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.header}
        className='mt-10'>
        <Text style={styles.title}>ACTIVIDADES</Text>
        <Settingsbutton />
      </View>

      <SearchBar
        onSearch={setSearchQuery}
        onClear={() => setSearchQuery('')}
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
          className='text-xl'>
          Ver mis favoritas
        </Text>
      </View>

      <Text
        style={styles.dateInstructions}
        className='text-xl'>
        Selecciona una <Text style={styles.highlightText}>fecha</Text>
      </Text>

      <FlatList
        horizontal
        data={dates}
        renderItem={({item}) => (
          <DateButton
            date={item.date}
            day={item.day}
            month={item.month}
            isSelected={
              item.date.toDateString() === selectedDate.toDateString()
            }
            onPress={() => setSelectedDate(item.date)}
          />
        )}
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
      ) : filteredActivities.length === 0 ? (
        <Text style={styles.noActivities}>
          No hay actividades disponibles para esta fecha.
        </Text>
      ) : (
        <FlatList
          data={filteredActivities}
          renderItem={({item}) => (
            <ActivityCard
              activity={{
                ...item,
                id: item.id.toString(), // Convertir id a string para ActivityCard
              }}
              isFavorite={favorites.includes(item.id.toString())} // Convertir id a string para comparar
              onToggleFavorite={() => toggleFavorite(item.id.toString())} // Convertir id a string
              userId={4} // Pasar el ID del usuario
              token={'Contraseña...'} // Pasar el token de autorización
            />
          )}
          keyExtractor={(item) => item.id.toString()} // Convertir id a string
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
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Copperplate',
  },
  favoritesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  dateList: {
    alignSelf: 'flex-start',
    flexShrink: 1,
    paddingVertical: 0,
    marginVertical: 0,
    minHeight: 0,
    flexGrow: 0,
    fontFamily: 'MyriadPro',
  },
  activityList: {
    flex: 1,
    marginTop: 20,
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
    fontFamily: 'MyriadPro',
  },
})

export default Activities
