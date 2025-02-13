import React, {useState, useMemo} from 'react'
import {FlatList, StyleSheet, Text} from 'react-native'
import ActivityCard from '@/components/ui/Activities/ActivityCard'
import {Activity} from '@/hooks/Activities/useActivities'

/**
 * Propiedades del componente ActivityList.
 *
 * @interface ActivityListProps
 * @property {Activity[]} activities - Lista de actividades a mostrar.
 * @property {string[]} favorites - Lista de IDs de actividades marcadas como favoritas por el usuario.
 * @property {(id: string) => void} toggleFavorite - Función para alternar el estado de favorito de una actividad.
 * @property {string} userId - ID del usuario actual.
 * @property {string} token - Token de autenticación del usuario.
 * @property {string} [noActivitiesMessage] - Mensaje opcional que se muestra cuando no hay actividades disponibles.
 */
interface ActivityListProps {
  activities: Activity[]
  favorites: string[]
  toggleFavorite: (id: string) => void
  userId: string
  token: string
  noActivitiesMessage?: string
}

/**
 * Componente que muestra una lista de actividades.
 *
 * @component
 * @param {ActivityListProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa la lista de actividades o un mensaje si no hay actividades.
 */
const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  favorites,
  toggleFavorite,
  userId,
  token,
  noActivitiesMessage = 'No hay actividades disponibles para esta fecha.',
}) => {
  /**
   * Estado que rastrea si el usuario está anotado en cada actividad.
   * Se inicializa con un objeto donde cada clave es el ID de la actividad y el valor es un booleano.
   */
  const initialSignedUpState = useMemo(() => {
    const state: Record<string, boolean> = {}
    activities.forEach((activity) => {
      state[activity.ID] = false // Inicializa con `false` o con datos de la API si es necesario
    })
    return state
  }, [activities])

  const [signedUpActivities, setSignedUpActivities] =
    useState(initialSignedUpState)

  /**
   * Función para manejar el cambio de estado de inscripción del usuario en una actividad.
   *
   * @param {string} activityId - ID de la actividad.
   * @param {boolean} isSignedUp - Indica si el usuario está anotado o no en la actividad.
   */
  const handleSignUpChange = async (
    activityId: string,
    isSignedUp: boolean,
  ) => {
    try {
      // Aquí podrías hacer una llamada a la API para actualizar el estado de inscripción
      setSignedUpActivities((prevState) => ({
        ...prevState,
        [activityId]: isSignedUp,
      }))
    } catch (error) {
      console.error('Error al cambiar el estado de inscripción:', error)
    }
  }

  // Si no hay actividades, mostrar un mensaje
  if (activities.length === 0) {
    return <Text style={styles.noActivities}>{noActivitiesMessage}</Text>
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

// Estilos del componente
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
