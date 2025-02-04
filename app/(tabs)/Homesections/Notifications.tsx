import React, {useEffect, useState} from 'react'
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
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Ionicons} from '@expo/vector-icons'
import {Swipeable} from 'react-native-gesture-handler'

// Simulación de una API ficticia con más datos
const getNotifications = (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {id: 1, title: 'Full Body Yoga', type: 'yoga', read: false},
        {id: 2, title: 'Full Body Plates', type: 'plates', read: false},
        {id: 3, title: 'GYM', type: 'gym', read: false},
        {id: 4, title: 'Morning Stretch', type: 'yoga', read: false},
        {id: 5, title: 'Cardio Blast', type: 'gym', read: false},
        {id: 6, title: 'Strength Training', type: 'plates', read: false},
        {id: 7, title: 'Evening Relaxation', type: 'yoga', read: false},
        {id: 8, title: 'Core Workout', type: 'plates', read: false},
        {id: 9, title: 'HIIT Session', type: 'gym', read: false},
        {id: 10, title: 'Balance and Flexibility', type: 'yoga', read: false},
        {id: 11, title: 'Upper Body Strength', type: 'plates', read: false},
        {id: 12, title: 'Lower Body Strength', type: 'plates', read: false},
        {id: 13, title: 'Meditation and Breathing', type: 'yoga', read: false},
        {id: 14, title: 'Endurance Training', type: 'gym', read: false},
        {id: 15, title: 'Pilates Fusion', type: 'yoga', read: false},
      ])
    }, 2000) // Simulamos un retardo de 2 segundos
  })
}

interface Notification {
  id: number
  title: string
  type: string
  read: boolean
}

// Helper function to get background color and border color based on type
const getBackgroundColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'yoga':
      return {backgroundColor: '#518893', borderColor: '#6CB0B4'}
    case 'plates':
      return {backgroundColor: '#CC7751', borderColor: '#DFAA8C'}
    case 'gym':
      return {backgroundColor: '#B0A462', borderColor: '#FEF4C9'}
    default:
      return {backgroundColor: '#9B9B9B', borderColor: '#C0C0C0'}
  }
}

// Helper function to get image based on title
const getImage = (title: string) => {
  switch (title.toLowerCase()) {
    case 'full body yoga':
      return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'full body plates':
      return 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'gym':
      return 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'morning stretch':
      return 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'cardio blast':
      return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'strength training':
      return 'https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'evening relaxation':
      return 'https://images.unsplash.com/photo-1593810450967-f9c42742e326?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'core workout':
      return 'https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'hiit session':
      return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'balance and flexibility':
      return 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'upper body strength':
      return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'lower body strength':
      return 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'meditation and breathing':
      return 'https://images.unsplash.com/photo-1593810451137-5dc55105dace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'endurance training':
      return 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    case 'pilates fusion':
      return 'https://images.unsplash.com/photo-1593810451158-9f1a8d4d5c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    default:
      return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' // Imagen por defecto (yoga)
  }
}

const NotificationsScreen = () => {
  const navigation = useNavigation()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getNotifications()
        setNotifications(data)
      } catch (error) {
        console.error('Error loading notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [])

  // Marcar todas como leídas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotifications(updatedNotifications)
    Alert.alert(
      'Éxito',
      'Todas las notificaciones han sido marcadas como leídas.',
    )
  }

  // Eliminar una notificación
  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id,
    )
    setNotifications(updatedNotifications)
  }

  const renderItem = ({item}: {item: Notification}) => {
    const colors = getBackgroundColor(item.type)

    // Función para manejar el deslizamiento y eliminar la notificación
    const handleSwipeableOpen = (direction: 'left' | 'right') => {
      if (direction === 'left') {
        deleteNotification(item.id)
      }
    }

    return (
      <GestureHandlerRootView>
        <Swipeable
          onSwipeableOpen={handleSwipeableOpen} // Elimina la notificación al deslizar
          friction={2} // Ajusta la sensibilidad del deslizamiento
          leftThreshold={80} // Distancia necesaria para activar el deslizamiento
        >
          <TouchableOpacity
            style={[
              styles.notificationItem,
              {
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor,
                borderWidth: 2,
                opacity: item.read ? 0.6 : 1, // Opacidad reducida si está marcada como leída
              },
            ]}>
            <View style={styles.leftContent}>
              <Image
                source={{uri: getImage(item.title)}}
                style={styles.thumbnail}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>08:30</Text>
              </View>
            </View>
            <Ionicons
              name='chevron-forward'
              size={24}
              color='white'
            />
          </TouchableOpacity>
        </Swipeable>
      </GestureHandlerRootView>
    )
  }

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
      ) : notifications.length > 0 ? (
        <FlatList
          className='z-20'
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
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
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
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
