// components/ActivityList.tsx
import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import ActivityCard from '@/components/ui/Activities/ActivityCard'
import {Activity} from '@/hooks/Activities/useActivities'

interface ActivityListProps {
  activities: Activity[]
  favorites: string[]
  toggleFavorite: (id: string) => void
  userId: string
  token: string
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  favorites,
  toggleFavorite,
  userId,
  token,
}) => {
  if (activities.length === 0) {
    return (
      <Text style={styles.noActivities}>
        No hay actividades disponibles para esta fecha.
      </Text>
    )
  }

  return (
    <FlatList
      data={activities}
      renderItem={({item}) => (
        <ActivityCard
          activity={{
            ...item,
            ID: item.ID,
          }}
          isFavorite={favorites.includes(item.ID)}
          onToggleFavorite={() => toggleFavorite(item.ID)}
          userId={userId}
          token={token}
        />
      )}
      keyExtractor={(item) => item.ID}
      style={styles.activityList}
    />
  )
}

const styles = StyleSheet.create({
  activityList: {
    flex: 1,
    marginTop: 20,
  },
  noActivities: {
    fontFamily: 'MyriadPro',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
    textAlignVertical: 'center',
  },
})

export default ActivityList
