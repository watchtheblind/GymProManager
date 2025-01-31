import React, {useEffect, useState, useRef} from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  TextInput,
  Animated,
} from 'react-native'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Ionicons} from '@expo/vector-icons'
import {Swipeable} from 'react-native-gesture-handler'

// Simulación de una API ficticia para obtener cuestionarios de gimnasio
const getGymQuizzes = (): Promise<GymQuiz[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Evaluación Física Inicial',
          type: 'evaluación',
          completed: false,
        },
        {
          id: 2,
          title: 'Encuesta de Satisfacción',
          type: 'encuesta',
          completed: false,
        },
        {
          id: 3,
          title: 'Rutina de Entrenamiento Semanal',
          type: 'rutina',
          completed: false,
        },
        {
          id: 4,
          title: 'Seguimiento de Progreso',
          type: 'seguimiento',
          completed: false,
        },
      ])
    }, 2000) // Simulamos un retardo de 2 segundos
  })
}

interface GymQuiz {
  id: number
  title: string
  type: string
  completed: boolean
}

const Questionnaires = () => {
  const navigation = useNavigation()
  const [quizzes, setQuizzes] = useState<GymQuiz[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [newQuizTitle, setNewQuizTitle] = useState('')
  const [newQuizType, setNewQuizType] = useState('')
  const scaleValue = useRef(new Animated.Value(1)).current

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Bottomnav' as never)
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [navigation]),
  )

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await getGymQuizzes()
        setQuizzes(data)
      } catch (error) {
        console.error('Error loading gym quizzes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadQuizzes()
  }, [])

  // Marcar un cuestionario como completado
  const markAsCompleted = (id: number) => {
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.id === id ? {...quiz, completed: true} : quiz,
    )
    setQuizzes(updatedQuizzes)
    Alert.alert('Éxito', 'El cuestionario ha sido marcado como completado.')
  }

  // Eliminar un cuestionario
  const deleteQuiz = (id: number) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id)
    setQuizzes(updatedQuizzes)
  }

  // Obtener el color según el tipo de cuestionario
  const getQuizColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'evaluación':
        return {backgroundColor: '#518893', borderColor: '#6CB0B4'}
      case 'encuesta':
        return {backgroundColor: '#CC7751', borderColor: '#DFAA8C'}
      case 'rutina':
        return {backgroundColor: '#B0A462', borderColor: '#FEF4C9'}
      case 'seguimiento':
        return {backgroundColor: '#9B9B9B', borderColor: '#C0C0C0'}
      default:
        return {backgroundColor: '#1E1E1E', borderColor: '#333'}
    }
  }

  // Efecto de palpitar
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  useEffect(() => {
    startPulseAnimation()
  }, [])

  // Crear un nuevo cuestionario
  const createNewQuiz = () => {
    if (newQuizTitle && newQuizType) {
      const newQuiz: GymQuiz = {
        id: quizzes.length + 1,
        title: newQuizTitle,
        type: newQuizType,
        completed: false,
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
    const colors = getQuizColor(item.type)

    // Función para manejar el deslizamiento y eliminar el cuestionario
    const handleSwipeableOpen = (direction: 'left' | 'right') => {
      if (direction === 'left') {
        deleteQuiz(item.id)
      }
    }

    return (
      <GestureHandlerRootView>
        <Swipeable
          onSwipeableOpen={handleSwipeableOpen} // Elimina el cuestionario al deslizar
          friction={2} // Ajusta la sensibilidad del deslizamiento
          leftThreshold={80} // Distancia necesaria para activar el deslizamiento
        >
          <TouchableOpacity
            style={[
              styles.quizItem,
              {
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor,
                borderWidth: 2,
              },
            ]}
            onPress={() => markAsCompleted(item.id)}>
            <View style={styles.leftContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.type}>{item.type.toUpperCase()}</Text>
                <Text style={styles.status}>
                  {item.completed ? 'Completado' : 'Pendiente'}
                </Text>
              </View>
            </View>
            <Ionicons
              name='chevron-forward'
              size={24}
              color='white'
            />
          </TouchableOpacity>
        </Swipeable>
      </GestureHandlerRootView>
    )
  }

  return (
    <View style={styles.container}>
      {/* Fondo y logo */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require('@/assets/images/logo.png')} // Asegúrate de tener la ruta correcta
          style={styles.logo}
        />
      </View>
      <View style={styles.overlay}></View>

      {/* Contenedor del contenido principal */}
      <View style={styles.contentContainer}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Bottomnav' as never)}
            style={styles.backButton}>
            <Ionicons
              name='arrow-back'
              size={24}
              color='white'
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>MIS CUESTIONARIOS</Text>
        </View>

        {/* Contenido principal */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size='large'
              color='#14b8a6'
              style={styles.loader}
            />
          </View>
        ) : quizzes.length > 0 ? (
          <FlatList
            data={quizzes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay cuestionarios disponibles
            </Text>
          </View>
        )}
      </View>

      {/* Botón flotante para agregar nuevo cuestionario */}
      <Animated.View
        style={[
          styles.floatingButton,
          {
            transform: [{scale: scaleValue}],
          },
        ]}>
        <TouchableOpacity
          style={styles.floatingButtonInner}
          onPress={() => setModalVisible(true)}>
          <Ionicons
            name='add'
            size={30}
            color='white'
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Modal para crear un nuevo cuestionario */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Cuestionario</Text>
            <TextInput
              style={styles.input}
              placeholder='Título'
              value={newQuizTitle}
              onChangeText={setNewQuizTitle}
            />
            <TextInput
              style={styles.input}
              placeholder='Tipo'
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  contentContainer: {
    flex: 1,
    zIndex: 20, // Asegura que el contenido esté por encima del fondo y el logo
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingTop: 60,
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Copperplate',
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 20,
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
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
    zIndex: 0, // Fondo detrás de todo
  },
  logo: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#1D1D1B',
    opacity: 0.9,
    zIndex: 10, // Overlay por encima del fondo pero debajo del contenido
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#14b8a6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  floatingButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
