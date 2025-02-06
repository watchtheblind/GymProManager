import {useState} from 'react'
import Fetch from '../FetchData'

// Tipos para los datos del usuario
interface UserUpdateData {
  ID: string
  [key: string]: any // Permite campos dinámicos como "nombre", "correo_electronico", etc.
}

// Tipo para la respuesta del servidor
interface ServerResponse {
  success?: string
  error?: string
}

// Hook personalizado para actualizar datos del usuario
const useUpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Crea una instancia de FetchData para manejar las solicitudes HTTP
  const fetchData = Fetch('https://gympromanager.com/')

  // Función para actualizar un campo específico del usuario
  const updateUserField = async (
    token: string,
    userId: string,
    field: string,
    value: any,
  ): Promise<string | undefined> => {
    setLoading(true)
    setError(null)

    try {
      // Construir el objeto de usuario con el campo específico
      const userData: UserUpdateData = {
        ID: userId,
        [field]: value,
      }

      // Realizar la solicitud POST utilizando FetchData
      const result: ServerResponse = await fetchData.post(
        'app-user-update.php',
        {
          token: token,
          usuario: userData,
        },
      )

      // Manejar errores del servidor
      if (result.error) {
        throw new Error(result.error)
      }

      // Retornar éxito
      return result.success
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {updateUserField, loading, error}
}

export default useUpdateUser
