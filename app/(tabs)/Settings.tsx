'use client'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function AccountInfo() {
  const menuItems = [
    {id: 1, label: 'Nombre', value: 'Nombre', light: true},
    {id: 2, label: 'Peso', value: 'Peso', light: false},
    {id: 3, label: 'Fecha de nacimiento', value: 'Fecha', light: true},
    {id: 4, label: 'Correo electrónico', value: 'Correo', light: false},
  ]

  return (
    <SafeAreaView className='flex-1 bg-[#1C1C1C]'>
      <ScrollView className='flex-1'>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 pt-4 my-10'>
          <TouchableOpacity>
            <MaterialIcons
              name='arrow-back'
              color='white'
              size={24}
            />
          </TouchableOpacity>
          <Text className='text-white text-lg font-medium'>
            Información de cuenta
          </Text>
          <TouchableOpacity>
            <Text className='text-[#5FA7A0] text-lg font-medium'>Guardar</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View className='items-center py-8'>
          <Image
            source={{
              uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RGUuPrbDRpG3q2654hiVI4uLIZODMx.png',
            }}
            className='h-32 w-32 rounded-full'
          />
        </View>

        {/* Menu Items */}
        <View className='mx-4 overflow-hidden rounded-3xl'>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center justify-between p-4 ${item.light ? 'bg-[#F5E6C3]' : 'bg-[#B5A97C]'}`}>
              <Text
                className={`text-base font-medium ${item.light ? 'text-black' : 'text-white'}`}>
                {item.label}
              </Text>
              <View className='flex-row items-center'>
                <Text
                  className={`mr-2 ${item.light ? 'text-zinc-600' : 'text-zinc-100'}`}>
                  {item.value}
                </Text>
                <MaterialIcons
                  name='arrow-forward-ios'
                  size={20}
                  color={item.light ? '#666666' : '#FFFFFF'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
      </ScrollView>
    </SafeAreaView>
  )
}
