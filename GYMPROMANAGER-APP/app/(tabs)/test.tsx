import Button from '@/components/ui/Button'
import {router, useNavigation} from 'expo-router'
import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native'
import Fetch from '@/hooks/FetchData'

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

  return (
    <View className='bg-[#1D1D1B] h-full text-white relative'>
      <View className='flex flex-row justify-center'>
        <Image
          className='mt-24'
          style={styles.logo}
          source={require('@/assets/images/logo.png')}
        />
      </View>
      <View className='flex flex-col items-center'>
        <Text className='text-white text-3xl font-Copperplate'>
          REGISTRARSE
        </Text>
        <View className='w-10/12 flex flex-col gap-5 mt-8'>
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
          <View className='flex flex-row justify-center mt-2'>
            <Button
              title='Acceder'
              onPress={handleSubmit}
            />
          </View>
          <View className='flex flex-row justify-center'>
            <TouchableOpacity onPress={redirigirRecuperarContrasena}>
              <Text className='text-white text-lg underline'>
                ¿Has olvidado tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className='flex flex-row items-center justify-center mt-24'>
        <Text className='text-white text-lg mr-2'>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={redirigirRegistro}>
          <Text className='text-[##B0A462] text-lg font-bold underline'>
            Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 250,
  },
})
