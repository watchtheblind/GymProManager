import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import moment from 'moment'
import ConfirmationModal from '../../common/ConfirmationModal'
import CustomAlert from '../../common/Alert'
import {Activity} from '@/hooks/Activities/useActivities'
import {getActivityTypeColor} from '@/hooks/Activities/ActivityCard/useGetActivityTypeColor'
import {handleSignUp} from '@/hooks/Activities/ActivityCard/useHandleSignUp'

interface ActivityCardProps {
  activity: Activity
  isFavorite: boolean
  onToggleFavorite: () => void
  userId: string
  token: string
  action: string
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  userId,
  token,
  action,
}) => {
  const activityDateTime = moment(activity.fechahora, 'YYYY-MM-DD HH:mm:ss')
  const activityTime = activityDateTime.format('h:mm A')

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const closeAlert = () => setIsAlertVisible(false)

  const confirmSignUp = async () => {
    const result = await handleSignUp(
      token,
      userId,
      activity.ID,
      activity.fechahora,
      action,
    )
    if (result.success) {
      setAlertTitle('Éxito')
      setAlertMessage('Te has inscrito correctamente en la actividad.')
    } else {
      setAlertTitle('Error')
      setAlertMessage(result.error || 'Ocurrió un error inesperado.')
    }
    setIsAlertVisible(true)
    closeModal()
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
        style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Anotarme</Text>
      </TouchableOpacity>

      <ConfirmationModal
        visible={isModalVisible}
        title='Confirmar'
        message='¿Estás seguro de querer anotarte?'
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
    bottom: 8,
    right: 8,
    backgroundColor: '#14b8a6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
})

export default ActivityCard
