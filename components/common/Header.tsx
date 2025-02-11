// Header.tsx
import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface HeaderProps {
  title: string
  onBackPress: () => void
}

const Header: React.FC<HeaderProps> = ({title, onBackPress}) => {
  return (
    <View className='flex-row items-center'>
      <TouchableOpacity onPress={onBackPress}>
        <MaterialIcons
          name='arrow-back'
          color='white'
          size={24}
        />
      </TouchableOpacity>
      <View className='flex-1 box-border'>
        <Text
          className='text-white text-2xl text-center'
          style={{fontFamily: 'Copperplate'}}>
          {title}
        </Text>
      </View>
      <View style={{width: 24}} />
    </View>
  )
}

export default Header
