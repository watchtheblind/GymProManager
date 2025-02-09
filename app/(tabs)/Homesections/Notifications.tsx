'use client'

import React, {useEffect, useState, useCallback} from 'react'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  BackHandler,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'

import NotificationCard from '@/components/notifications/NotificationCard'
import {useSession} from '@/hooks/SessionContext'
import useBackHandler from '@/hooks/Common/useBackHandler'
const NotificationsScreen = () => {
  const navigation = useNavigation()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const {user} = useSession()

  const fetchNotifications = useCallback(
    async (token: string, userId: number) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          'https://gympromanager.com/app-notif.php',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `token=${token}&userid=${userId}`,
          },
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setNotifications(data)
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    if (user?.ID) {
      fetchNotifications('Contraseña...', user.ID)
    }
  }, [user, fetchNotifications])

  useBackHandler(() => {
    navigation.navigate('Bottomnav' as never)
    return true
  })

  // Marcar todas como leídas
  const markAllAsRead = () => {
    // Implement the logic to mark all notifications as read using your API
    Alert.alert(
      'Éxito',
      'Todas las notificaciones han sido marcadas como leídas.',
    )
  }

  // Eliminar una notificación
  const deleteNotification = (id: number) => {
    // Implement the logic to delete a notification using your API
    Alert.alert('Éxito', 'La notificación ha sido eliminada.')
  }

  const renderItem = ({item}: {item: any}) => (
    <NotificationCard
      notification={item}
      onDelete={() => deleteNotification(item.id)}
    />
  )

  return (
    <View style={styles.container}>
      <View
        style={styles.dateContainer}
        className='z-20'>
        <View
          style={styles.header}
          className='z-20 flex-row items-center'>
          <Text
            style={styles.headerText}
            className='text-center'>
            NOTIFICACIONES
          </Text>
        </View>
        <TouchableOpacity
          onPress={markAllAsRead}
          style={styles.markAllButton}>
          <Text style={styles.markAllText}>Marcar todas como leídas</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={styles.loaderContainer}
          className='z-20'>
          <ActivityIndicator
            size='large'
            color='#14b8a6'
            style={styles.loader}
          />
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Error al cargar las notificaciones: {error}
          </Text>
        </View>
      ) : notifications.length > 0 ? (
        <FlatList
          className='z-20'
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay notificaciones</Text>
        </View>
      )}
      {/* Fondo y logo */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.overlay}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    marginBottom: 60,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Copperplate',
    color: 'white',
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    color: '#14b8a6',
    fontSize: 16,
    fontFamily: 'MyriadPro',
  },
  dateContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'MyriadPro',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  time: {
    fontSize: 16,
    fontFamily: 'MyriadPro',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'MyriadPro',
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
    zIndex: 0,
  },
  logo: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#1D1D1B',
    opacity: 0.9,
  },
})

export default NotificationsScreen
