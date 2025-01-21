import React from 'react'
import {View, Text, TextInput} from 'react-native'

interface Step4Props {
  formData: {
    interests: string
    goals: string
  }
  setFormData: (newData: Partial<Step4Props['formData']>) => void
}

const Step4: React.FC<Step4Props> = ({formData, setFormData}) => {
  return (
    <View className='w-10/12 flex flex-col gap-5 mt-6'>
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
        placeholder='Intereses*'
        onChangeText={(text) => setFormData({interests: text})}
        value={formData.interests}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Objetivos*'
        onChangeText={(text) => setFormData({goals: text})}
        value={formData.goals}
        placeholderTextColor='#fff'
      />
    </View>
  )
}

export default Step4
