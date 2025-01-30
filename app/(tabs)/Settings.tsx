'use client'

import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {useNavigation} from '@react-navigation/native'

export default function AccountInfo() {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('Bottomnav' as never)
  }
  const [menuItems, setMenuItems] = useState([
    {id: 1, label: 'Nombre', value: 'Nombre', light: true, editing: false},
    {id: 2, label: 'Peso', value: 'Peso', light: false, editing: false},
    {
      id: 3,
      label: 'Fecha de nacimiento',
      value: 'Fecha',
      light: true,
      editing: false,
    },
    {
      id: 4,
      label: 'Correo electrónico',
      value: 'Correo',
      light: false,
      editing: false,
    },
  ])

  const handleEdit = (id: number) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? {...item, editing: true} : item,
      ),
    )
  }

  const handleChange = (id: number, text: string) => {
    setMenuItems(
      menuItems.map((item) => (item.id === id ? {...item, value: text} : item)),
    )
  }

  const handleSave = async () => {
    const data = menuItems.reduce((acc: {[key: string]: string}, item) => {
      acc[item.label] = item.value
      return acc
    }, {})

    try {
      // Simulación de una llamada a la API
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      if (response.ok) {
        Alert.alert('Éxito', 'Los cambios se han guardado correctamente.')
      } else {
        Alert.alert('Error', 'No se pudo guardar los cambios.')
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al intentar guardar los cambios.')
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#1C1C1C]'>
      <ScrollView className='flex-1 px-2'>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 pt-4 my-10'>
          <TouchableOpacity onPress={handlePress}>
            <MaterialIcons
              name='arrow-back'
              color='white'
              size={24}
            />
          </TouchableOpacity>
          <Text
            className='text-white text-xl'
            style={[{fontFamily: 'MyriadPro'}]}>
            Información de cuenta
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text
              className='text-[#5FA7A0] text-xl'
              style={[{fontFamily: 'MyriadPro'}]}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View className='items-center py-8 mb-5'>
          <Image
            source={{
              uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RGUuPrbDRpG3q2654hiVI4uLIZODMx.png',
            }}
            className='h-32 w-32 rounded-full'
          />
        </View>

        {/* Menu Items */}
        <View className='mx-4 overflow-hidden rounded-tl-3xl rounded-br-3xl'>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center justify-between p-4 ${item.light ? 'bg-[#F5E6C3]' : 'bg-[#B5A97C]'}`}
              onPress={() => handleEdit(item.id)}>
              <Text
                className={`text-base font-medium ${item.light ? 'text-black' : 'text-white'}`}>
                {item.label}
              </Text>
              <View className='flex-row items-center flex-1 justify-end'>
                {item.editing ? (
                  <TextInput
                    className={`mr-2 ${item.light ? 'text-zinc-600' : 'text-zinc-100'}`}
                    style={{flex: 1, maxWidth: '60%'}} // Limita el ancho del TextInput
                    value={item.value}
                    onChangeText={(text) => handleChange(item.id, text)}
                    onBlur={() =>
                      setMenuItems(
                        menuItems.map((i) =>
                          i.id === item.id ? {...i, editing: false} : i,
                        ),
                      )
                    }
                    autoFocus
                  />
                ) : (
                  <Text
                    className={`mr-2 ${item.light ? 'text-zinc-600' : 'text-zinc-100'}`}
                    style={{maxWidth: '60%', flexShrink: 1}} // Limita el ancho del Text y permite que se contraiga
                    numberOfLines={1} // Evita que el texto se desborde
                    ellipsizeMode='tail' // Añade puntos suspensivos si el texto es muy largo
                  >
                    {item.value}
                  </Text>
                )}
                <MaterialIcons
                  name='arrow-forward-ios'
                  size={20}
                  color={item.light ? '#666666' : '#FFFFFF'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
