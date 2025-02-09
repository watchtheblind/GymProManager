import {useState, useCallback} from 'react'

const useNotifications = (user: any) => {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para cargar notificaciones desde el backend
  const fetchNotifications = useCallback(async () => {
    if (!user?.ID) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://gympromanager.com/app-notif.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `token=Contraseña...&userid=${user.ID}`,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      // Validar que las notificaciones tengan el formato correcto
      const validNotifications = data.filter((notification: any) => {
        return (
          notification.titulo !== undefined &&
          notification.texto !== undefined &&
          notification.fechahora !== undefined &&
          notification.tipo !== undefined
        )
      })

      setNotifications(validNotifications)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [user])

  // Filtrar notificaciones relevantes basadas en la fecha y tipo
  const getRelevantNotifications = useCallback(() => {
    const now = new Date()
    const currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    )

    return notifications.filter((notification) => {
      const notificationDate = new Date(notification.fechahora)
      const notificationDateOnly = new Date(
        notificationDate.getFullYear(),
        notificationDate.getMonth(),
        notificationDate.getDate(),
      )

      // Mostrar solo actividades actuales o futuras dentro de las próximas 24 horas
      if (notification.tipo === 'actividad') {
        const next24Hours = new Date(
          currentDate.getTime() + 24 * 60 * 60 * 1000,
        )
        return (
          notificationDateOnly >= currentDate &&
          notificationDateOnly <= next24Hours
        )
      }

      // Mostrar rutinas del día actual
      if (notification.tipo === 'rutina') {
        return notificationDateOnly.getTime() === currentDate.getTime()
      }

      // Mostrar avisos generales (sin restricción de tiempo)
      if (notification.tipo === 'aviso') {
        return true
      }

      return false
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
