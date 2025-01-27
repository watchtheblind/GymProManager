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
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

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

// Helper function to get image based on type
const getImage = (type: string) => {
  switch (type.toLowerCase()) {
    case 'yoga':
      return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8MepBEPIBCwkATgSuhSEhAsom3VThV.png'
    case 'plates':
      return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8MepBEPIBCwkATgSuhSEhAsom3VThV.png'
    default:
      return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8MepBEPIBCwkATgSuhSEhAsom3VThV.png'
  }
}

const NotificationsScreen = () => {
  const navigation = useNavigation()
  const [notifications, setNotifications] = useState<Notification[]>([])

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
            source={{uri: getImage(item.type)}}
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
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        className='z-10'
      />
      <View className='flex-1 justify-center items-center absolute -z-0 w-full h-full opacity-70'>
        <Image
          className='mt-24 h-80 -z-20 w-full'
          source={require('@/assets/images/logo.png')}
          style={{zIndex: 0}} // Imagen con zIndex: 0
        />
      </View>
      <View className='absolute inset-0 bg-[#1D1D1B] opacity-90 -z-0'></View>{' '}
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
  watermark: {
    width: '100%',
    height: 60,
    opacity: 0.2,
    position: 'absolute',
    bottom: 20,
  },
})

export default NotificationsScreen
