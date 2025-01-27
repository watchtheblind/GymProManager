import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import DateSelector from '@/components/Datepicker'
import MeasurementInputs from '@/components/ui/Inputmeasurements'

interface Gender {
  value: 'masculino' | 'femenino' | 'neutral'
}

interface WeightHeight {
  weight: {
    value: number
    unit: 'kg' | 'lb'
  }
  height: {
    value: number
    unit: 'cm' | 'pulg'
  }
}

interface Step2Props {
  formData: {
    birthDate: string
    gender?: Gender
  } & WeightHeight // Combina las propiedades de WeightHeight
  setFormData: (newData: Partial<Step2Props['formData']>) => void
}

const GenderOptions = [
  {
    value: 'male',
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
    value: 'female',
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
      <DateSelector
        birthDate={formData.birthDate}
        setBirthDate={(date) => setFormData({birthDate: date})}
      />
      <Text className='text-white font-Copperplate text-center text-2xl mb-1'>
        Escoge tu género
      </Text>
      <View className='flex-row flex-wrap justify-around'>
        {GenderOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            className='flex flex-row items-center p-2 border-2 rounded-full'
            style={{
              borderWidth: 3,
              backgroundColor:
                formData.gender?.value === option.value
                  ? option.color
                  : `${option.color}80`,
              borderColor:
                formData.gender?.value === option.value
                  ? 'white'
                  : option.color,
            }}
            onPress={() =>
              setFormData({gender: {value: option.value as Gender['value']}})
            }
            accessibilityRole='radio'
            accessibilityState={{
              checked: formData.gender?.value === option.value,
            }}>
            <MaterialCommunityIcons
              name={option.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={32}
              color={
                formData.gender?.value === option.value ? 'white' : option.color
              }
            />
            <Text
              className={`text-lg ${formData.gender?.value === option.value ? 'text-white' : 'text-[#B0A462]'}`}
              style={[{fontFamily: 'MyriadPro'}]}>
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
          weight={formData.weight}
          height={formData.height}
          setWeight={(weight) => setFormData({weight})}
          setHeight={(height) => setFormData({height})}
        />
      </View>
    </View>
  )
}

export default Step2
