import React, {useState, useCallback} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import Button from '@/components/ui/Button'
import {router} from 'expo-router'
import CustomAlert from '@/components/ui/Alert'

export default function Login() {
  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: 'admin',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false) // Estado para controlar la visibilidad de la alerta
  const [alertMessage, setAlertMessage] = useState('') // Mensaje de la alerta
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar el loader

  const redirectToRegister = useCallback(() => {
    router.navigate('./Signup')
  }, [])

  const handleSubmit = useCallback(async () => {
    setIsLoading(true) // Activar el estado de carga
    try {
      // Simulación de un retraso de 5 segundos
      await new Promise((resolve) => setTimeout(resolve, 5000))
      const response = await fetch('https://gympromanager.com/app-login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
      })
      const data = await response.json()
      if (data.user_email) {
        router.navigate('./Bottomnav')
      } else if (data.error) {
        setAlertMessage(data.error) // Establece el mensaje de error
        setAlertVisible(true) // Muestra la alerta
      } else {
        setAlertMessage(
          'Error de red inesperado. Por favor, inténtelo de nuevo.',
        ) // Establece el mensaje de error
        setAlertVisible(true) // Muestra la alerta
      }
    } catch (error) {
      console.error(error)
      setAlertMessage('Error de red inesperado. Por favor, inténtelo de nuevo.') // Establece el mensaje de error
      setAlertVisible(true) // Muestra la alerta
    } finally {
      setIsLoading(false) // Desactivar el estado de carga
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
          {/* Campo de correo electrónico */}
          <TextInput
            className={`${
              isLoading ? 'bg-[#555]' : 'bg-[#B0A462]'
            } border-4 py-3 rounded-tr-3xl rounded-bl-3xl p-2 text-white`}
            placeholder='Correo electrónico'
            onChangeText={(text) => setFormData({...formData, email: text})}
            value={formData.email}
            placeholderTextColor='#fff'
            editable={!isLoading} // Desactivar cuando isLoading es true
            style={[
              styles.input,
              {borderColor: isLoading ? '#555' : '#FEF4C9'}, // Cambiar el color del borde según isLoading
            ]}
          />
          {/* Campo de contraseña */}
          <View style={styles.passwordContainer}>
            <TextInput
              className={`${
                isLoading ? 'bg-[#444]' : 'bg-[#6CB0B4]'
              } border-4 py-3 rounded-tl-3xl rounded-br-3xl p-2 text-white`}
              placeholder='Contraseña'
              onChangeText={(text) =>
                setFormData({...formData, password: text})
              }
              secureTextEntry={!showPassword}
              value={formData.password}
              placeholderTextColor='#fff'
              editable={!isLoading} // Desactivar cuando isLoading es true
              style={[
                styles.passwordInput,
                {borderColor: isLoading ? '#444' : '#518893'}, // Cambiar el color del borde según isLoading
              ]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.icon}>
              <Icon
                name={showPassword ? 'visibility-off' : 'visibility'}
                size={24}
                color='#fff'
              />
            </TouchableOpacity>
          </View>
          {/* Botón Acceder con loader */}
          <View className='flex flex-row justify-center mt-2'>
            <Button
              title={isLoading ? '' : 'Acceder'} // Cambiar texto del botón
              onPress={handleSubmit}
              disabled={isLoading} // Desactivar el botón mientras isLoading es true
              style={[
                styles.button,
                {
                  backgroundColor: isLoading ? '#555' : '#B0A462',
                  borderColor: isLoading ? '#555' : '#FEF4C9', // Cambiar el color del borde según isLoading
                },
              ]}
              icon={
                isLoading && (
                  <ActivityIndicator
                    size='small'
                    color='#fff'
                    style={{marginLeft: 8}}
                  />
                )
              }
            />
          </View>
          {/* Enlace para recuperar contraseña */}
          <View className='flex flex-row justify-center'>
            <TouchableOpacity
              onPress={() => {
                setAlertMessage('Funcionalidad no implementada') // Establece el mensaje
                setAlertVisible(true) // Muestra la alerta
              }}>
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
      {/* Enlace para registrarse */}
      <View className='flex flex-row items-center justify-center mt-28'>
        <Text
          className='text-white text-xl mr-2'
          style={{
            fontFamily: 'MyriadPro',
          }}>
          ¿No tienes una cuenta?
        </Text>
        <TouchableOpacity onPress={redirectToRegister}>
          <Text className='text-[#B0A462] text-lg font-bold underline'>
            Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
      {/* Componente CustomAlert */}
      <CustomAlert
        visible={alertVisible}
        title='Error'
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
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
    transform: [{translateY: -12}],
  },
  input: {
    width: '100%',
  },
  passwordInput: {
    width: '100%',
    paddingRight: 40,
  },
  button: {
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})
