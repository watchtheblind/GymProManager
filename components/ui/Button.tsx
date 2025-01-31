import React from 'react'
import {StyleSheet, Animated, Text, Pressable, View} from 'react-native'

// Definimos la interfaz ButtonProps
interface ButtonProps {
  title: string // Título del botón (obligatorio)
  onPress?: () => void // Función a ejecutar al presionar el botón (opcional)
  disabled?: boolean // Propiedad opcional para desactivar el botón
  icon?: React.ReactNode // Propiedad opcional para agregar un ícono
  style?: any // Estilo personalizado para el botón
}

export default function Button({
  title,
  onPress = () => {},
  disabled = false,
  icon,
  style,
}: ButtonProps) {
  // Animación para el color de fondo
  const backgroundColorRef = new Animated.Value(0)

  const handlePressIn = () => {
    if (!disabled) {
      Animated.timing(backgroundColorRef, {
        toValue: 1,
        duration: 60,
        useNativeDriver: false, // Cambiar a false para compatibilidad con backgroundColor
      }).start()
    }
  }

  const handlePressOut = () => {
    if (!disabled) {
      Animated.timing(backgroundColorRef, {
        toValue: 0,
        duration: 60,
        useNativeDriver: false, // Cambiar a false para compatibilidad con backgroundColor
      }).start()
    }
  }

  // Interpolación del color de fondo
  const backgroundColor = backgroundColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['#B0A462', '#C0B472'], // Colores válidos para la animación
  })

  // Estilo dinámico del botón
  const buttonStyle = [
    styles.buttonContainer,
    {backgroundColor: disabled ? '#555' : backgroundColor}, // Cambia el color si está deshabilitado
    style, // Aplica estilos personalizados
  ]

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      <Animated.View style={buttonStyle}>
        {/* Ícono (si existe) */}
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {/* Título del botón */}
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 270,
    alignItems: 'center',
    backgroundColor: '#B0A462', // Color base del botón
    borderRadius: 99,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#FEF4C9',
    borderWidth: 2,
    flexDirection: 'row', // Para alinear el ícono y el texto horizontalmente
    justifyContent: 'center', // Centrar contenido
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'MyriadPro',
  },
  iconContainer: {
    marginRight: 8, // Espacio entre el ícono y el texto
  },
})
