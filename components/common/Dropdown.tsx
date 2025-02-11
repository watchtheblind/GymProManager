'use client'

import type React from 'react'
import {useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native'

interface DropdownProps {
  options: string[]
  selectedValue: string
  onSelect: (value: string) => void
  placeholder?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownButton}>
        <Text>{selectedValue || placeholder || 'Select'}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item)
                    setModalVisible(false)
                  }}
                  style={styles.optionItem}>
                  <Text className='text-white text-center'>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdownButton: {
    paddingInline: 3,
    minWidth: 'auto',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
  },
  modalContent: {
    backgroundColor: '#1D1D1B',
    borderRadius: 8,
    padding: 10,
    color: '#ffffff',
    width: '20%',
    maxHeight: '40%',
  },
  optionItem: {
    padding: 16,
    color: '#ffffff',
  },
})

export default Dropdown
