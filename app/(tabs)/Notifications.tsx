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
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

// Simulación de una API ficticia con más datos
const getNotifications = (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
    }, 2000) // Simulamos un retardo de 2 segundos
  })
}

interface Notification {
  id: number
  title: string
  type: string
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
  const [loading, setLoading] = useState(true) // Estado para controlar la carga

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
        setLoading(false) // Finalizamos la carga
      }
    }

    loadNotifications()
  }, [])

  const renderItem = ({item}: {item: Notification}) => {
    const colors = getBackgroundColor(item.type)
    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderWidth: 2, // Grosor del borde
          },
        ]}>
        <View style={styles.leftContent}>
          <Image
            source={{uri: getImage(item.title)}} // Usamos el título para obtener la imagen
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
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.header}
        className='z-10'>
        <TouchableOpacity
          onPress={() => navigation.navigate('Bottomnav' as never)}
          style={styles.backButton}>
          <Ionicons
            name='arrow-back'
            size={24}
            color='white'
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>NOTIFICACIONES</Text>
      </View>
      <View
        style={styles.dateContainer}
        className='z-10'>
        {/* <Text style={styles.dateText}>Fecha</Text> */}
      </View>
      {/* Mostrar ActivityIndicator si loading es true */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size='large'
            color='#14b8a6'
            style={styles.loader}
          />
        </View>
      ) : // Mostrar FlatList si hay notificaciones, o un mensaje si no hay
      notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          className='z-10'
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay notificaciones</Text>
        </View>
      )}
      {/* Fondo y logo */}
      <View className='flex-1 justify-center items-center absolute -z-0 w-full h-full opacity-70'>
        <Image
          className='mt-24 h-40 -z-20 w-full'
          source={require('@/assets/images/logo.png')}
          style={{zIndex: 0}} // Imagen con zIndex: 0
        />
      </View>
      <View className='absolute inset-0 bg-[#1D1D1B] opacity-90 -z-0'></View>
      {/* Fondo oscuro con zIndex: 1 */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingRight: 70,
    paddingTop: 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Copperplate',
    color: 'white',
  },
  dateContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'MyriadPro',
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
    zIndex: 10, // Asegurar que esté por encima de otros elementos
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
})

export default NotificationsScreen
