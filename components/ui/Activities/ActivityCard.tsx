import React, {useState, useMemo} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import moment from 'moment'
import ConfirmationModal from '../../common/ConfirmationModal'
import CustomAlert from '../../common/Alert'
import {Activity} from '@/hooks/Activities/useActivities'
import {getActivityTypeColor} from '@/hooks/Activities/ActivityCard/useGetActivityTypeColor'
import {enrollActivity} from '@/hooks/Data/Endpoints'
interface ActivityCardProps {
  activity: Activity
  isFavorite: boolean
  onToggleFavorite: () => void
  userId: string
  token: string
  isSignedUp: boolean // Nuevo prop para indicar si el usuario está anotado
  onSignUpChange: (isSignedUp: boolean) => void // Nuevo prop para notificar cambios
  action?: string // Agregar action como propiedad opcional
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  userId,
  token,
  isSignedUp: initialIsSignedUp,
  onSignUpChange,
}) => {
  const activityDateTime = useMemo(
    () => moment(activity.fechahora, 'YYYY-MM-DD HH:mm:ss'),
    [activity.fechahora],
  )
  const activityTime = useMemo(
    () => activityDateTime.format('h:mm A'),
    [activityDateTime],
  )

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [isSignedUp, setIsSignedUp] = useState(initialIsSignedUp)

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const closeAlert = () => setIsAlertVisible(false)

  const confirmSignUp = async () => {
    const actionToUse = isSignedUp ? 'delete' : 'add' // Determina la acción

    // Construye el objeto params con las 5 propiedades
    const params = {
      token,
      activityid: activity.ID,
      userid: userId,
      fechahora: activity.fechahora,
      action: actionToUse,
    }

    try {
      // Llama a enrollActivity con el objeto params
      const response = await enrollActivity(params)

      if (response.success) {
        setIsSignedUp(!isSignedUp) // Cambiar el estado local
        onSignUpChange(!isSignedUp) // Notificar al componente padre
        setAlertTitle('Éxito')
        setAlertMessage(
          isSignedUp
            ? 'Te has salido correctamente de la actividad.'
            : 'Te has inscrito correctamente en la actividad.',
        )
      } else {
        setAlertTitle('Error')
        setAlertMessage('Ya estás inscrito en esta actividad.')
      }
    } catch (error) {
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
          isSignedUp && styles.badgeContainerSignedUp, // Aplicar estilo condicional
        ]}>
        <Text
          style={[styles.badgeText, isSignedUp && styles.badgeTextSignedUp]}>
          {isSignedUp ? 'Salirme' : 'Anotarme'}
        </Text>
      </TouchableOpacity>

      <ConfirmationModal
        visible={isModalVisible}
        title='Confirmar'
        message={
          isSignedUp
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
    backgroundColor: '#14b8a6', // Color por defecto (verde)
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeContainerSignedUp: {
    backgroundColor: '#ef4444', // Color rojizo cuando el usuario está anotado
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
  badgeTextSignedUp: {
    color: 'white', // Color del texto cuando el usuario está anotado
  },
})

export default ActivityCard
