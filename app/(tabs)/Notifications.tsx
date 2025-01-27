import React, {useEffect, useState} from 'react'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {View, Text, FlatList, StyleSheet, BackHandler} from 'react-native'

// Simulación de una API ficticia con más datos
const getNotifications = () => {
  return Promise.resolve([
    {id: 1, title: 'Full Body Yoga', type: 'yoga'},
    {id: 2, title: 'Full Body Plates', type: 'plates'},
    {id: 3, title: 'GYM', type: 'gym'},
    {id: 4, title: 'Morning Stretch', type: 'yoga'},
    {id: 5, title: 'Cardio Blast', type: 'gym'},
    {id: 6, title: 'Strength Training', type: 'plates'},
    {id: 7, title: 'Evening Relaxation', type: 'yoga'},
    {id: 8, title: 'Core Workout', type: 'plates'},
    {id: 9, title: 'HIIT Session', type: 'gym'},
    {id: 10, title: 'Balance and Flexibility', type: 'yoga'},
    {id: 11, title: 'Upper Body Strength', type: 'plates'},
    {id: 12, title: 'Lower Body Strength', type: 'plates'},
    {id: 13, title: 'Meditation and Breathing', type: 'yoga'},
    {id: 14, title: 'Endurance Training', type: 'gym'},
    {id: 15, title: 'Pilates Fusion', type: 'yoga'},
  ])
}

const NotificationsScreen = () => {
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Bottomnav' as never)
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [navigation]),
  )
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    getNotifications().then((data) => setNotifications(data))
  }, [])

  interface Notification {
    id: number
    title: string
    type: string
  }

  const renderItem = ({item}: {item: Notification}) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.type}>{item.type}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOTIFICACIONES</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: '#666',
  },
})

export default NotificationsScreen
