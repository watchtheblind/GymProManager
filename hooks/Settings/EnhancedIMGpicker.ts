import {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'

export const useImageHandler = ({maxSizeInKB = 300}) => {
  const [imageUri, setImageUri] = useState(null)
  const [base64, setBase64] = useState(null)
  const [error, setError] = useState(null)

  const pickAndProcessImage = async () => {
    try {
      // Paso 1: Seleccionar la imagen con recorte
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permissionResult.granted) {
        throw new Error('Se requieren permisos para acceder a la galería.')
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Habilitar recorte
        aspect: [1, 1], // Proporción cuadrada
        quality: 0.7,
      })

      if (result.canceled) {
        throw new Error('Selección cancelada por el usuario.')
      }

      const uri = result.assets[0].uri

      // Paso 2: Validar el tamaño
      const fileInfo = await fetch(uri)
      const blob = await fileInfo.blob()
      const sizeInKB = blob.size / 1024

      if (sizeInKB > maxSizeInKB) {
        throw new Error(
          `La imagen supera el tamaño máximo permitido (${maxSizeInKB} KB).`,
        )
      }

      // Paso 3: Convertir a Base64
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result.split(',')[1])
        reader.onerror = () =>
          reject(new Error('Error al convertir la imagen a Base64.'))
        reader.readAsDataURL(blob)
      })

      // Actualizar estados
      setImageUri(uri)
      setBase64(base64Data)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return {imageUri, base64, error, pickAndProcessImage}
}
