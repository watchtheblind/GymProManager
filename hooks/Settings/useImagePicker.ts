import {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'

interface UseImagePickerOptions {
  maxSizeInKB?: number // Tamaño máximo permitido en KB (opcional)
}

interface UseImagePickerResult {
  imageUri: string | null
  base64: string | null // Nueva propiedad para almacenar la imagen en Base64
  error: string | null
  pickImage: () => Promise<void>
  reset: () => void
}

export const useImagePicker = ({
  maxSizeInKB = 150, // Valor predeterminado de 150 KB
}: UseImagePickerOptions = {}): UseImagePickerResult => {
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [base64, setBase64] = useState<string | null>(null) // Estado para almacenar la imagen en Base64
  const [error, setError] = useState<string | null>(null)

  const pickImage = async () => {
    try {
      // Solicitar permisos para acceder a la galería
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permissionResult.granted) {
        setError('Se requieren permisos para acceder a la galería.')
        return
      }

      // Abrir el selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
        allowsEditing: true, // Permitir edición/recorte
        aspect: [1, 1], // Proporción de recorte (cuadrado)
        quality: 0.7, // Calidad de la imagen (0-1)
      })

      if (result.canceled) {
        console.log('Selección cancelada')
        return
      }

      // Obtener la URI de la imagen seleccionada
      const selectedAsset = result.assets[0]
      if (selectedAsset) {
        const uri = selectedAsset.uri

        // Verificar el tamaño de la imagen
        const fileInfo = await fetch(uri)
        const blob = await fileInfo.blob()
        const sizeInKB = blob.size / 1024

        if (sizeInKB <= maxSizeInKB) {
          setImageUri(uri)
          setError(null)

          // Convertir la imagen a Base64
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })

          setBase64(base64Data) // Guardar la imagen en Base64
        } else {
          setError(
            `La imagen supera el tamaño máximo permitido (${maxSizeInKB} KB). Por favor, intenta con una imagen más pequeña.`,
          )
        }
      }
    } catch (err: any) {
      console.error('Error al seleccionar imagen:', err)
      setError('Ocurrió un error al seleccionar la imagen')
    }
  }

  const reset = () => {
    setImageUri(null)
    setBase64(null) // Limpiar la imagen en Base64
    setError(null)
  }

  return {imageUri, base64, error, pickImage, reset}
}
