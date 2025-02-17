import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

interface GenericCardProps {
  title: string // Título principal (nombre de la actividad/programa/rutina)
  subtitle?: string // Subtítulo (opcional, ej.: entrenador/lugar)
  details?: string[] // Detalles adicionales (ej.: duración, hora, etc.)
  type?: string // Tipo de elemento (ej.: "actividad", "programa", "rutina")
  isFavorite: boolean // Indica si es favorito
  isSignedUp?: boolean // Indica si el usuario está inscrito/suscripto
  onToggleFavorite: () => void // Función para alternar favorito
  onSignUpPress: () => void // Función para inscribirse/desinscribirse
  badgeText?: string // Texto del botón de acción (ej.: "Anotarme" o "Salirme")
}

export const GenericCard: React.FC<GenericCardProps> = ({
  title,
  subtitle,
  details,
  type,
  isFavorite,
  isSignedUp,
  onToggleFavorite,
  onSignUpPress,
  badgeText,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        {type && (
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          </View>
        )}
        <Text style={styles.name}>{title}</Text>
        {subtitle && <Text style={styles.details}>{subtitle}</Text>}
        {details?.map((detail, index) => (
          <Text
            key={index}
            style={styles.details}>
            {detail}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        onPress={onToggleFavorite}
        style={styles.favoriteButton}>
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={isFavorite ? '#fbbf24' : '#fff'}
        />
      </TouchableOpacity>
      {badgeText && (
        <TouchableOpacity
          onPress={onSignUpPress}
          style={[
            styles.badgeContainer,
            isSignedUp && styles.badgeContainerSignedUp,
          ]}>
          <Text
            style={[styles.badgeText, isSignedUp && styles.badgeTextSignedUp]}>
            {badgeText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#1A1A1A',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
  },
  typeContainer: {
    marginBottom: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
    textTransform: 'uppercase',
    color: '#fff',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'MyriadProBold',
    marginBottom: 4,
  },
  details: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'MyriadPro',
    marginBottom: 4,
  },
  favoriteButton: {
    paddingBottom: 65,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 14,
    right: 15,
    backgroundColor: '#14b8a6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeContainerSignedUp: {
    backgroundColor: '#ef4444',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
  badgeTextSignedUp: {
    color: 'white',
  },
})

export default GenericCard
