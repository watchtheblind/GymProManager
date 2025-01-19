import React from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import SelectorFecha from '@/components/Selectorfecha'
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
    value: 'neutral',
    label: 'Neutral',
    icon: 'gender-non-binary',
    color: '#B0A462',
  },
  {
    value: 'femenino',
    label: null,
    icon: 'gender-female',
    color: '#f28cd9',
  },
]

const Step2: React.FC<Step2Props> = ({formData, setFormData}) => {
  return (
    <View className='w-11/12 gap-5 mt-6'>
      <Text className='text-white font-Copperplate text-center text-2xl mb-1'>
        Introduce tu fecha de nacimiento
      </Text>
      <SelectorFecha
        fechaNacimiento={formData.fechaNacimiento}
        setFechaNacimiento={(fecha) => setFormData({fechaNacimiento: fecha})}
      />
      {/* <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white'
        placeholder='Fecha de Nacimientso*'
        onChangeText={(text) => setFormData({fechaNacimiento: text})}
        value={formData.fechaNacimiento}
        placeholderTextColor='#fff'
      /> */}
      <Text className='text-white font-Copperplate text-center text-2xl mb-1'>
        Escoge tu género
      </Text>
      <View className='flex-row flex-wrap justify-around'>
        {OpcionesdeGeneros.map((option) => (
          <TouchableOpacity
            key={option.value}
            className='flex flex-row items-center p-2 border-2 rounded-full'
            style={{
              borderWidth: 3,
              backgroundColor:
                formData.genero === option.value
                  ? option.color
                  : `${option.color}80`,
              borderColor:
                formData.genero === option.value ? 'white' : option.color,
            }}
            onPress={() => setFormData({genero: option.value})}
            accessibilityRole='radio'
            accessibilityState={{checked: formData.genero === option.value}}>
            <MaterialCommunityIcons
              name={option.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={32}
              color={formData.genero === option.value ? 'white' : option.color}
            />
            <Text
              className={`text-lg ${formData.genero === option.value ? 'text-white' : 'text-[#B0A462]'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Step2
