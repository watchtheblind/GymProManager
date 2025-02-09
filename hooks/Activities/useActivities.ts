import {useState, useEffect} from 'react'
import moment from 'moment'

const API_URL = 'https://gympromanager.com/app-activities.php'
const TOKEN = 'Contraseña...'

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
    const fetchActivities = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `token=${TOKEN}`,
        })

        if (!response.ok) throw new Error('Failed to fetch activities')

        const data = await response.json()

        // Filtra las actividades por la fecha seleccionada
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD')
        const filteredData = data.filter(
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

    fetchActivities()
  }, [selectedDate])

  return {activities, loading, error}
}
