import {useState} from 'react'

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
  const [loading, setLoading] = useState<boolean>(false) // Estado de carga
  const [error, setError] = useState<string | null>(null) // Estado de error

  // Función para actualizar un campo específico del usuario
  const updateUserField = async (
    token: string,
    userId: string,
    field: string,
    value: any, // El valor puede ser de cualquier tipo (string, number, objeto, etc.)
  ): Promise<string | undefined> => {
    setLoading(true) // Iniciar estado de carga
    setError(null) // Limpiar errores previos

    try {
      // Construir el objeto de usuario con el campo específico
      const userData: UserUpdateData = {
        ID: userId,
        [field]: value,
      }

      // Realizar la solicitud POST al servidor
      const response = await fetch(
        'https://gympromanager.com/app-user-update.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            usuario: userData,
          }),
        },
      )

      // Parsear la respuesta JSON
      const result: ServerResponse = await response.json()

      // Manejar errores del servidor
      if (result.error) {
        throw new Error(result.error)
      }

      // Retornar éxito
      return result.success
    } catch (err: any) {
      setError(err.message) // Capturar el error
      throw err // Propagar el error para manejarlo en el nivel superior si es necesario
    } finally {
      setLoading(false) // Finalizar estado de carga
    }
  }

  return {updateUserField, loading, error}
}

export default useUpdateUser
