import {useState} from 'react'
import ImagePicker from 'react-native-image-crop-picker'

interface UseImagePickerOptions {
  maxSizeInKB?: number // Tamaño máximo permitido en KB (opcional)
}

interface UseImagePickerResult {
  imageUri: string | null
  error: string | null
  pickImage: () => Promise<void>
  reset: () => void
}

// Definición del tipo para la respuesta de ImagePicker
interface ImagePickerResponse {
  path: string
  width: number
  height: number
  mime?: string
  size?: number
  data?: string | null // Cambiado a string | null
}

export const useImagePicker = ({
  maxSizeInKB = 150,
}: UseImagePickerOptions = {}): UseImagePickerResult => {
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const pickImage = async () => {
    try {
      // Verifica que ImagePicker esté correctamente inicializado
      if (!ImagePicker) {
        throw new Error('ImagePicker no está inicializado.')
      }

      const image: ImagePickerResponse = await ImagePicker.openPicker({
        width: 300, // Ancho deseado
        height: 300, // Alto deseado
        cropping: true, // Habilitar recorte
        compressImageMaxWidth: 800, // Máximo ancho después de compresión
        compressImageMaxHeight: 800, // Máximo alto después de compresión
        compressImageQuality: 0.7, // Calidad de compresión (0-1)
        includeBase64: true, // Obtener la imagen en formato base64
      })

      if (image.data) {
        const base64 = image.data
        const sizeInKB = (base64.length * 0.75) / 1024 // Calcula el tamaño en KB
        if (sizeInKB <= maxSizeInKB) {
          setImageUri(`data:image/jpeg;base64,${base64}`)
          setError(null)
        } else {
          setError(
            `La imagen supera el tamaño máximo permitido (${maxSizeInKB} KB). Por favor, intenta con una imagen más pequeña.`,
          )
        }
      }
    } catch (err: any) {
      if (err.code === 'E_PICKER_CANCELLED') {
        console.log('Selección cancelada')
      } else {
        console.error('Error al seleccionar imagen:', err)
        setError('Ocurrió un error al seleccionar la imagen')
      }
    }
  }

  const reset = () => {
    setImageUri(null)
    setError(null)
  }

  return {imageUri, error, pickImage, reset}
}
