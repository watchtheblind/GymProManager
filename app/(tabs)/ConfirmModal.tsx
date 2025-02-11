// ConfirmationModal.tsx
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {FadeInDown, Easing} from 'react-native-reanimated'

interface ConfirmationModalProps {
  isVisible: boolean
  onAccept: () => void
  onReject: () => void
  onClose: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onAccept,
  onReject,
  onClose,
}) => {
  if (!isVisible) return null

  return (
    <Animated.View
      style={styles.modalOverlay}
      entering={FadeInDown.duration(300)} // Mantenemos la animación al aparecer
    >
      <View style={styles.alertContainer}>
        <Text style={styles.title}>Confirmación</Text>
        <Text style={styles.message}>
          ¿Estás seguro de que deseas realizar esta acción?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              onReject()
              onClose()
            }}
            style={[styles.button, styles.rejectButton]}>
            <Text style={styles.buttonText}>Rechazar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onAccept()
              onClose()
            }}
            style={[styles.button, styles.acceptButton]}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
  },
  alertContainer: {
    width: '80%',
    backgroundColor: '#1D1D1B',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B0A462',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FEF4C9',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: '#B0A462',
  },
  rejectButton: {
    backgroundColor: '#CC7751',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1B',
    textAlign: 'center',
  },
})

export default ConfirmationModal
