import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import SelectorFecha from '@/components/Selectorfecha'
import MeasurementInputs from '@/components/ui/Medidasinputs'

interface Genero {
  value: 'masculino' | 'femenino' | 'neutral'
}

interface PesoAltura {
  peso: {
    valor: number
    unidad: 'kg' | 'lb'
  }
  altura: {
    valor: number
    unidad: 'cm' | 'pulg'
  }
}

interface Step2Props {
  formData: {
    fechaNacimiento: string
    genero?: Genero
  } & PesoAltura // Combina las propiedades de PesoAltura
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
        Fecha de nacimiento
      </Text>
      <SelectorFecha
        fechaNacimiento={formData.fechaNacimiento}
        setFechaNacimiento={(fecha) => setFormData({fechaNacimiento: fecha})}
      />
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
                formData.genero?.value === option.value
                  ? option.color
                  : `${option.color}80`,
              borderColor:
                formData.genero?.value === option.value
                  ? 'white'
                  : option.color,
            }}
            onPress={() =>
              setFormData({genero: {value: option.value as Genero['value']}})
            }
            accessibilityRole='radio'
            accessibilityState={{
              checked: formData.genero?.value === option.value,
            }}>
            <MaterialCommunityIcons
              name={option.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={32}
              color={
                formData.genero?.value === option.value ? 'white' : option.color
              }
            />
            <Text
              className={`text-lg ${formData.genero?.value === option.value ? 'text-white' : 'text-[#B0A462]'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className='mt-4 mb-2'>
        <View className='flex flex-row justify-center'>
          <Text className='text-white font-Copperplate text-2xl mb-1'>
            Establece{' '}
          </Text>
          <Text className='text-[#6CB0B4] font-Copperplate text-2xl mb-1'>
            altura
          </Text>
          <Text className='text-white font-Copperplate text-2xl mb-1'> y </Text>
          <Text className='text-[#CC7751] font-Copperplate text-2xl mb-1'>
            peso
          </Text>
        </View>
        <MeasurementInputs
          peso={formData.peso}
          altura={formData.altura}
          setPeso={(peso) => setFormData({peso})}
          setAltura={(altura) => setFormData({altura})}
        />
      </View>
    </View>
  )
}

export default Step2
