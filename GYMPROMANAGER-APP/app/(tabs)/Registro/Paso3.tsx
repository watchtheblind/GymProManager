import React from 'react'
import {View, Text, TextInput} from 'react-native'

interface Step3Props {
  formData: {
    ocupacion: string
    nivelEducativo: string
  }
  setFormData: (newData: Partial<Step3Props['formData']>) => void
}

const Step3: React.FC<Step3Props> = ({formData, setFormData}) => {
  return (
    <View className='w-10/12 flex flex-col gap-5 mt-6'>
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
        placeholder='Ocupación*'
        onChangeText={(text) => setFormData({ocupacion: text})}
        value={formData.ocupacion}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Nivel Educativo*'
        onChangeText={(text) => setFormData({nivelEducativo: text})}
        value={formData.nivelEducativo}
        placeholderTextColor='#fff'
      />
    </View>
  )
}

export default Step3
