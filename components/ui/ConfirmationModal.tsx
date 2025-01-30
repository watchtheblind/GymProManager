import React from 'react'
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native'

interface ConfirmationModalProps {
  visible: boolean
  title: string
  message: string
  onAccept: () => void
  onClose: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  onAccept,
  onClose,
}) => {
  if (!visible) return null

  return (
    <Modal
      transparent={true}
      animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.rejectButton]}>
              <Text style={styles.buttonText}>Rechazar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAccept}
              style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
