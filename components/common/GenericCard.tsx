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
  onViewDetails: () => void // Función para abrir el modal
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
  onViewDetails,
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
      <TouchableOpacity
        onPress={onViewDetails}
        style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Ver detalles</Text>
      </TouchableOpacity>
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
  detailsButton: {
    position: 'absolute',
    bottom: 14,
    right: 15,
    backgroundColor: '#14b8a6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
})

export default GenericCard
