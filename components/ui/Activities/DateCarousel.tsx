import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {DateButton} from './Datebutton'

interface DateInfo {
  date: Date
  day: number
  month: string
}

interface DateCarouselProps {
  dates: DateInfo[]
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

const DateCarousel: React.FC<DateCarouselProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <FlatList
      horizontal
      data={dates}
      renderItem={({item}) => (
        <DateButton
          date={item.date}
          day={item.day}
          month={item.month}
          isSelected={item.date.toDateString() === selectedDate.toDateString()}
          onPress={() => onSelectDate(item.date)}
        />
      )}
      keyExtractor={(item) => item.date.toISOString()}
      style={styles.dateList}
    />
  )
}

const styles = StyleSheet.create({
  dateList: {
    alignSelf: 'flex-start',
    flexShrink: 1,
    paddingVertical: 0,
    marginVertical: 0,
    minHeight: 0,
    flexGrow: 0,
  },
})

export default DateCarousel
