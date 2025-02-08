import React, {useState, useEffect} from 'react'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {useSession} from '@/hooks/SessionContext' // Asegúrate de que esta ruta sea correcta
import CustomAlert from '@/components/common/Alert'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Tabs from '@/components/common/Tabs'
import Header from '@/components/common/Header'
import Avatar from '@/components/common/Avatar'
import {useImagePicker} from '@/hooks/Settings/useImagePicker'
import useUpdateUser from '@/hooks/Settings/useUpdateUser'

const Settings = () => {
  return (
    <SafeAreaProvider>
      <AccountInfo />
    </SafeAreaProvider>
  )
}

function AccountInfo() {
  const {user, updateUserField} = useSession() // Extraemos updateUserField del contexto
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('basic')
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState<string>('')
  const [originalValue, setOriginalValue] = useState<string>('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const showAlert = (title: string, message: string) => {
    setAlertVisible(true)
    setAlertTitle(title)
    setAlertMessage(message)
  }
  // Hook para actualizar datos del usuario en el servidor
  const {updateUserField: updateOnServer, loading, error} = useUpdateUser()

  // Lógica de BackHandler usando el hook personalizado
  useBackHandler(() => {
    navigation.navigate('Bottomnav' as never)
    return true
  })

  const handlePress = () => {
    navigation.navigate('Bottomnav' as never)
  }

  // Datos para las tabs
  const tabs = [
    {id: 'basic', label: 'Información Básica'},
    {id: 'additional', label: 'Información Adicional'},
  ]

  // Función para obtener los datos según la pestaña activa
  const getTabContent = () => {
    if (activeTab === 'basic') {
      return [
        {label: 'Usuario', value: user?.user_login || '(Vacío)'},
        {label: 'Email', value: user?.user_email || '(Vacío)'},
        {label: 'Nombre', value: user?.meta?.backend_nombre || '(Vacío)'},
        {label: 'Apellido', value: user?.meta?.backend_apellido || '(Vacío)'},
        {label: 'Descripcion', value: user?.meta?.description || '(Vacío)'},
      ]
    } else if (activeTab === 'additional') {
      return [
        {label: 'NIF', value: user?.meta?.backend_nif || '(Vacío)'},
        {label: 'Dirección', value: user?.meta?.backend_direccion || '(Vacío)'},
        {
          label: 'Código País',
          value: user?.meta?.backend_codigo_pais || '(Vacío)',
        },
        {label: 'Teléfono', value: user?.meta?.backend_telefono || '(Vacío)'},
        {label: 'Género', value: user?.meta?.backend_genero || '(Vacío)'},
        {
          label: 'Fecha de Nacimiento',
          value: user?.meta?.backend_fecha_de_nacimiento || '(Vacío)',
        },
        {
          label: 'Altura',
          value: JSON.parse(user?.meta?.backend_altura ?? '{}')?.valor + ' in',
        },
        {
          label: 'Peso',
          value: JSON.parse(user?.meta?.backend_peso ?? '{}')?.valor + ' kg',
        },
      ]
    }
    return []
  }

  const tabContent = getTabContent()

  // Lógica para la imagen del avatar
  const {imageUri, base64, pickImage, reset} = useImagePicker({
    maxSizeInKB: 150,
  })
  const [avatarUri, setAvatarUri] = useState<string | null>(
    user?.meta?.backend_imagen || null,
  )

  // Sincroniza el estado de avatarUri con imageUri
  useEffect(() => {
    if (imageUri) {
      setAvatarUri(imageUri)
    }
  }, [imageUri])

  // Función para manejar la selección de la imagen
  const handleAvatarPress = async () => {
    try {
      // Llamar al hook useImagePicker para seleccionar la imagen
      await pickImage()

      // Validar que se haya obtenido la imagen en base64
      if (!base64) {
        throw new Error('No se pudo obtener la imagen en formato base64.')
      }

      // Validar el formato del base64
      if (!base64.startsWith('data:image/')) {
        throw new Error('El formato de la imagen no es válido.')
      }

      // Mostrar un mensaje con el inicio del base64 para depuración
      alert('Base64 de la imagen: ' + base64.substring(0, 100) + '...')

      // Construir el objeto de imagen a enviar al servidor
      const imageName = `perfil_${user?.ID || 'usuario'}.jpg` // Nombre dinámico
      const imageToSend = {
        nombre: imageName,
        contenido: base64, // Contenido de la imagen en base64
      }

      // Actualizar el campo en el servidor
      await updateOnServer(
        'Contraseña...', // Reemplaza con el token real
        String(user?.ID),
        'imagen', // Campo en el servidor para la imagen
        imageToSend,
      )

      // Actualizar el campo en el estado local y AsyncStorage
      await updateUserField('backend_imagen', imageToSend)

      // Mostrar mensaje de éxito
      showAlert('¡Todo hecho!', 'Imagen actualizada correctamente.')
    } catch (error: any) {
      if (error.message.includes('imagen')) {
        showAlert(
          'Error',
          'Hubo un problema al actualizar la imagen: ' + `${error.message}`,
        )
      } else {
        showAlert('Ha ocurrido un error', `${error.message}`)
      }
    }
  }

  // Función para iniciar la edición de un campo
  const startEditing = (label: string, value: string | number | Date) => {
    setEditingField(label)
    setTempValue(String(value))
    setOriginalValue(String(value))
  }

  // Función para guardar los cambios
  const saveEdit = async (label: string) => {
    if (tempValue.trim() === '') {
      setTempValue(originalValue)
      showAlert('Error', 'El campo no puede estar vacío.')
      return
    }

    try {
      // Mapeo original (fieldMapping) - NO SE MODIFICA
      const fieldMapping: Record<string, string> = {
        Usuario: 'user_login',
        Email: 'user_email', // Asegúrate de que coincida con el nombre del campo en el servidor
        Nombre: 'backend_nombre',
        Apellido: 'backend_apellido',
        Descripcion: 'description',
        NIF: 'backend_nif',
        Dirección: 'backend_direccion',
        'Código País': 'backend_codigo_pais',
        Teléfono: 'backend_telefono',
        Género: 'backend_genero',
        'Fecha de Nacimiento': 'backend_fecha_de_nacimiento',
        Altura: 'backend_altura',
        Peso: 'backend_peso',
        Imagen: 'backend_imagen',
      }

      // Nuevo mapeo para convertir los nombres del servidor a los nombres deseados
      const serverFieldMapping: Record<string, string> = {
        user_login: 'user_login', // No cambia
        user_email: 'correo_electronico',
        backend_nombre: 'nombre',
        backend_apellido: 'apellido',
        description: 'description', // No cambia
        backend_nif: 'nif',
        backend_direccion: 'direccion',
        backend_codigo_pais: 'codigo_pais',
        backend_telefono: 'telefono',
        backend_genero: 'genero',
        backend_fecha_de_nacimiento: 'fecha_de_nacimiento',
        backend_altura: 'altura',
        backend_peso: 'peso',
        backend_imagen: 'imagen',
      }

      // Obtener el campo del fieldMapping
      const mappedField = fieldMapping[label]
      if (!mappedField) {
        showAlert('Error', 'No se encontró el campo en el servidor.')
        return
      }

      // Convertir el campo al nombre deseado usando serverFieldMapping
      const serverField = serverFieldMapping[mappedField]
      const LocalField = fieldMapping[label]
      if (!serverField) {
        showAlert(
          'Error',
          'No se pudo mapear el campo al formato del servidor.',
        )
        return
      }

      // Construir el valor a enviar al servidor
      let valueToSend: string | number = tempValue
      if (label === 'Altura' || label === 'Peso') {
        const parsedValue = parseFloat(tempValue)
        if (isNaN(parsedValue)) {
          throw new Error('El valor debe ser un número válido.')
        }
        valueToSend = parsedValue
      }

      // Actualizar el campo en el servidor
      await updateOnServer(
        'Contraseña...', // Reemplaza con el token real
        String(user?.ID),
        serverField,
        valueToSend,
      )

      // Actualizar el campo en el estado local y AsyncStorage
      await updateUserField(LocalField, valueToSend)

      // Mostrar mensaje de éxito
      showAlert('¡Todo hecho!', `${label} ha sido editado correctamente.`)
    } catch (err: any) {
      showAlert('Error', `No se pudo actualizar ${label}: ${err.message}`)
    }

    setEditingField(null) // Sale del modo edición
  }
  // Función para cancelar la edición
  const cancelEdit = () => {
    setEditingField(null)
    setTempValue('')
  }

  return (
    <SafeAreaView
      className='flex-1 bg-[#1C1C1C]'
      style={{paddingTop: insets.top * 1.2}}>
      <ScrollView className='flex-1 px-2'>
        {/* Header */}
        <Header
          title='Información de cuenta'
          onBackPress={handlePress}
        />

        {/* Avatar Circle */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={handleAvatarPress}
            activeOpacity={0.7}
            className='max-h-28 flex-col justify-center'>
            <Avatar
              imageUrl={avatarUri || undefined}
              initials={user?.first_name?.[0]}
            />
            <View style={styles.addButton}>
              <MaterialIcons
                name='add'
                size={20}
                color='#FFFFFF'
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={(id) => setActiveTab(id)}
          containerStyle={{marginBottom: 20, marginInline: 10}}
        />

        {/* Tab Content */}
        <View className='mx-4 overflow-hidden rounded-tl-3xl rounded-br-3xl'>
          {tabContent.map((item, index) => (
            <View
              key={index}
              className={`flex-row items-center justify-between p-4 ${
                index % 2 === 0 ? 'bg-[#F5E6C3]' : 'bg-[#B5A97C]'
              }`}>
              <Text
                style={{fontFamily: 'MyriadPro'}}
                className={`text-base ${
                  index % 2 === 0 ? 'text-black' : 'text-white'
                }`}>
                {item.label}
              </Text>
              {editingField === item.label ? (
                <View className='flex-row items-center justify-end space-x-2'>
                  {loading ? (
                    <ActivityIndicator
                      size='small'
                      className='pr-2'
                      color={`${index % 2 == 0 ? '#B5A97C' : '#F5E6C3'}`}
                    />
                  ) : (
                    <TextInput
                      style={{fontFamily: 'MyriadPro'}}
                      value={tempValue}
                      maxLength={50}
                      onChangeText={setTempValue}
                      className={`border px-2 py-0 mr-2 rounded max-w-[70%] ${index % 2 == 0 ? 'border-[#B5A97C]' : 'border-[#F5E6C3]'}`}
                    />
                  )}

                  <TouchableOpacity onPress={() => saveEdit(item.label)}>
                    <MaterialIcons
                      name='save'
                      size={24}
                      color={index % 2 === 0 ? '#5A543E' : '#F5E6C3'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={cancelEdit}>
                    <MaterialIcons
                      name='close'
                      size={24}
                      color={index % 2 === 0 ? '#5A543E' : '#F5E6C3'}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View className='flex-row items-center space-x-2'>
                  <Text
                    className={`mr-2 ${
                      index % 2 === 0 ? 'text-zinc-600' : 'text-zinc-100'
                    }`}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {item.value}
                  </Text>
                  <TouchableOpacity
                    onPress={() => startEditing(item.label, item.value ?? '')}>
                    <MaterialIcons
                      name='edit'
                      size={24}
                      color={index % 2 === 0 ? '#5A543E' : '#F5E6C3'}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Alerta */}
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

// Estilos adicionales para el contenedor y el botón "+"
const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: 40,
  },
  addButton: {
    position: 'absolute',
    bottom: -8,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#B5A97C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
})

export default Settings
