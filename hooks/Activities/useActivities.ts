import {useState, useEffect} from 'react'
import moment from 'moment'
import {fetchActivities} from '../Data/Endpoints'

export interface Activity {
  ID: string
  nombre: string
  descripcion: string
  tipo: string
  fechahora: string // Formato: YYYY-MM-DD HH:mm:ss
  duracion: string
  lugar: string
  recurrencia: string
  entrenador: string
  capacidad: number
  inscritos: string
  disponibles: number
  action?: string
}

export const useActivities = (selectedDate: Date) => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true)
      try {
        const response = await fetchActivities('Contraseña...')
        const pickedDate = moment(selectedDate).format('YYYY-MM-DD')

        setActivities(
          response.filter((activity: Activity) =>
            moment(activity.fechahora).isSame(pickedDate, 'day'),
          ),
        )
      } catch (error: any) {
        console.error('Error al cargar actividades:', error.message)
        setError(`Error al cargar actividades: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [selectedDate])

  return {activities, loading, error}
}
