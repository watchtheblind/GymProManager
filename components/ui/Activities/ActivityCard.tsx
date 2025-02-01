import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import moment from 'moment'
interface ActivityCardProps {
  activity: {
    id: string
    name: string
    time: string
    Instructor: string
    available: number
    capacity: number
    type: 'yoga' | 'cardio' | 'pilates' | 'strength' | 'dance'
  }
  isFavorite: boolean
  onToggleFavorite: () => void
}

const getActivityTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    yoga: '#9333ea',
    cardio: '#dc2626',
    pilates: '#2563eb',
    strength: '#ea580c',
    dance: '#db2777',
  }
  return colors[type] || '#9A9A98'
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
}) => {
  const activityDateTime = moment(activity.time, 'MMM DD, YYYY h:mm A')
  const activityTime = activityDateTime.format('h:mm A')

  return (
    <View
      style={[
        styles.card,
        {backgroundColor: `${getActivityTypeColor(activity.type)}20`},
      ]}>
      <View>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.details}>
          {activityTime} - {activity.Instructor}
        </Text>
        <Text style={styles.details}>
          Disponibles: {activity.available}/{activity.capacity}
        </Text>
      </View>
      <TouchableOpacity onPress={onToggleFavorite}>
        <Text style={styles.favoriteIcon}>{isFavorite ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'MyriadPro',
    textTransform: 'capitalize',
  },
  details: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    fontFamily: 'MyriadPro',
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#fbbf24',
  },
})
