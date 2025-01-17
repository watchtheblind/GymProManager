import React from 'react'
import {View, Text, TextInput} from 'react-native'

interface Step2Props {
  formData: {
    fechaNacimiento: string
    genero: string
  }
  setFormData: (newData: Partial<Step2Props['formData']>) => void
}

const Step2: React.FC<Step2Props> = ({formData, setFormData}) => {
  return (
    <View className='w-10/12 flex flex-col gap-5 mt-6'>
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
        placeholder='Fecha de Nacimiento*'
        onChangeText={(text) => setFormData({fechaNacimiento: text})}
        value={formData.fechaNacimiento}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Género*'
        onChangeText={(text) => setFormData({genero: text})}
        value={formData.genero}
        placeholderTextColor='#fff'
      />
    </View>
  )
}

export default Step2
