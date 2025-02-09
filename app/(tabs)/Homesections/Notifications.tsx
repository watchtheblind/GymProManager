import React, {useEffect} from 'react'
import {View, ActivityIndicator, Text} from 'react-native'
import useNotifications from '@/hooks/Notifications/useNotifications'
import NotificationList from '@/components/notifications/NotificationList'
import {useSession} from '@/hooks/SessionContext'
import Header from '@/components/common/Header'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {useNavigation} from 'expo-router'
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

const Notifications = () => {
  return (
    <SafeAreaProvider>
      <NotificationsScreen></NotificationsScreen>
    </SafeAreaProvider>
  )
}

const NotificationsScreen = () => {
  const insets = useSafeAreaInsets()
  const {user} = useSession()
  const navigation = useNavigation()
  const {loading, error, fetchNotifications, getRelevantNotifications} =
    useNotifications(user)

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const relevantNotifications = getRelevantNotifications()
  console.log(relevantNotifications)

  // Función para manejar el botón de retroceso
  useBackHandler(() => {
    navigation.navigate('Bottomnav' as never)
    return true
  })
  const handlePress = () => {
    navigation.navigate('Bottomnav' as never)
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1E1E1E',
        }}>
        <ActivityIndicator
          size='large'
          color='#14b8a6'
        />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>Error: {error}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView
      className='flex-1 bg-[#1E1E1E] px-4'
      style={{paddingTop: insets.top}}>
      <View style={{flex: 1, backgroundColor: '#1E1E1E'}}>
        {/* Añade el componente Header aquí */}
        <Header
          title='Notificaciones' // Título de la pantalla
          onBackPress={handlePress} // Función para manejar el retroceso
        />
        <View className='mt-8'>
          <NotificationList
            notifications={relevantNotifications}
            onDelete={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Notifications
