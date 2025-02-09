import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons' // Importamos MaterialIcons
import moment from 'moment'
import ConfirmationModal from '../../common/ConfirmationModal'
import CustomAlert from '../../common/Alert'
import {Activity} from '@/hooks/Activities/useActivities'

interface ActivityCardProps {
  activity: Activity // Usamos la interfaz Activity
  isFavorite: boolean
  onToggleFavorite: () => void
  userId: string // ID del usuario
  token: string // Token de autorización
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
  userId,
  token,
}) => {
  const activityDateTime = moment(activity.fechahora, 'YYYY-MM-DD HH:mm:ss') // Ajustamos el formato de fecha
  const activityTime = activityDateTime.format('h:mm A')

  // Estados para controlar los modales
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  // Función para manejar la inscripción
  const handleSignUp = async () => {
    try {
      const response = await fetch(
        'https://gympromanager.com/app-activities-enroll.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `token=${token}&userid=${userId}&activityid=${activity.ID}`, // Usamos activity.ID
        },
      )

      const data = await response.json()
      console.log('Activity ID:', activity.ID)
      console.log(
        'Request body:',
        `token=${token}&activityid=${activity.ID}&userid=${userId}`,
      )
      if (data.success) {
        setAlertTitle('Éxito')
        setAlertMessage('Te has inscrito correctamente en la actividad.')
      } else if (data.error) {
        setAlertTitle('Error')
        setAlertMessage(data.error)
      } else {
        setAlertTitle('Error')
        setAlertMessage('Ocurrió un error inesperado.')
      }
    } catch (error) {
      setAlertTitle('Error')
      setAlertMessage('No se pudo conectar al servidor.')
    } finally {
      setIsAlertVisible(true) // Mostrar el modal de alerta
    }
  }

  // Función para abrir el modal de confirmación
  const openModal = () => {
    setIsModalVisible(true)
  }

  // Función para cerrar el modal de confirmación
  const closeModal = () => {
    setIsModalVisible(false)
  }

  // Función para confirmar la inscripción
  const confirmSignUp = () => {
    handleSignUp() // Ejecuta la lógica de inscripción
    closeModal() // Cierra el modal de confirmación
  }

  // Función para cerrar el modal de alerta
  const closeAlert = () => {
    setIsAlertVisible(false)
  }

  return (
    <View
      style={[
        styles.card,
        {backgroundColor: `${getActivityTypeColor(activity.tipo)}20`}, // Usamos activity.tipo
      ]}>
      <View style={styles.contentContainer}>
        <View style={styles.typeContainer}>
          <Text
            style={[
              styles.typeText,
              {color: getActivityTypeColor(activity.tipo)}, // Usamos activity.tipo
            ]}>
            {activity.tipo.toUpperCase() + activity.ID + typeof userId}
          </Text>
        </View>
        <Text style={styles.name}>{activity.nombre}</Text>{' '}
        {/* Usamos activity.nombre */}
        <Text style={styles.details}>
          {activityTime} - {activity.entrenador}{' '}
          {/* Usamos activity.entrenador */}
        </Text>
        <Text style={styles.details}>
          Disponibles: {activity.disponibles}/{activity.capacidad}{' '}
          {/* Usamos activity.disponibles y activity.capacidad */}
        </Text>
      </View>

      {/* Botón de favoritos */}
      <TouchableOpacity
        onPress={onToggleFavorite}
        style={styles.favoriteButton}>
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'} // Ícono de favorito
          size={24}
          color={isFavorite ? '#fbbf24' : '#fff'} // Color amarillo si está favorito, blanco si no
        />
      </TouchableOpacity>

      {/* Botón "Anotarme" */}
      <TouchableOpacity
        onPress={openModal}
        style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Anotarme</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={isModalVisible}
        title='Confirmar'
        message='¿Estás seguro de querer anotarte?'
        onAccept={confirmSignUp}
        onClose={closeModal}
      />

      {/* Modal de alerta personalizado */}
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
    position: 'relative', // Necesario para posicionar la badge
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
    paddingBottom: 65,
  },
  // Estilos para la badge (ahora un botón)
  badgeContainer: {
    position: 'absolute', // Posición absoluta para colocarla en la esquina
    bottom: 8, // Distancia desde la parte inferior
    right: 8, // Distancia desde la derecha
    backgroundColor: '#14b8a6', // Color de fondo de la badge
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12, // Bordes redondeados
  },
  badgeText: {
    color: 'white', // Color del texto
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
})

export default ActivityCard
