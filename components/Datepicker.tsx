import type React from 'react'
import {useState, useEffect} from 'react'
import {View, TextInput, TouchableOpacity, Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {MaterialCommunityIcons} from '@expo/vector-icons'

interface DatePickerProps {
  birthDate: string
  setBirthDate: (date: string) => void
}

const DatePicker: React.FC<DatePickerProps> = ({birthDate, setBirthDate}) => {
  const [date, setDate] = useState<Date>(new Date())
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (birthDate) {
      const parsedDate = new Date(birthDate)
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
      } else {
        setDate(new Date())
      }
    } else {
      setDate(new Date())
    }
  }, [birthDate])

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)

    // Formato de fecha: DD/MM/YYYY
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`
    setBirthDate(formattedDate)
  }

  const showDatepicker = () => {
    setShow(true)
  }
  const today = new Date()
  return (
    <View>
      <View className='flex flex-row justify-center gap-5'>
        <TouchableOpacity
          onPress={showDatepicker}
          className='flex items-center justify-center w-12 h-12 p-2 bg-[#B0A462] border-4 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl border-[#FEF4C9]'>
          <MaterialCommunityIcons
            name='calendar'
            size={24}
            color='white'
          />
        </TouchableOpacity>
        <TextInput
          className='bg-[#B0A462] border-4 text-center text-lg w-10/12 justify-center border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white ml-2'
          style={[{fontFamily: 'MyriadPro'}]}
          placeholder='Tu fecha de nacimiento aquí'
          editable={false}
          placeholderTextColor='#fff'
          value={birthDate}
        />
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode='date'
          is24Hour={true}
          display='default'
          onChange={onChange}
          accentColor='#fff'
          maximumDate={today} //
        />
      )}
    </View>
  )
}

export default DatePicker
