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
export type UserData = {
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
  setSessionData: (userData: UserData) => Promise<void>
  logout: () => Promise<void>
  updateUserField: (field: string, value: any) => Promise<void>
  refreshSession: () => Promise<void> // Nueva función
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isLoading: true,
  setSessionData: async () => {},
  logout: async () => {},
  updateUserField: async () => {},
  refreshSession: async () => {}, // Nueva función
})

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
  const setSessionData = async (userData: UserData) => {
    try {
      const expiresAt = moment().add(1, 'hour').toISOString()
      const session = {user: userData, expiresAt}
      await AsyncStorage.setItem('userSession', JSON.stringify(session))
      setUser(userData)
      console.log(userData)
    } catch (error) {
      console.error('Error during setSessionData:', error)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userSession')
      setUser(null)
      navigation.navigate('index' as never)
    } catch (error) {
      console.error('Error durante el cierre:', error)
    }
  }

  // Función para actualizar un campo en el servidor
  const updateOnServer = async (field: string, value: any) => {
    if (!user) {
      throw new Error('No hay una sesión activa')
    }

    try {
      // Aquí haces la llamada al servidor para actualizar el campo
      const response = await fetch(
        'https://gympromanager.com/update-user.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.ID, // ID del usuario
            field, // Campo a actualizar
            value, // Nuevo valor
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Error al actualizar el campo en el servidor',
        )
      }

      console.log('Campo actualizado en el servidor:', data)
      return data
    } catch (error) {
      console.error('Error en updateOnServer:', error)
      throw error
    }
  }

  // Función para actualizar un campo específico del usuario
  const updateUserField = async (field: string, value: any) => {
    if (!user) {
      throw new Error('No hay un usuario logueado')
    }

    try {
      // Actualizar el campo en el servidor
      await updateOnServer(field, value)

      // Refrescar la sesión para obtener los datos actualizados
      await refreshSession()
    } catch (error) {
      console.error('Error updating user field:', error)
      throw error
    }
  }

  // Función para refrescar la sesión
  const refreshSession = async () => {
    if (!user) {
      throw new Error('No hay un usuario logueado')
    }

    try {
      // Hacer una solicitud al servidor para obtener los datos actualizados del usuario
      const response = await fetch(
        'https://gympromanager.com/app-setSessionData.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `email=${encodeURIComponent(user.user_email)}&password=${encodeURIComponent('admin')}`, // Aquí deberías manejar la contraseña de manera segura
        },
      )

      const data = await response.json()

      if (data.user_email) {
        await setSessionData(data) // Guardar los datos actualizados en el contexto
      } else {
        throw new Error('No se pudo actualizar la sesión')
      }
    } catch (error) {
      console.error('Error refreshing session:', error)
      throw error
    }
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        isLoading,
        setSessionData,
        logout,
        updateUserField,
        refreshSession,
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
