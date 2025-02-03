import React, {useState} from 'react'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {useSession} from '@/hooks/SessionContext'
import CustomAlert from '@/components/ui/Alert'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StyleSheet,
  TextInput, // Importa TextInput aquí
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Tabs from '@/components/common/Tabs'
import Header from '@/components/common/Header'
import Avatar from '@/components/common/Avatar'

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
  const [alertTitle, setAlerTitle] = useState('')

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
        {label: 'Fecha de Registro', value: user?.user_registered || '(Vacío)'},
        {label: 'Nombre', value: user?.meta?.backend_nombre || '(Vacío)'},
        {label: 'Apellido', value: user?.meta?.backend_apellido || '(Vacío)'},
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

  // Función para iniciar la edición de un campo
  const startEditing = (label: string, value: string) => {
    setEditingField(label)
    setTempValue(value) // Inicializa el TextInput con el valor actual
    setOriginalValue(value) // Guarda el valor original
  }

  // Función para guardar los cambios
  const saveEdit = (label: string) => {
    if (tempValue.trim() === '') {
      setTempValue(originalValue)
      setAlertVisible(true)
      setAlertMessage('El campo no puede estar vacío.')
      setAlerTitle('Error')
    } else {
      setAlerTitle('Todo hecho!')
      setAlertMessage(`${label} ha sido editado correctamente.`)
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
            onPress={() => Alert.alert('Acción', 'Has presionado el avatar')}
            activeOpacity={0.7}
            className='max-h-28 flex-col justify-center'>
            {/* Avatar Original */}
            <Avatar
              imageUrl={user?.meta?.backend_imagen}
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
                    scrollEnabled={true}
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
                  <CustomAlert
                    visible={alertVisible}
                    title='Error'
                    message={alertMessage}
                    onClose={() => setAlertVisible(false)}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
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
