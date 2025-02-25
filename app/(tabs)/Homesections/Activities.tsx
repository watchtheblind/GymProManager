// screens/Activities.tsx
import React, {useState} from 'react'
import {View, Text, SafeAreaView, Switch, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useFavorites} from '@/hooks/Activities/useFavorites'
import {useActivities} from '@/hooks/Activities/useActivities'
import {useSession} from '@/hooks/SessionContext'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {useFilter} from '@/hooks/Common/useFilter'
import SearchBar from '@/components/common/SearchBar'
import Loader from '@/components/common/Loader'
import DateCarousel from '@/components/ui/Activities/DateCarousel'
import ActivityList from '@/components/ui/Activities/ActivityList'
import useDates from '@/hooks/Activities/useDates'
import Header from '@/components/common/Header'

const Activities: React.FC = () => {
  const {user} = useSession()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const {dates, selectedDate, setSelectedDate} = useDates()
  const {activities, loading, error} = useActivities(selectedDate)
  const {favorites, toggleFavorite} = useFavorites()
  const navigation = useNavigation()

  useBackHandler(() => {
    navigation.navigate('Bottomnav' as never)
    return true
  })

  const filteredActivities = useFilter({
    searchQuery,
    showFavorites,
    favorites: favorites.map(String),
    data: activities,
    searchKeys: ['nombre'],
  })

  const renderError = () => <Text style={styles.error}>{error}</Text>

  const renderLoader = () => <Loader></Loader>

  const renderActivityList = () => (
    <ActivityList
      activities={filteredActivities}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      userId={user?.ID.toString() || ''}
      token={'Contraseña...'}
    />
  )

  const renderContent = () => {
    if (error) return renderError()
    if (loading) return renderLoader()
    return renderActivityList()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <Header
        title='ACTIVIDADES'
        onBackPress={() => {
          navigation.navigate('Bottomnav' as never)
        }}
      />
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
        <Text style={styles.favoritesText}>Ver mis favoritas</Text>
      </View>
      <Text style={styles.dateInstructions}>
        Selecciona una <Text style={styles.highlightText}>fecha</Text>
      </Text>
      <DateCarousel
        dates={dates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      {renderContent()}
      <Text style={styles.footer}>GYM PRO MANAGER</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1B',
    padding: 20,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 15,
  },
  dateInstructions: {
    color: 'white',
    marginBottom: 16,
    fontSize: 17,
    fontFamily: 'MyriadPro',
  },
  highlightText: {
    color: '#6CB0B4',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    color: 'rgba(255, 255, 255,  0.2)',
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
