import React from 'react'
import {View, useWindowDimensions, Text, ScrollView} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function Vistacarrusel4() {
  const {width} = useWindowDimensions()
  const plans = [
    {
      id: 1,
      description: 'MIEMBRO BRONCE',
      color: 'bg-[#CC7751]',
      borderColor: 'border-[#DFAA8C]',
      borderRadius: 'rounded-tr-3xl rounded-bl-3xl border-4',
      price: 0,
      icon: 'trophy',
    },
    {
      id: 2,
      description: 'MIEMBRO PLATA',
      color: 'bg-[#518893]',
      borderColor: 'border-[#6CB0B4]',
      borderRadius: 'rounded-tl-3xl rounded-br-3xl border-4',
      price: 100,
      icon: 'medal',
    },
    {
      id: 3,
      description: 'MIEMBRO ORO',
      color: 'bg-[#B0A462]',
      borderColor: 'border-[#FEF4C9]',
      borderRadius: 'rounded-tr-3xl rounded-bl-3xl border-4',
      price: 200,
      icon: 'star',
    },
  ]

  return (
    <View style={{width, flex: 1}}>
      <View className='flex flex-row justify-center mt-6'>
        <Text className='font-Copperplate text-3xl text-white'>LA </Text>
        <Text className='font-Copperplate text-3xl text-[#DFAA8C]'>
          APLICACIÓN
        </Text>
      </View>
      <View className='flex flex-row justify-center'>
        <Text className='font-Copperplate text-3xl text-white'>QUE SE </Text>
        <Text className='font-Copperplate text-3xl text-[#6CB0B4]'>ADAPTA</Text>
        <Text className='font-Copperplate text-3xl text-[#B0A462]'> A TI</Text>
      </View>
      <View className='flex flex-col flex-1'>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}
          className='mt-4 w-full'>
          {plans.map((item) => (
            <View
              key={item.id}
              className={`p-2 w-80 h-40 items-center mb-4 ${item.color} border-2 ${item.borderColor} ${item.borderRadius}`}>
              <MaterialCommunityIcons
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={40}
                color='#fff'
                className='mb-4'
              />
              <Text className='text-xl font-Copperplate text-white text-center mb-2'>
                {item.description}
              </Text>
              <Text className='text-2xl font-Copperplate text-white'>
                {item.price === 0 ? 'Gratis' : item.price + ' €/mes'}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
