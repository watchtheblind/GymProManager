// CustomAlert.tsx
import React from 'react'
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native'

interface CustomAlertProps {
  visible: boolean
  title: string
  message: string
  onClose: () => void
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
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
          <TouchableOpacity
            onPress={onClose}
            style={styles.button}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: '#B0A462',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1B',
  },
})

export default CustomAlert
