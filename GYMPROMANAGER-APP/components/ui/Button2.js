import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const CustomButton = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 50,
        backgroundColor: disabled ? '#8f8f8f' : '#B0A462', // Cambia el color de fondo si está deshabilitado
        borderWidth: 4, // Mantiene el borde siempre
        borderColor: disabled ? '#A9A9A9' : '#FEF4C9', // Cambia el color del borde si está deshabilitado
      }}
      className='flex items-center w-10/12 rounded-full'
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          color: disabled ? '#bababa' : 'white', // Cambia el color del texto si está deshabilitado
        }}
        className='p-2 font-bold text-xl'>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
