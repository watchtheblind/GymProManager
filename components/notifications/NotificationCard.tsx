import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

// Interfaz para las props
interface NotificationCardProps {
  notification: {
    titulo: string
    texto: string
    fechahora: string
    tipo: string
  }
  onDelete?: () => void // Función opcional para eliminar
}

// Función para determinar los colores según el tipo de notificación
const getBackgroundColor = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case 'aviso':
      return {backgroundColor: '#518893', borderColor: '#6CB0B4'}
    case 'rutina':
      return {backgroundColor: '#CC7751', borderColor: '#DFAA8C'}
    case 'actividad':
      return {backgroundColor: '#B0A462', borderColor: '#FEF4C9'}
    default:
      return {backgroundColor: '#9B9B9B', borderColor: '#C0C0C0'}
  }
}

// Componente principal
const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onDelete,
}) => {
  const colors = getBackgroundColor(notification.tipo)

  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={[
          styles.notificationItem,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderWidth: 2,
          },
        ]}
        onPress={onDelete} // Ejecuta onDelete cuando se presiona el card
      >
        <View style={styles.leftContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{notification.titulo}</Text>
            <Text style={styles.text}>{notification.texto}</Text>
            <Text style={styles.time}>
              {new Date(notification.fechahora).toLocaleString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  )
}

// Estilos
const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'MyriadPro',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  text: {
    fontFamily: 'MyriadPro',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    fontFamily: 'MyriadPro',
    color: 'rgba(255, 255, 255, 0.6)',
  },
})

export default NotificationCard
