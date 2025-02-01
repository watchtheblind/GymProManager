import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

type UniversalCardProps = {
  image: string
  title: string
  subtitle?: string
  accentColor: string
  type: string
  duration?: string
  level?: string
  isFavorite?: boolean
  onFavoritePress?: () => void
  showFavoriteIcon?: boolean // Nueva prop para controlar la visibilidad del ícono
}

const UniversalCard: React.FC<UniversalCardProps> = ({
  image,
  title,
  subtitle,
  accentColor,
  type,
  duration,
  level,
  isFavorite = false,
  onFavoritePress,
  showFavoriteIcon = true, // Valor por defecto: true
}) => {
  return (
    <View style={styles.card}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 16 / 16,
    marginBottom: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-45deg'}],
    marginLeft: -20,
    marginTop: -5,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'MyriadPro',
    marginLeft: -6,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardInfo: {
    gap: 4,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  cardMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardLevel: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardDot: {
    color: '#fff',
    opacity: 0.7,
  },
  cardDuration: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
  },
})

export default UniversalCard
