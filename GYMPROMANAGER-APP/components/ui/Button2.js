import React from 'react'
import {TouchableOpacity, Text} from 'react-native'

const CustomButton = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 50,
        backgroundColor: disabled ? '#8f8f8f' : '#B0A462',
        borderWidth: 4,
        borderColor: disabled ? '#A9A9A9' : '#FEF4C9',
      }}
      className='flex items-center w-10/12 rounded-full'
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          color: disabled ? '#bababa' : 'white',
        }}
        className='p-2 font-bold text-xl'>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
