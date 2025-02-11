import React from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

interface AvatarCircleProps {
  imageUrl?: string
  initials?: string
}

const Avatar: React.FC<AvatarCircleProps> = ({imageUrl, initials}) => {
  return (
    <View style={styles.avatarContainer}>
      {imageUrl ? (
        <Image
          source={{uri: imageUrl}}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.placeholderText}>
            {initials?.toUpperCase() || 'U'}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#B5A97C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})

export default Avatar
