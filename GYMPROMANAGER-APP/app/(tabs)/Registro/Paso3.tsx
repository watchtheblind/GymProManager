import type React from 'react'
import {useState} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

interface Step3Props {
  formData: {
    fotoPerfil: string
  }
  setFormData: (newData: Partial<Step3Props['formData']>) => void
}

const Step3: React.FC<Step3Props> = ({formData, setFormData}) => {
  const [error, setError] = useState<string | null>(null)

  const handleImagePick = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!permissionResult.granted) {
        setError('Se necesitan permisos para acceder a la galería')
        return
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      })

      if (!result.canceled && result.assets[0].base64) {
        let base64 = result.assets[0].base64
        let compressionQuality = 1

        while (base64.length * 0.75 > 256 * 1024 && compressionQuality > 0.1) {
          compressionQuality -= 0.1
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: compressionQuality,
            base64: true,
          })
          if (result.canceled || !result.assets[0].base64) break
          base64 = result.assets[0].base64
        }

        if (base64.length * 0.75 <= 256 * 1024) {
          setFormData({
            fotoPerfil: `data:image/jpeg;base64,${base64}`,
          })
          setError(null)
        } else {
          setError(
            'No se pudo comprimir la imagen a menos de 256KB. Por favor, intenta con una imagen más pequeña.',
          )
        }
      }
    } catch (err) {
      console.error('Error al seleccionar imagen:', err)
      setError('Ocurrió un error al seleccionar la imagen')
    }
  }

  return (
    <View style={styles.container}>
      <Text className='font-Copperplate text-2xl text-white'>
        FOTO DE PERFIL
      </Text>

      <TouchableOpacity
        onPress={handleImagePick}
        style={styles.imageContainer}>
        <View style={styles.circle}>
          {formData.fotoPerfil ? (
            <Image
              source={{uri: formData.fotoPerfil}}
              style={styles.image}
            />
          ) : (
            <Text
              style={styles.placeholderText}
              className='font-Copperplate'>
              Toca para subir
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : formData.fotoPerfil ? (
        <Text style={styles.successText}>
          Imagen subida correctamente (tamaño:{' '}
          {Math.round((formData.fotoPerfil.length * 0.75) / 1024)} KB)
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '83.33%', // w-10/12
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    marginBlock: 100,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#CC7751',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    color: '#CC7751',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
  },
})

export default Step3
