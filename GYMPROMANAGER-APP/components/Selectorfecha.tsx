import React, {useState} from 'react'
import {View, TextInput, TouchableOpacity, Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Appearance} from 'react-native'

const colorScheme = Appearance.getColorScheme()

interface SelectorFechaProps {
  fechaNacimiento: string // Valor de la fecha en formato de cadena
  setFechaNacimiento: (fecha: string) => void // Función para actualizar la fecha
}

const SelectorFecha: React.FC<SelectorFechaProps> = ({
  fechaNacimiento,
  setFechaNacimiento,
}) => {
  const [date, setDate] = useState(new Date(fechaNacimiento))
  const [show, setShow] = useState(false)

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios') // Mantener el selector abierto en iOS
    setDate(currentDate)
    setFechaNacimiento(currentDate.toLocaleDateString()) // Actualiza la fecha en el componente padre
  }

  return (
    <View>
      <View className='flex flex-row justify-center gap-5'>
        <TouchableOpacity
          onPress={() => setShow(true)}
          className='flex items-center justify-center w-12 h-12 p-2 bg-[#B0A462] border-4 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl border-[#FEF4C9]'>
          <MaterialCommunityIcons
            name='calendar'
            size={24}
            color='white'
          />
        </TouchableOpacity>
        <TextInput
          className='bg-[#B0A462] border-4 text-center text-lg w-10/12 justify-center border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white ml-2'
          placeholder='Tu fecha de nacimiento aquí'
          editable={false}
          placeholderTextColor='#fff'
          value={date.toLocaleDateString()} // Formato de fecha
          placeholderClassName='text-center'
        />
      </View>
      {show && (
        <DateTimePicker
          accentColor='#fff'
          value={date}
          mode='date' // Puedes cambiar a 'time' o 'datetime' según sea necesario
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  )
}

export default SelectorFecha
