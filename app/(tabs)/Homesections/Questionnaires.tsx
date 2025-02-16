import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Header from '@/components/common/Header'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {getCuestionarios} from '@/hooks/Data/Endpoints'

// Interfaz para los cuestionarios
interface GymQuiz {
  ID: string
  modified: string
  nombre: string
  descripcion: string
  preguntas: string // JSON serializado como string
  socios: string | null
}

const Questionnaires = () => {
  const navigation = useNavigation()
  const [quizzes, setQuizzes] = useState<GymQuiz[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [newQuizTitle, setNewQuizTitle] = useState('')
  const [newQuizType, setNewQuizType] = useState('')

  const handlePress = () => {
    navigation.goBack()
  }

  useBackHandler(() => {
    navigation.goBack()
    return true
  })

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const token = 'Contraseña...' // Reemplaza con tu token real
        const data = await getCuestionarios(token) // Usamos la API real
        setQuizzes(data as GymQuiz[]) // Ajustamos el tipo de datos
      } catch (error) {
        console.error('Error loading gym quizzes:', error)
      } finally {
        setLoading(false)
      }
    }
    loadQuizzes()
  }, [])

  // Marcar un cuestionario como completado
  const markAsCompleted = (id: string) => {
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.ID === id ? {...quiz, completed: true} : quiz,
    )
    setQuizzes(updatedQuizzes)
    Alert.alert('Éxito', 'El cuestionario ha sido marcado como completado.')
  }

  // Obtener el color según el tipo de cuestionario
  const getQuizColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'evaluación':
        return {backgroundColor: '#518893'}
      case 'encuesta':
        return {backgroundColor: '#CC7751'}
      case 'rutina':
        return {backgroundColor: '#B0A462'}
      case 'seguimiento':
        return {backgroundColor: '#9B9B9B'}
      default:
        return {backgroundColor: '#518893'}
    }
  }

  // Crear un nuevo cuestionario
  const createNewQuiz = () => {
    if (newQuizTitle && newQuizType) {
      const newQuiz: GymQuiz = {
        ID: String(quizzes.length + 1),
        modified: new Date().toISOString(),
        nombre: newQuizTitle,
        descripcion: '',
        preguntas: '[]',
        socios: null,
      }
      setQuizzes([...quizzes, newQuiz])
      setModalVisible(false)
      setNewQuizTitle('')
      setNewQuizType('')
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.')
    }
  }

  const renderItem = ({item}: {item: GymQuiz}) => {
    const colors = getQuizColor(item.nombre)

    return (
      <TouchableOpacity
        style={[
          styles.quizItem,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: '#6CB0B4',
          },
        ]}
        onPress={() => markAsCompleted(item.ID)}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={styles.type}>
            {item.descripcion || 'Sin descripción'}
          </Text>
          <Text style={styles.status}>
            {item.socios || 'Sin socios asignados'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  // Nuevo loader personalizado
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size='large'
          color='#B0A462'
        />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Encabezado */}
      <Header
        title='CUESTIONARIOS'
        onBackPress={handlePress}
      />

      {/* Contenido principal */}
      {quizzes.length > 0 ? (
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.ID}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false} // Ocultar scrollbar vertical
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay cuestionarios disponibles</Text>
        </View>
      )}

      {/* Modal para crear un nuevo cuestionario */}
      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Cuestionario</Text>
            <TextInput
              style={styles.input}
              placeholder='Título'
              placeholderTextColor='#888'
              value={newQuizTitle}
              onChangeText={setNewQuizTitle}
            />
            <TextInput
              style={styles.input}
              placeholder='Tipo'
              placeholderTextColor='#888'
              value={newQuizType}
              onChangeText={setNewQuizType}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={createNewQuiz}>
              <Text style={styles.modalButtonText}>Crear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingInline: 15,
    marginTop: 35,
    paddingTop: 30,
    padding: 16, // Espaciado general
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  loadingText: {
    color: '#B0A462',
    marginTop: 10,
    fontFamily: 'MyriadPro',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'MyriadPro',
  },
  flatListContent: {
    paddingBlock: 30, // Espacio al final de la lista
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#6CB0B4',
    justifyContent: 'space-between',
    padding: 16, // Padding interno para mejorar la legibilidad
    borderRadius: 12,
    borderWidth: 4, // Borde para resaltar el fondo
    marginBottom: 12, // Espaciado entre elementos
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'MyriadPro',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    fontFamily: 'MyriadPro',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontFamily: 'MyriadPro',
    color: 'rgba(255, 255, 255, 0.8)',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'MyriadPro',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  modalButton: {
    backgroundColor: '#14b8a6',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontFamily: 'MyriadPro',
    fontSize: 16,
  },
})

export default Questionnaires
