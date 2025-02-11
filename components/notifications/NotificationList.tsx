import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import NotificationCard from './NotificationCard'

type NotificationListProps = {
  notifications: any[]
  onDelete: (id: number) => void
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onDelete,
}) => {
  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay notificaciones relevantes</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <NotificationCard
          notification={item}
          onDelete={() => onDelete(item.id)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
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
  listContainer: {
    padding: 16,
  },
})

export default NotificationList
