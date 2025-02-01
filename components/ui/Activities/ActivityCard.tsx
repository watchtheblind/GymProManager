import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons' // Importamos MaterialIcons
import moment from 'moment'

interface ActivityCardProps {
  activity: {
    id: string
    name: string
    time: string
    Instructor: string
    available: number
    capacity: number
    type: 'yoga' | 'cardio' | 'pilates' | 'strength' | 'dance' | string
  }
  isFavorite: boolean
  onToggleFavorite: () => void
}

const getActivityTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    yoga: '#4FD1C5',
    cardio: '#ED8936',
    pilates: '#A0D2EB',
    strength: '#F06292',
    dance: '#B5AD6F',
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
      <View style={styles.contentContainer}>
        <View style={styles.typeContainer}>
          <Text
            style={[
              styles.typeText,
              {color: getActivityTypeColor(activity.type)},
            ]}>
            {activity.type.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.details}>
          {activityTime} - {activity.Instructor}
        </Text>
        <Text style={styles.details}>
          Disponibles: {activity.available}/{activity.capacity}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onToggleFavorite}
        style={styles.favoriteButton}>
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'} // Ícono de favorito
          size={24}
          color={isFavorite ? '#fbbf24' : '#fff'} // Color amarillo si está favorito, blanco si no
        />
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
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#1A1A1A',
  },
  contentContainer: {
    flex: 1,
  },
  typeContainer: {
    marginBottom: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'MyriadPro',
    marginBottom: 4,
  },
  favoriteButton: {
    padding: 8,
  },
})
