import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

interface DateButtonProps {
  date: Date
  day: number
  month: string
  isSelected: boolean
  onPress: () => void
}

export const DateButton: React.FC<DateButtonProps> = ({
  day,
  month,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.month}>{month}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    backgroundColor: '#6CB0B4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#2C4A5D',
  },
  day: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'MyriadPro',
  },
  month: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'MyriadPro',
  },
})
