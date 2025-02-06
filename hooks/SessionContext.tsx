import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

// Definir la interfaz para los datos del usuario
interface UserData {
  ID: number
  user_login: string
  user_email: string
  first_name: string
  last_name: string
  user_registered: string
  roles: string[]
  meta: {
    nickname: string
    first_name: string
    last_name: string
    description: string
    backend_nombre: string
    backend_apellido: string
    backend_nif: string
    backend_direccion: string
    backend_codigo_pais: string
    backend_telefono: string
    backend_genero: string
    backend_fecha_de_nacimiento: string
    backend_altura: string
    backend_peso: string
    backend_imagen: string
  }
  has_active_subscription: boolean
  active_subscription_details: null | any
}

// Definir el tipo para el contexto
interface SessionContextType {
  user: UserData | null
  isLoading: boolean
  login: (userData: UserData) => Promise<void>
  logout: () => Promise<void>
  updateUserField: (field: string, value: any) => Promise<void> // Nueva función
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  updateUserField: async () => {}, // Nueva función
})

// Proveedor del contexto
export const SessionProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  // Cargar la sesión al iniciar la aplicación
  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession')
        if (session) {
          const parsedSession = JSON.parse(session)
          const {user, expiresAt} = parsedSession
          if (moment().isBefore(expiresAt)) {
            setUser(user)
          } else {
            await AsyncStorage.removeItem('userSession')
          }
        }
      } catch (error) {
        console.error('Error loading session:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSession()
  }, [])

  // Función para iniciar sesión
  const login = async (userData: UserData) => {
    try {
      const expiresAt = moment().add(1, 'hour').toISOString()
      const session = {user: userData, expiresAt}
      await AsyncStorage.setItem('userSession', JSON.stringify(session))
      setUser(userData)
      console.log('Datos del usuario guardados:', userData)
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userSession')
      setUser(null)
      navigation.navigate('index' as never)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  // Función para actualizar un campo específico del usuario
  const updateUserField = async (field: string, value: any) => {
    if (!user) {
      throw new Error('No hay un usuario logueado')
    }

    try {
      // Actualizar el campo en el estado local
      const updatedUser = {
        ...user,
        meta: {
          ...user.meta,
          [field]: value,
        },
      }
      setUser(updatedUser)

      // Guardar los cambios en AsyncStorage
      const expiresAt = moment().add(1, 'hour').toISOString()
      const session = {user: updatedUser, expiresAt}
      await AsyncStorage.setItem('userSession', JSON.stringify(session))

      console.log(`Campo "${field}" actualizado:`, value)
      console.log('Usuario actualizado:', updatedUser) // Usar updatedUser  aquí
    } catch (error) {
      console.error('Error updating user field:', error)
      throw error
    }
  }

  return (
    <SessionContext.Provider
      value={{user, isLoading, login, logout, updateUserField}}>
      {children}
    </SessionContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useSession = () => useContext(SessionContext)
