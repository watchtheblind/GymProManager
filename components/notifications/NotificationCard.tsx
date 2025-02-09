import type React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Swipeable} from 'react-native-gesture-handler'
import type {Notification} from '@/hooks/Notifications/useFetchNotifications'

interface NotificationCardProps {
  notification: Notification
  onDelete: () => void
}

const getBackgroundColor = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case 'aviso':
      return {backgroundColor: '#518893', borderColor: '#6CB0B4'}
    case 'rutina':
      return {backgroundColor: '#CC7751', borderColor: '#DFAA8C'}
    case 'actividad':
      return {backgroundColor: '#B0A462', borderColor: '#FEF4C9'}
    default:
      return {backgroundColor: '#9B9B9B', borderColor: '#C0C0C0'}
  }
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onDelete,
}) => {
  const colors = getBackgroundColor(notification.tipo)

  const handleSwipeableOpen = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      onDelete()
    }
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        onSwipeableOpen={handleSwipeableOpen}
        friction={2}
        leftThreshold={80}>
        <TouchableOpacity
          style={[
            styles.notificationItem,
            {
              backgroundColor: colors.backgroundColor,
              borderColor: colors.borderColor,
              borderWidth: 2,
            },
          ]}>
          <View style={styles.leftContent}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{notification.titulo}</Text>
              <Text style={styles.text}>{notification.texto}</Text>
              <Text style={styles.time}>
                {new Date(notification.fechahora).toLocaleString()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
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
  text: {
    fontFamily: 'MyriadPro',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    fontFamily: 'MyriadPro',
    color: 'rgba(255, 255, 255, 0.6)',
  },
})

export default NotificationCard
