export const getActivityTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    YOGA: '#4FD1C5',
    cardio: '#ED8936',
    pilates: '#A0D2EB',
    strength: '#F06292',
    dance: '#B5AD6F',
  }
  return colors[type] || '#9A9A98'
}
