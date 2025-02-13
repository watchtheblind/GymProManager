import {useState, useEffect} from 'react'
import moment from 'moment'
import {fetchActivities} from '../Data/Endpoints'

export interface Activity {
  ID: string // Cambiado a string para coincidir con la respuesta JSON
  nombre: string
  descripcion: string
  tipo: string
  fechahora: string // Formato: YYYY-MM-DD HH:mm:ss
  duracion: string
  lugar: string
  recurrencia: string
  entrenador: string
  capacidad: number
  inscritos: string // Cambiado a string para coincidir con la respuesta JSON
  disponibles: number
  action?: string
}

export const useActivities = (selectedDate: Date) => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const LoadActivities = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetchActivities('Contraseña...')

        // Verificamos si la respuesta es null (error)
        if (response === null) {
          throw new Error('No se pudieron cargar las actividades')
        }

        // Filtra las actividades por la fecha seleccionada
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD')
        const filteredData = response.filter(
          (activity: Activity) =>
            moment(activity.fechahora).format('YYYY-MM-DD') === formattedDate,
        )

        setActivities(filteredData)
      } catch (error: any) {
        console.error('Error al cargar actividades:', error.message)
        setError(
          'Ocurrió un error al cargar las actividades.' +
            '\n' +
            '(' +
            error.message +
            ')',
        )
      } finally {
        setLoading(false)
      }
    }

    LoadActivities()
  }, [selectedDate])

  return {activities, loading, error}
}
