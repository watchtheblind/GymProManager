// hooks/useDates.ts
import {useState} from 'react'

interface DateInfo {
  date: Date
  day: number
  month: string
}

const getNextTwoWeeks = (): DateInfo[] => {
  const dates: DateInfo[] = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push({
      date: date,
      day: date.getDate(),
      month: date.toLocaleString('es', {month: 'short'}),
    })
  }

  return dates
}

const useDates = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const dates = getNextTwoWeeks()

  return {
    dates,
    selectedDate,
    setSelectedDate,
  }
}

export default useDates
