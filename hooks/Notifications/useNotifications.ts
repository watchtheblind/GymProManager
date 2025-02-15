import {useState, useCallback} from 'react'
import {getNotifications} from '../Data/Endpoints'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Definición de tipos para las notificaciones
interface Notification {
  titulo: string
  texto: string
  fechahora: string
  tipo: 'actividad' | 'rutina' | 'aviso'
}

// Constantes globales
const NOTIFICATION_TOKEN = 'Contraseña...' // Token configurable
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000 // 24 horas en milisegundos

// Función auxiliar para calcular la fecha sin la hora
const getDateOnly = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// Hook principal
const useNotifications = (user: {ID?: number | undefined} | null) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para cargar notificaciones desde el backend
  const fetchNotifications = useCallback(async () => {
    if (!user?.ID) return
    setLoading(true)
    setError(null)
    try {
      const fetchedNotifications = await getNotifications(
        NOTIFICATION_TOKEN,
        user.ID,
        true, // Usar caché normal
      )

      console.log(
        'Notificaciones obtenidas:',
        JSON.stringify(fetchedNotifications, null, 2),
      )

      // Guardar las notificaciones COMPLETAS en caché con una clave separada
      await AsyncStorage.setItem(
        `allNotifications:${user.ID}`, // Clave única para las notificaciones completas
        JSON.stringify({data: fetchedNotifications, timestamp: Date.now()}),
      )

      // Validar las notificaciones
      const validNotifications = validateNotifications(fetchedNotifications)
      setNotifications(validNotifications)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [user])

  // Función para validar las notificaciones
  const validateNotifications = (data: any[]): Notification[] => {
    return data.filter(
      (notification): notification is Notification =>
        notification.titulo !== undefined &&
        notification.texto !== undefined &&
        notification.fechahora !== undefined &&
        ['actividad', 'rutina', 'aviso'].includes(notification.tipo),
    )
  }

  // Función para filtrar notificaciones relevantes basadas en la fecha y tipo
  const getRelevantNotifications = useCallback(() => {
    const now = new Date()
    const currentDate = getDateOnly(now)
    const next24Hours = new Date(currentDate.getTime() + ONE_DAY_IN_MS)
    return notifications.filter((notification) => {
      const notificationDateOnly = getDateOnly(new Date(notification.fechahora))
      switch (notification.tipo) {
        case 'actividad':
          return (
            notificationDateOnly >= currentDate &&
            notificationDateOnly <= next24Hours
          )
        case 'rutina':
          return notificationDateOnly.getTime() === currentDate.getTime()
        case 'aviso':
          return true
        default:
          return false
      }
    })
  }, [notifications])

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    getRelevantNotifications,
  }
}

export default useNotifications
