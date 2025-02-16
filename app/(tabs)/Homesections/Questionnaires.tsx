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
} from 'react-native'
import SegmentedControl from '@react-native-segmented-control/segmented-control' // Importar SegmentedControl
import {MaterialIcons} from '@expo/vector-icons' // Importar MaterialIcons
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

interface Pregunta {
  pregunta: string
  respuesta1: string
  respuesta2: string
  respuesta3: string
}

const Questionnaires = () => {
  const navigation = useNavigation()
  const [quizzes, setQuizzes] = useState<GymQuiz[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<GymQuiz | null>(null) // Almacena el cuestionario seleccionado
  const [answers, setAnswers] = useState<Record<string, string>>({}) // Almacena las respuestas seleccionadas

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

  // Abrir el modal con los detalles del cuestionario
  const openQuizDetails = (quiz: GymQuiz) => {
    setSelectedQuiz(quiz)
    setModalVisible(true)
    setAnswers({}) // Reiniciar las respuestas al abrir un nuevo cuestionario
  }

  // Manejar la selección de una respuesta
  const handleAnswerChange = (questionKey: string, respuesta: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: respuesta,
    }))
  }

  // Renderizar una pregunta con sus respuestas
  const renderQuestion = ({item, index}: {item: Pregunta; index: number}) => {
    const {pregunta, respuesta1, respuesta2, respuesta3} = item

    // Filtrar respuestas no vacías
    const opciones = [respuesta1, respuesta2, respuesta3].filter(Boolean)

    // Generar una clave única para la pregunta usando el índice
    const questionKey = `question-${index}`

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>{pregunta}</Text>
        <SegmentedControl
          values={opciones}
          selectedIndex={opciones.indexOf(answers[questionKey] || '')}
          onChange={(event) => {
            const selectedOption =
              opciones[event.nativeEvent.selectedSegmentIndex]
            handleAnswerChange(questionKey, selectedOption)
          }}
          style={styles.segmentedControl}
        />
      </View>
    )
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
        onPress={() => openQuizDetails(item)}>
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

  // Enviar respuestas
  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) {
      Alert.alert('Error', 'No has seleccionado ninguna respuesta.')
      return
    }

    Alert.alert('Éxito', 'Respuestas enviadas correctamente.')
    setModalVisible(false)
  }

  // Loader personalizado
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

      {/* Modal para ver las preguntas del cuestionario */}
      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedQuiz?.nombre}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <MaterialIcons
                  name='close'
                  size={16}
                  color='white'
                />
              </TouchableOpacity>
            </View>
            {selectedQuiz ? (
              <>
                <FlatList
                  data={JSON.parse(selectedQuiz.preguntas)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderQuestion}
                  contentContainerStyle={styles.modalFlatListContent}
                  showsVerticalScrollIndicator={true} // Mostrar scrollbar vertical
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Enviar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.modalTitle}>Cargando preguntas...</Text>
            )}
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
    paddingTop: 23,
    paddingBottom: 30, // Espacio al final de la lista
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
    width: '90%',
    maxHeight: '80%', // Limitar la altura máxima del modal
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    right: -12,
    top: -12,
  },
  modalTitle: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontFamily: 'MyriadPro',
    textAlign: 'center',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#14b8a6',
    borderRadius: 30,
    padding: 12,
    alignItems: 'center',
    marginTop: -8,
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'MyriadPro',
    fontSize: 16,
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  segmentedControl: {
    marginVertical: 8,
  },
  modalFlatListContent: {
    paddingBottom: 20, // Espacio al final de la lista
  },
})

export default Questionnaires
