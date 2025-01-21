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

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      })

      if (!result.canceled) {
        const base64Size = result.assets[0].base64?.length ?? 0
        const fileSizeInMB = (base64Size * 0.75) / (1024 * 1024)

        if (fileSizeInMB > 5) {
          setError('La imagen no debe superar los 5MB')
          return
        }

        setFormData({
          fotoPerfil: `data:image/jpeg;base64,${result.assets[0].base64}`,
        })
        setError(null)
      }
    } catch (err) {
      console.error('Error al seleccionar imagen:', err)
      setError('Ocurrió un error al seleccionar la imagen')
    }
  }

  return (
    <View style={styles.container}>
      <Text className='font-Copperplate text-white text-center text-2xl'>
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
            <Text style={styles.placeholderText}>Toca para subir</Text>
          )}
        </View>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : formData.fotoPerfil ? (
        <Text style={styles.successText}>Imagen subida correctamente</Text>
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
    marginBlock: 50,
  },
  imageContainer: {
    marginTop: 50,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
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
    fontFamily: 'Copperplate',
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
