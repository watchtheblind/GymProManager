import React, {useState, useEffect} from 'react'
import {FlatList, StyleSheet, Text} from 'react-native'
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
  // Estado para rastrear si el usuario está anotado en cada actividad
  const [signedUpActivities, setSignedUpActivities] = useState<
    Record<string, boolean>
  >({})

  // Inicializar el estado de inscripción (puedes obtener estos datos desde una API)
  useEffect(() => {
    const initialSignedUpState: Record<string, boolean> = {}
    activities.forEach((activity) => {
      // Aquí puedes inicializar el estado basado en datos de la API o algún otro estado global
      initialSignedUpState[activity.ID] = false // Cambia esto según tus necesidades
    })
    setSignedUpActivities(initialSignedUpState)
  }, [activities])

  // Función para manejar el cambio de inscripción
  const handleSignUpChange = (activityId: string, isSignedUp: boolean) => {
    setSignedUpActivities((prevState) => ({
      ...prevState,
      [activityId]: isSignedUp,
    }))
  }

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
            fechahora: item.fechahora,
          }}
          isFavorite={favorites.includes(item.ID)}
          onToggleFavorite={() => toggleFavorite(item.ID)}
          userId={userId}
          token={token}
          isSignedUp={signedUpActivities[item.ID] || false}
          onSignUpChange={(isSignedUp) =>
            handleSignUpChange(item.ID, isSignedUp)
          }
          action={item.action} // Pasar la propiedad action
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
