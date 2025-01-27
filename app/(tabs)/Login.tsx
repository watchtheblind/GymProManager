import React, {useState, useCallback} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'

import Button from '@/components/ui/Button'
import {router} from 'expo-router'
import Fetch from '@/hooks/FetchData'

export default function Login() {
  const [formData, setFormData] = useState({
    email: 'yop@alexcd2000.com',
    password: 'ePfpoFZN123',
  })
  const [showPassword, setShowPassword] = useState(false) // Estado para mostrar/ocultar la contraseña

  const redirectToRegister = useCallback(() => {
    router.navigate('./Signup')
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      const user = await Fetch(
        'https://gympromanager.com/wp-json/api/v2/suscription',
      ).post('', formData)
      const response = user
      if (response.user_email) {
        router.navigate('./home')
        return
      }
      if (response.error) {
        router.navigate('./Home')
      } else {
        Alert.alert('Error', 'Network error')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Network error')
    }
  }, [formData])

  return (
    <View className='bg-[#1D1D1B] h-full text-white relative'>
      <Image
        source={require('@/assets/images/marcotriangulos.png')}
        className='absolute left-1/2 top-72 transform -translate-x-1/2 z-0'
        style={{resizeMode: 'cover'}}
      />
      <View className='flex flex-row justify-center z-10'>
        <Image
          className='mt-24'
          style={styles.logo}
          source={require('@/assets/images/logo.png')}
        />
      </View>
      <View className='flex flex-col items-center z-10 mt-20'>
        <Text className='text-white text-3xl font-Copperplate'>ACCEDER</Text>
        <View className='w-10/12 flex flex-col gap-5 mt-8'>
          <TextInput
            className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white'
            placeholder='Correo electrónico'
            onChangeText={(text) => setFormData({...formData, email: text})}
            value={formData.email}
            placeholderTextColor='#fff'
            style={styles.input} // Aplica el estilo para el texto
          />
          <View style={styles.passwordContainer}>
            <TextInput
              className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white'
              placeholder='Contraseña'
              onChangeText={(text) =>
                setFormData({...formData, password: text})
              }
              secureTextEntry={!showPassword} // Oculta o muestra la contraseña
              value={formData.password}
              placeholderTextColor='#fff'
              style={styles.passwordInput} // Aplica el estilo específico para la contraseña
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)} // Cambia el estado al presionar el ícono
              style={styles.icon}>
              <Icon
                name={showPassword ? 'visibility-off' : 'visibility'} // Cambia el ícono según el estado
                size={24}
                color='#fff'
              />
            </TouchableOpacity>
          </View>
          <View className='flex flex-row justify-center mt-2'>
            <Button
              title='Acceder'
              onPress={() => {
                router.navigate('./Bottomnav')
              }}
            />
          </View>
          <View className='flex flex-row justify-center'>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Info', 'Funcionalidad no implementada')
              }>
              <Text
                className='text-white text-lg underline'
                style={{
                  fontFamily: 'MyriadPro',
                }}>
                ¿Has olvidado tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className='flex flex-row items-center justify-center mt-28'>
        <Text
          className='text-white text-xl mr-2'
          style={{
            fontFamily: 'MyriadPro',
          }}>
          ¿No tienes una cuenta?
        </Text>
        <TouchableOpacity onPress={redirectToRegister}>
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
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -12}], // Centra el ícono verticalmente
  },
  input: {
    width: '100%', // Asegura que el input ocupe el 100% del contenedor
  },
  passwordInput: {
    width: '100%', // Asegura que el input ocupe el 100% del contenedor
    paddingRight: 40, // Añade padding a la derecha para evitar que el texto se solape con el ícono
  },
})
