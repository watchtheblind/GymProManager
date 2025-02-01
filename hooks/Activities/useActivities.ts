import {useState, useEffect} from 'react'
import moment from 'moment'

const API_URL = 'https://retoolapi.dev/ugkMJ5/GYMACTIVITIESAPP'

interface Activity {
  id: string
  name: string
  time: string
  type: 'yoga' | 'cardio' | 'pilates' | 'strength' | 'dance'
  capacity: number
  available: number
  Instructor: string
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
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD')
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Failed to fetch activities')
        const data = await response.json()
        const filteredData = data.filter(
          (activity: Activity) =>
            moment(activity.time, 'MMM DD, YYYY h:mm A').format(
              'YYYY-MM-DD',
            ) === formattedDate,
        )
        setActivities(filteredData)
      } catch (error) {
        console.error('Error fetching activities:', error)
        setError('Failed to load activities. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [selectedDate])

  return {activities, loading, error}
}
