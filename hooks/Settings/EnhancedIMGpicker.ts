import {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'

// Definimos las opciones del hook
interface UseImageHandlerOptions {
  maxSizeInKB?: number // Tamaño máximo permitido en KB (opcional)
  quality?: number // Calidad de la imagen (0-1, opcional)
  aspect?: [number, number] // Proporción del recorte (opcional)
}

// Definimos el tipo de retorno del hook
interface UseImageHandlerResult {
  imageUri: string | null // URI de la imagen seleccionada
  base64: string | null // Representación Base64 de la imagen
  error: string | null // Mensaje de error, si ocurre alguno
  pickAndProcessImage: () => Promise<void> // Función para seleccionar y procesar la imagen
  reset: () => void // Función para restablecer el estado
}

export const useImageHandler = ({
  maxSizeInKB = 300, // Valor predeterminado de 300 KB
  quality = 0.7, // Calidad predeterminada
  aspect = [1, 1], // Proporción cuadrada por defecto
}: UseImageHandlerOptions = {}): UseImageHandlerResult => {
  const [imageUri, setImageUri] = useState<string | null>(null) // URI de la imagen
  const [base64, setBase64] = useState<string | null>(null) // Imagen en Base64
  const [error, setError] = useState<string | null>(null) // Estado de error

  // Función para seleccionar y procesar la imagen
  const pickAndProcessImage = async (): Promise<void> => {
    try {
      // Paso 1: Solicitar permisos para acceder a la galería
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permissionResult.granted) {
        throw new Error('Se requieren permisos para acceder a la galería.')
      }

      // Paso 2: Abrir el selector de imágenes con opciones de edición
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'livePhotos'], // Solo imágenes
        allowsEditing: true, // Habilitar edición/recorte
        aspect, // Proporción del recorte
        quality, // Calidad de la imagen
      })

      if (result.canceled) {
        throw new Error('Selección cancelada por el usuario.')
      }

      const uri = result.assets[0].uri

      // Paso 3: Validar el tamaño de la imagen
      const fileInfo = await fetch(uri)
      const blob = await fileInfo.blob()
      const sizeInKB = blob.size / 1024

      if (sizeInKB > maxSizeInKB) {
        throw new Error(
          `La imagen supera el tamaño máximo permitido (${maxSizeInKB} KB).`,
        )
      }

      // Paso 4: Convertir la imagen a Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]) // Extrae solo la parte Base64
          } else {
            reject(
              new Error('El resultado de FileReader no es una cadena válida.'),
            )
          }
        }
        reader.onerror = () =>
          reject(new Error('Error al convertir la imagen a Base64.'))
        reader.readAsDataURL(blob)
      })

      // Actualizar estados
      setImageUri(uri)
      setBase64(base64Data)
      setError(null)
    } catch (err: any) {
      setError(err.message) // Manejar errores
    }
  }

  // Función para restablecer el estado
  const reset = (): void => {
    setImageUri(null)
    setBase64(null)
    setError(null)
  }

  return {imageUri, base64, error, pickAndProcessImage, reset}
}
