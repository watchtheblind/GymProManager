import React from 'react'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {useSession} from '@/hooks/SessionContext'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  StyleSheet,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Tabs from '@/components/common/Tabs'
import Header from '@/components/common/Header'

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
  const [activeTab, setActiveTab] = React.useState('basic') // Estado para manejar la pestaña activa

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
        {label: 'ID', value: user?.ID},
        {label: 'Usuario', value: user?.user_login},
        {label: 'Email', value: user?.user_email},
        {label: 'Rol', value: user?.roles?.join(', ')},
        {label: 'Fecha de Registro', value: user?.user_registered},
        {label: 'Nombre', value: user?.meta?.backend_nombre},
        {label: 'Apellido', value: user?.meta?.backend_apellido},
        {label: 'Descripción', value: user?.meta?.description || '(Vacío)'},
      ]
    } else if (activeTab === 'additional') {
      return [
        {label: 'NIF', value: user?.meta?.backend_nif},
        {label: 'Dirección', value: user?.meta?.backend_direccion},
        {label: 'Código País', value: user?.meta?.backend_codigo_pais},
        {label: 'Teléfono', value: user?.meta?.backend_telefono},
        {label: 'Género', value: user?.meta?.backend_genero},
        {
          label: 'Fecha de Nacimiento',
          value: user?.meta?.backend_fecha_de_nacimiento,
        },
        {
          label: 'Altura',
          value: JSON.parse(user?.meta?.backend_altura ?? '{}')?.valor + ' in',
        },
        {
          label: 'Peso',
          value: JSON.parse(user?.meta?.backend_peso ?? '{}')?.valor + ' kg',
        },
        {label: 'Imagen', value: user?.meta?.backend_imagen},
      ]
    }
    return []
  }

  const tabContent = getTabContent()

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
          {user?.meta?.backend_imagen ? (
            <Image
              source={{uri: user.meta.backend_imagen}}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.placeholderText}>
                {user?.meta?.backend_nombre
                  ? user.meta.backend_nombre[0].toUpperCase()
                  : 'U'}
              </Text>
            </View>
          )}
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
                className={`text-base font-medium ${
                  index % 2 === 0 ? 'text-black' : 'text-white'
                }`}>
                {item.label}
              </Text>
              <Text
                className={`mr-2 ${
                  index % 2 === 0 ? 'text-zinc-600' : 'text-zinc-100'
                }`}
                numberOfLines={1}
                ellipsizeMode='tail'>
                {item.value === 'Ver Imagen' ? (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert('Imagen', 'Mostrando imagen...', [
                        {text: 'Aceptar'},
                      ])
                    }>
                    <Text>Ver Imagen</Text>
                  </TouchableOpacity>
                ) : (
                  item.value
                )}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Estilos para el avatar
const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#B5A97C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})

export default Settings
