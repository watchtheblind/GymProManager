import Button from '@/components/ui/Button'
import {router, useNavigation} from 'expo-router'
import React, {useState} from 'react'
import checkbox from '@/components/Checkbox'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Fetch from '@/hooks/FetchData'
import Checkbox from 'expo-checkbox'

type FormData = {
  name: string
  email: string
  password: string
}

export default function Registro() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const redirigirRegistro = () => {
    router.navigate('./Registro')
  }
  const redirigirRecuperarContrasena = () => {
    router.navigate('./Recuperarcontrasena')
  }

  const handleSubmit = async () => {
    Fetch('https://gympromanager.com/wp-json/api/v2/suscription')
      .post('', formData)
      .then((user: any) => {
        const response: any = user
        if (response.user_email) {
          router.navigate('./home')
          return
        }
        if (response.error) {
          Alert.alert('Info', response.error)
        } else {
          Alert.alert('Error', 'Error de red')
        }
      })
      .catch((error: any) => {
        console.error(error)
        Alert.alert('Error', 'Error de red')
      })
  }
  const [marcado, setMarcado] = React.useState(false)
  return (
    <View className='flex-1 justify-center h-full text-white relative'>
      <View className='flex-1 justify-center items-center absolute inset-0 w-full h-full opacity-70'>
        <Image
          className='mt-24 h-72 w-96'
          source={require('@/assets/images/logo.png')}
        />
      </View>
      <View className='absolute inset-0 bg-[#1D1D1B] opacity-90'></View>
      <View className='flex flex-col items-center'>
        <Text className='text-white text-3xl font-Copperplate'>REGISTRO</Text>
        <View className='w-10/12 flex flex-col gap-5 mt-6'>
          <TextInput
            className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
            placeholder='Nombre*'
            onChangeText={(text) => setFormData({...formData, email: text})}
            value={formData.email}
            placeholderTextColor='#fff'
          />
          <TextInput
            className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
            placeholder='Apellidos*'
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={true}
            value={formData.password}
            placeholderTextColor='#fff'
          />
          <TextInput
            className='bg-[#CC7751] border-4 py-3 border-[#DFAA8C] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
            placeholder='NIF/CUI/RUT/CI/CC/CURP'
            onChangeText={(text) => setFormData({...formData, email: text})}
            value={formData.email}
            placeholderTextColor='#fff'
          />
          <TextInput
            className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
            placeholder='Domicilio/Dirección'
            onChangeText={(text) => setFormData({...formData, email: text})}
            value={formData.email}
            placeholderTextColor='#fff'
          />
          <TextInput
            className='bg-[#CC7751] border-4 py-3 border-[#DFAA8C] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
            placeholder='Número telefónico'
            onChangeText={(text) => setFormData({...formData, email: text})}
            value={formData.email}
            placeholderTextColor='#fff'
          />
          <TextInput
            className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
            placeholder='Email'
            onChangeText={(text) => setFormData({...formData, email: text})}
            value={formData.email}
            placeholderTextColor='#fff'
          />
          <TextInput
            className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
            placeholder='Contraseña'
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={true}
            value={formData.password}
            placeholderTextColor='#fff'
          />
          <View className='flex flex-row items-center justify-center'>
            <Checkbox
              value={marcado}
              onValueChange={setMarcado}></Checkbox>
            <Text className='text-white text-xs ml-2 flex-1'>
              Acepto recibir comunicaciones de Trainingym y puedo consultar la
              Política de Privacidad
            </Text>
          </View>
          <View className='flex flex-row justify-center mt-2'>
            <Button
              title='Siguiente '
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
