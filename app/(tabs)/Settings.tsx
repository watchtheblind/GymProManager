import React, {useState, useEffect} from 'react'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {useSession} from '@/hooks/SessionContext'
import CustomAlert from '@/components/ui/Alert'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
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
  const {user} = useSession()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('basic') // Estado para manejar la pestaña activa
  const [editingField, setEditingField] = useState<string | null>(null) // Campo en edición
  const [tempValue, setTempValue] = useState<string>('') // Valor temporal mientras se edita
  const [originalValue, setOriginalValue] = useState<string>('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')

  // Hook para actualizar datos del usuario
  const {updateUserField, loading, error} = useUpdateUser()

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
        {label: 'Nombre', value: user?.first_name || '(Vacío)'},
        {label: 'Apellido', value: user?.last_name || '(Vacío)'},
        {label: 'Descripción', value: user?.meta?.description || '(Vacío)'},
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
      setAvatarUri(imageUri) // Actualiza el estado local cuando imageUri cambia
    }
  }, [imageUri])

  const handleAvatarPress = async () => {
    try {
      await pickImage() // Seleccionar una nueva imagen
      if (base64) {
        // Mostrar el Base64 en un alert
        alert('Base64 de la imagen' + base64.substring(0, 100) + '...') // Muestra solo los primeros 100 caracteres
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error)
    }
  }

  // Función para iniciar la edición de un campo
  const startEditing = (label: string, value: string | number) => {
    setEditingField(label)
    setTempValue(String(value)) // Convierte el valor a cadena
    setOriginalValue(String(value)) // Guarda el valor original como cadena
  }

  // Función para guardar los cambios usando el hook
  const saveEdit = async (label: string) => {
    if (tempValue.trim() === '') {
      setTempValue(originalValue)
      setAlertVisible(true)
      setAlertMessage('El campo no puede estar vacío.')
      setAlertTitle('Error')
      return
    }

    try {
      // Mapear el campo al nombre esperado por el servidor
      const fieldMapping: Record<string, string> = {
        Usuario: 'user_login',
        Email: 'correo_electronico',
        Nombre: 'nombre',
        Apellido: 'apellido',
        Descripción: 'description',
        NIF: 'nif',
        Dirección: 'direccion',
        'Código País': 'codigo_pais',
        Teléfono: 'telefono',
        Género: 'genero',
        'Fecha de Nacimiento': 'fecha_de_nacimiento',
        Altura: 'altura.valor',
        Peso: 'peso.valor',
      }

      const serverField = fieldMapping[label]
      if (!serverField) {
        throw new Error(`Campo desconocido: ${label}`)
      }

      // Construir el valor a enviar al servidor
      let valueToSend: string | number = tempValue // Por defecto, enviamos como string
      if (label === 'Altura' || label === 'Peso') {
        const parsedValue = parseFloat(tempValue) // Convertir a número
        if (isNaN(parsedValue)) {
          throw new Error('El valor debe ser un número válido.')
        }
        valueToSend = parsedValue // Enviamos como número
      }

      // Actualizar el campo usando el hook
      await updateUserField(
        'Contraseña...',
        String(user?.ID),
        serverField,
        valueToSend,
      )

      // Mostrar mensaje de éxito
      setAlertVisible(true)
      setAlertTitle('¡Todo hecho!')
      setAlertMessage(`${label} ha sido editado correctamente.`)
    } catch (err: any) {
      console.error('Error al actualizar el campo:', err.message)
      setAlertVisible(true)
      setAlertTitle('Error')
      setAlertMessage(`No se pudo actualizar ${label}: ${err.message}`)
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

        {/* Avatar Circle - Usando el componente reutilizable dentro de un TouchableOpacitiy */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={handleAvatarPress}
            activeOpacity={0.7}
            className='max-h-28 flex-col justify-center'>
            {/* Avatar Original */}
            <Avatar
              imageUrl={avatarUri || undefined}
              initials={user?.meta?.backend_nombre?.[0]}
            />
            {/* Botón "+" Circular */}
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
          containerStyle={{marginBottom: 20}}
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
                  <TextInput
                    style={{fontFamily: 'MyriadPro'}}
                    value={tempValue}
                    maxLength={50}
                    onChangeText={setTempValue}
                    className='border border-gray-300 px-2 py-0 mr-2 rounded max-w-[70%]'
                  />
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
    bottom: -8, // Ajusta la posición vertical
    right: 0, // Ajusta la posición horizontal
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
