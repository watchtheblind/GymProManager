import React, {useState, useMemo, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import moment from 'moment'
import ConfirmationModal from '../../common/ConfirmationModal'
import CustomAlert from '../../common/Alert'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Activity} from '@/hooks/Activities/useActivities'
import {getActivityTypeColor} from '@/hooks/Activities/ActivityCard/useGetActivityTypeColor'
import {enrollActivity} from '@/hooks/Data/Endpoints'

interface ActivityCardProps {
  activity: Activity
  isFavorite: boolean
  onToggleFavorite: () => void
  userId: string
  token: string
  onSignUpChange: (isSignedUp: boolean) => void
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  userId,
  token,
  onSignUpChange,
}) => {
  // Estado para almacenar todas las notificaciones completas
  const [allNotifications, setAllNotifications] = useState<any[]>([])

  // Función para cargar todas las notificaciones completas desde la caché
  const loadAllNotifications = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(
        `allNotifications:${userId}`,
      )
      if (cachedData) {
        const {data, timestamp} = JSON.parse(cachedData)
        const currentTime = Date.now()
        const oneHourInMs = 60 * 60 * 1000 // 1 hora en milisegundos
        if (currentTime - timestamp < oneHourInMs) {
          console.log('Notificaciones completas obtenidas desde la caché')
          setAllNotifications(data) // Guardar las notificaciones completas en el estado
          return
        }
      }
      console.log('Caché expirada o no disponible')
    } catch (error) {
      console.error(
        'Error al obtener notificaciones completas desde la caché:',
        error,
      )
    }
  }

  // Cargar las notificaciones completas cuando el componente se monta
  useEffect(() => {
    loadAllNotifications()
  }, [userId])

  const activityDateTime = useMemo(
    () => moment(activity.fechahora, 'YYYY-MM-DD HH:mm:ss'),
    [activity.fechahora],
  )
  const activityTime = useMemo(
    () => activityDateTime.format('h:mm A'),
    [activityDateTime],
  )

  // Determinar si el usuario ya está inscrito en la actividad
  const isSignedUp = useMemo(() => {
    return allNotifications.some(
      (notification) =>
        notification.tipo === 'actividad' &&
        notification.titulo === activity.nombre &&
        notification.fechahora === activity.fechahora,
    )
  }, [allNotifications, activity])

  // Estado local para controlar si el usuario está inscrito
  const [localIsSignedUp, setLocalIsSignedUp] = useState(isSignedUp)

  // Actualizar el estado local cuando isSignedUp cambie
  useEffect(() => {
    setLocalIsSignedUp(isSignedUp)
  }, [isSignedUp])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const closeAlert = () => setIsAlertVisible(false)

  const confirmSignUp = async () => {
    const actionToUse = localIsSignedUp ? 'delete' : 'add'
    console.log('Acción enviada al backend:', actionToUse)

    const params = {
      token,
      activityid: activity.ID,
      userid: userId,
      fechahora: activity.fechahora,
      action: actionToUse,
    }

    try {
      console.log(
        'Enviando solicitud al backend con los siguientes parámetros:',
        params,
      )
      const response = await enrollActivity(params)
      console.log('Respuesta completa del backend:', response)

      if (response.success) {
        // Actualizar el estado local basado en la acción realizada
        setLocalIsSignedUp(!localIsSignedUp)
        onSignUpChange(!localIsSignedUp)

        // Mostrar mensaje de éxito
        setAlertTitle('Éxito')
        setAlertMessage(
          localIsSignedUp
            ? 'Te has salido correctamente de la actividad.'
            : 'Te has inscrito correctamente en la actividad.',
        )

        // Refrescar las notificaciones para sincronizar el frontend con el backend
        await loadAllNotifications()
      } else {
        // Mostrar mensaje de error del backend
        console.error('Error en la respuesta del backend:', response)
        setAlertTitle('Error')
        setAlertMessage(
          response.success || 'Ya estás inscrito en esta actividad.',
        )
      }
    } catch (error) {
      console.error('Error en la solicitud al backend:', error)
      setAlertTitle('Error')
      setAlertMessage('No se pudo completar la acción. Inténtalo de nuevo.')
    } finally {
      setIsAlertVisible(true)
      closeModal()
    }
  }

  return (
    <View
      style={[
        styles.card,
        {backgroundColor: `${getActivityTypeColor(activity.tipo)}20`},
      ]}>
      <View style={styles.contentContainer}>
        <View style={styles.typeContainer}>
          <Text
            style={[
              styles.typeText,
              {color: getActivityTypeColor(activity.tipo)},
            ]}>
            {activity.tipo.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{activity.nombre}</Text>
        <Text style={styles.details}>
          {activityTime} - {activity.entrenador} | {activity.lugar}
        </Text>
        <Text style={styles.details}>Duración: {activity.duracion}</Text>
        {activity.disponibles === activity.capacidad ? (
          <Text style={styles.textUnavailable}>
            Agotados: {activity.disponibles}/{activity.capacidad}
          </Text>
        ) : (
          <Text style={styles.textAvailable}>
            Disponibles: {activity.disponibles}/{activity.capacidad}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={onToggleFavorite}
        style={styles.favoriteButton}>
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={isFavorite ? '#fbbf24' : '#fff'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openModal}
        style={[
          styles.badgeContainer,
          localIsSignedUp && styles.badgeContainerSignedUp,
        ]}>
        <Text
          style={[
            styles.badgeText,
            localIsSignedUp && styles.badgeTextSignedUp,
          ]}>
          {localIsSignedUp ? 'Salirme' : 'Anotarme'}
        </Text>
      </TouchableOpacity>
      <ConfirmationModal
        visible={isModalVisible}
        title='Confirmar'
        message={
          localIsSignedUp
            ? '¿Estás seguro de querer salirte de la actividad?'
            : '¿Estás seguro de querer anotarte en la actividad?'
        }
        onAccept={confirmSignUp}
        onClose={closeModal}
      />
      <CustomAlert
        visible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={closeAlert}
      />
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
    position: 'relative',
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
  textUnavailable: {
    color: '#ef4444',
    fontSize: 14,
    fontFamily: 'MyriadPro',
  },
  textAvailable: {
    color: '#4ade80',
    fontSize: 14,
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
    paddingBottom: 65,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 14,
    right: 15,
    backgroundColor: '#14b8a6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeContainerSignedUp: {
    backgroundColor: '#ef4444',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
  badgeTextSignedUp: {
    color: 'white',
  },
})

export default ActivityCard
