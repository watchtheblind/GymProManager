'use client'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
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

const Settings = () => {
  return (
    <SafeAreaProvider>
      <AccountInfo />
    </SafeAreaProvider>
  )
}

function AccountInfo() {
  const insets = useSafeAreaInsets()
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

  const handleSave = async (id: number) => {
    const itemToSave = menuItems.find((item) => item.id === id)
    if (!itemToSave) return

    const data = {[itemToSave.label]: itemToSave.value}

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
        setMenuItems(
          menuItems.map((item) =>
            item.id === id ? {...item, editing: false} : item,
          ),
        )
      } else {
        Alert.alert('Error', 'No se pudo guardar los cambios.')
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al intentar guardar los cambios.')
    }
  }

  return (
    <SafeAreaView
      className='flex-1 bg-[#1C1C1C]'
      style={{paddingTop: insets.top * 1.2}}>
      <ScrollView className='flex-1 px-2'>
        {/* Header */}
        <View className='flex-row items-center'>
          <View className='self-center'>
            <TouchableOpacity onPress={handlePress}>
              <MaterialIcons
                name='arrow-back'
                color='white'
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View className=' flex-1 box-border'>
            <Text
              className='text-white text-2xl text-center'
              style={{fontFamily: 'Copperplate'}}>
              Información de cuenta
            </Text>
          </View>
          <View style={{width: 24}} /> {/* Espacio para mantener el balance */}
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
                  <>
                    <TextInput
                      className={`mr-2 ${item.light ? 'text-zinc-600' : 'text-zinc-100'}`}
                      style={{flex: 1, maxWidth: '60%'}} // Limita el ancho del TextInput
                      value={item.value.toString()}
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
                    <TouchableOpacity onPress={() => handleSave(item.id)}>
                      <MaterialIcons
                        name='save'
                        size={20}
                        color={item.light ? '#666666' : '#FFFFFF'}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text
                      className={`mr-2 ${item.light ? 'text-zinc-600' : 'text-zinc-100'}`}
                      style={{maxWidth: '60%', flexShrink: 1}} // Limita el ancho del Text y permite que se contraiga
                      numberOfLines={1} // Evita que el texto se desborde
                      ellipsizeMode='tail' // Añade puntos suspensivos si el texto es muy largo
                    >
                      {item.value}
                    </Text>
                    <MaterialIcons
                      name='arrow-forward-ios'
                      size={20}
                      color={item.light ? '#666666' : '#FFFFFF'}
                    />
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
