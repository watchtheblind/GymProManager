import React from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

interface Step2Props {
  formData: {
    fechaNacimiento: string
    genero: string
  }
  setFormData: (newData: Partial<Step2Props['formData']>) => void
}

const OpcionesdeGeneros = [
  {
    value: 'masculino',
    label: null,
    icon: 'gender-male',
    color: '#6CB0B4',
  },
  {
    value: 'femenino',
    label: null,
    icon: 'gender-female',
    color: '#CC7751',
  },
  {
    value: 'neutral',
    label: 'Neutral',
    icon: 'gender-non-binary',
    color: '#B0A462',
  },
]

const Step2: React.FC<Step2Props> = ({formData, setFormData}) => {
  return (
    <View className='w-11/12 gap-5 mt-6'>
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white'
        placeholder='Fecha de Nacimiento*'
        onChangeText={(text) => setFormData({fechaNacimiento: text})}
        value={formData.fechaNacimiento}
        placeholderTextColor='#fff'
      />
      <Text className='text-white text-lg font-bold mb-2'>Género</Text>
      <View className='flex flex-col gap-4'>
        {OpcionesdeGeneros.map((option) => (
          <TouchableOpacity
            key={option.value}
            className={`flex-row items-center w-min p-2 rounded-full border-4 ${
              formData.genero === option.value
                ? `bg-${option.color} border-white`
                : `bg-gray-800 border-${option.color}`
            }`}
            onPress={() => setFormData({genero: option.value})}
            accessibilityRole='radio'
            accessibilityState={{checked: formData.genero === option.value}}>
            <MaterialCommunityIcons
              name={option.icon as any}
              size={32}
              color={formData.genero === option.value ? 'white' : option.color}
            />
            <Text
              className={`ml-4 text-lg ${formData.genero === option.value ? 'text-white' : `text-${option.color}`}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Step2
