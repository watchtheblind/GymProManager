import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

type CardProps = {
  image: string
  title: string
  subtitle?: string
  accentColor: string
  type: string
  duration?: string
  level?: string
  isFavorite?: boolean
  onFavoritePress?: () => void
  onPress?: () => void // Nueva prop para manejar la acción del botón
  showFavoriteIcon?: boolean // Controla la visibilidad del ícono de favorito
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  accentColor,
  type,
  duration,
  level,
  isFavorite = false,
  onFavoritePress,
  onPress, // Acción al presionar la tarjeta
  showFavoriteIcon = true, // Valor por defecto: true
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8} // Efecto visual al presionar
      onPress={onPress}>
      {/* Acción al hacer clic en la tarjeta */}
      <Image
        source={{uri: image}}
        style={styles.cardImage}
        resizeMode='cover'
      />
      {showFavoriteIcon &&
        onFavoritePress && ( // Solo muestra el ícono si showFavoriteIcon es true
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onFavoritePress}>
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color='#fff'
            />
          </TouchableOpacity>
        )}
      <View style={[styles.typeTriangle, {backgroundColor: accentColor}]}>
        <Text style={styles.typeText}>{type}</Text>
      </View>
      <View style={styles.cardOverlay}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{title}</Text>
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
          {(level || duration) && (
            <View style={styles.cardMetaInfo}>
              {level && (
                <Text style={[styles.cardLevel, {color: accentColor}]}>
                  {level}
                </Text>
              )}
              {level && duration && <Text style={styles.cardDot}>•</Text>}
              {duration && <Text style={styles.cardDuration}>{duration}</Text>}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 16 / 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  typeTriangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-43deg'}],
    marginLeft: -20,
    marginTop: 2,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  cardInfo: {
    gap: 1.5,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'MyriadProBold',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  cardMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardLevel: {
    fontSize: 13,
    fontWeight: '500',
  },
  cardDot: {
    color: '#fff',
    opacity: 0.7,
  },
  cardDuration: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
  },
})

export default Card
