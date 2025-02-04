import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import {useSession} from '@/hooks/SessionContext'
import {useNavigation} from '@react-navigation/native'

const App = () => {
  const navigation = useNavigation()
  const {logout} = useSession()

  // Estado para controlar la visibilidad del modal
  const [isModalVisible, setIsModalVisible] = useState(true)

  // Función para cerrar el modal
  const closeModal = () => {
    // setIsModalVisible(false) // Oculta el modal
    navigation.navigate('Bottomnav' as never) // Redirige a la pantalla de inicio
  }

  // Función para manejar la acción de "Aceptar"
  const handleAccept = async () => {
    console.log('Usuario aceptó')
    await logout() // Cierra la sesión
    navigation.navigate('Login' as never) // Redirige a la pantalla de inicio de sesión
    closeModal() // Cierra el modal
  }

  return (
    <View style={styles.container}>
      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={isModalVisible} // Controla la visibilidad del modal con el estado
        title='Cierre de sesión'
        message='¿Estás seguro de que quieres cerrar tu sesión?'
        onAccept={handleAccept} // Acción al presionar "Aceptar"
        onClose={closeModal} // Acción al presionar "Rechazar" o cerrar
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default App
