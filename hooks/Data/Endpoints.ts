import AsyncStorage from '@react-native-async-storage/async-storage'

import {apiClient} from './ApiClient'
// Tipos generales
type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
}

// Usuarios
type User = {
  id: number
  name: string
  email: string
  role: string
}

export const getUserById = async (
  userId: number,
  token: string,
): Promise<ApiResponse<User>> => {
  return apiClient<ApiResponse<User>>(`/users/${userId}`, {
    method: 'GET',
    body: {token},
    contentType: 'json',
    useCache: true, // Habilitar caché para datos de usuario
  })
}

export const updateUser = async (
  userId: number,
  name: string,
  email: string,
  role: string,
  token: string,
): Promise<ApiResponse<User>> => {
  return apiClient<ApiResponse<User>>(`/users/${userId}`, {
    method: 'PUT',
    body: {param1: name, param2: email, param3: role, token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones PUT
  })
}

// Nuevo endpoint: /app-ads.php
type Ad = {
  titulo: string
  texto: string
  imagen: string
}

export const fetchAds = async (token: string): Promise<ApiResponse<Ad[]>> => {
  return apiClient<ApiResponse<Ad[]>>('/app-ads.php', {
    method: 'POST',
    body: {token},
    contentType: 'form-urlencoded',
    useCache: true, // Habilitar caché para los anuncios
  })
}

// Tipo para los productos (filtrado por suscripción)
export type SubscriptionProduct = {
  nombre: string
  precio: string
  url: string
  imagen: string
  tipo: 'subscription'
  subscripcion: {
    intervalo: string
    duracion: number
    periodo: 'month' | 'year'
    trial_periodo: 'day' | 'week' | 'month'
    trial_duracion: number
  }
}

// Endpoint para obtener solo las suscripciones
export const fetchSubscriptions = async (
  token: string,
): Promise<ApiResponse<SubscriptionProduct[]>> => {
  try {
    const response = await apiClient<any>('/app-products.php', {
      method: 'POST',
      body: {token},
      contentType: 'form-urlencoded',
      useCache: true,
    })
    if (!Array.isArray(response)) {
      console.error('Invalid API response:', response)
      return {success: false, data: [], message: 'Invalid API response'}
    }
    const subscriptions = response.filter(
      (item) => item.tipo === 'subscription',
    )
    return {
      success: true,
      data: subscriptions,
      message: 'Subscriptions fetched successfully',
    }
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return {success: false, data: [], message: 'Failed to fetch subscriptions'}
  }
}

export const login = async (email: string, password: string): Promise<any> => {
  const body = {
    email,
    password,
  }

  try {
    const response = await apiClient('/app-login.php', {
      method: 'POST',
      body,
      contentType: 'form-urlencoded',
      useCache: false, // No usar caché para operaciones de login
    })

    // Asegúrate de que la respuesta sea un objeto JSON
    if (typeof response === 'object' && response !== null) {
      return response
    } else {
      throw new Error('La respuesta de la API no es un objeto válido')
    }
  } catch (error) {
    console.error('Error al realizar el login:', error)
    throw error // Propaga el error para manejarlo fuera
  }
}
export const fetchActivities = async (token: string): Promise<any[] | null> => {
  try {
    const response = await apiClient<any>('/app-activities.php', {
      method: 'POST',
      body: {token},
      contentType: 'form-urlencoded',
      useCache: true, // Habilitar caché si es apropiado
    })

    // Verificar si la respuesta es válida
    if (response && Array.isArray(response)) {
      return response // Retornamos la respuesta si es un array
    } else {
      console.error('Invalid API response:', response)
      return null // Retornamos null en caso de respuesta inválida
    }
  } catch (error) {
    console.error('Error fetching activities:', error)
    return null // Retornamos null en caso de error
  }
}

type EnrollActivityParams = {
  token: string
  activityid: string
  userid: string
  fechahora: string
  action: string
}

export const enrollActivity = async (
  params: EnrollActivityParams,
): Promise<{success: string}> => {
  const {token, activityid, userid, fechahora, action} = params

  // Llamada al endpoint usando el apiClient
  return apiClient<{success: string}>('/app-activities-enroll.php', {
    method: 'POST',
    body: {
      token,
      activityid,
      userid,
      fechahora,
      action,
    },
    useCache: false,
    contentType: 'form-urlencoded', // Especificamos que el contenido es form-urlencoded
  })
}

export const getNotifications = async (
  token: string,
  userId: number,
  useCache: boolean = true, // Habilitamos caché por defecto
): Promise<any[]> => {
  try {
    const cacheKey = `notifications:${token}:${userId}` // Clave única para la caché

    if (useCache) {
      // Intentar obtener los datos de la caché
      const cachedData = await AsyncStorage.getItem(cacheKey)
      if (cachedData) {
        const {data, timestamp} = JSON.parse(cachedData)

        // Verificar si han pasado menos de 60 minutos
        const currentTime = Date.now()
        const oneHourInMs = 60 * 60 * 1000 // 60 minutos en milisegundos
        if (currentTime - timestamp < oneHourInMs) {
          console.log('Notificaciones obtenidas desde la caché')
          return data
        }

        console.log('Caché expirada, realizando nueva solicitud...')
      }
    }

    // Realizar la solicitud al servidor usando el cliente API
    const body = {
      token,
      userid: userId,
    }

    const notifications = await apiClient<any[]>(
      '/app-notif.php', // Endpoint
      {
        method: 'POST',
        body,
        contentType: 'form-urlencoded', // Content-Type específico
        useCache: true,
      },
    )

    // Guardar los datos en la caché con un timestamp
    if (useCache) {
      const cacheData = {
        data: notifications,
        timestamp: Date.now(), // Guardar el momento actual
      }
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData))
      console.log('Notificaciones guardadas en la caché')
    }

    return notifications
  } catch (error) {
    console.error('Error al obtener notificaciones:', error)
    throw error
  }
}

// Definición del tipo para un ejercicio
type Ejercicio = {
  ID: string
  modified: string
  nombre: string
  descripcion: string
  url: string
  g_ejercicio_valor: string | null
  g_muscular_valor: string | null
}

// Función para interactuar con el endpoint de ejercicios (videos)
export const fetchEjercicios = async (
  token: string,
  ejercicioid?: number, // Opcional: ID del ejercicio a obtener
): Promise<Ejercicio[]> => {
  try {
    // Construir el body de la solicitud
    const body: Record<string, any> = {
      token, // Token de autorización
    }

    // Si se proporciona un ID de ejercicio, agregarlo al body
    if (ejercicioid !== undefined) {
      body.ejercicioid = ejercicioid
    }

    // Llamar al cliente API con las opciones adecuadas
    const response = await apiClient<Ejercicio[]>('/app-ejercicios.php', {
      method: 'POST',
      headers: {}, // Puedes agregar headers adicionales aquí si es necesario
      body,
      useCache: true,
      contentType: 'form-urlencoded', // El endpoint requiere form-urlencoded
    })

    return response
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error)
    throw error
  }
}

// Función para obtener cuestionarios
type Cuestionario = {
  ID: string
  modified: string
  nombre: string
  descripcion: string
  preguntas: string // JSON serializado como string
  socios: string | null
}

// Función para obtener cuestionarios con caché
export const getCuestionarios = async (
  token: string,
  cuestionarioid?: number, // Opcional: ID del cuestionario específico
  useCache: boolean = true, // Habilitamos caché por defecto
): Promise<Cuestionario[] | Cuestionario> => {
  try {
    // Construir la clave única para la caché
    const cacheKey = `cuestionarios:${token}:${cuestionarioid || 'all'}`

    if (useCache) {
      // Intentar obtener los datos de la caché
      const cachedData = await AsyncStorage.getItem(cacheKey)
      if (cachedData) {
        const {data, timestamp} = JSON.parse(cachedData)

        // Verificar si han pasado menos de 10 minutos
        const currentTime = Date.now()
        const tenMinutesInMs = 10 * 60 * 1000 // 10 minutos en milisegundos
        if (currentTime - timestamp < tenMinutesInMs) {
          console.log('Cuestionarios obtenidos desde la caché')
          return data
        }
        console.log('Caché expirada, realizando nueva solicitud...')
      }
    }

    // Construir el body de la solicitud
    const body: Record<string, any> = {
      token,
    }

    // Si se proporciona un ID de cuestionario, agregarlo al body
    if (cuestionarioid !== undefined) {
      body.cuestionarioid = cuestionarioid
    }

    // Realizar la solicitud usando el cliente API
    const cuestionarios = await apiClient<Cuestionario[] | Cuestionario>(
      '/app-cuestionarios.php',
      {
        method: 'POST',
        headers: {},
        body,
        contentType: 'form-urlencoded', // El endpoint espera form-urlencoded
      },
    )

    // Guardar los datos en la caché con un timestamp
    if (useCache) {
      const cacheData = {
        data: cuestionarios,
        timestamp: Date.now(), // Guardar el momento actual
      }
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData))
      console.log('Cuestionarios guardados en la caché')
    }

    return cuestionarios
  } catch (error) {
    console.error('Error al obtener los cuestionarios:', error)
    throw error
  }
}
// Tipo para representar la respuesta del servidor
type CuestionarioResponse = {
  mensaje: string // Mensaje de confirmación
  insert_id: number // ID del registro insertado
}

// Función para enviar las respuestas de un cuestionario
export const enviarRespuestasCuestionario = async (
  token: string,
  userid: string,
  cuestionarioid: string,
  respuestas: Record<string, string>, // Objeto JSON con las respuestas
): Promise<CuestionarioResponse> => {
  try {
    // Construir el body de la solicitud
    const body: Record<string, any> = {
      token,
      userid,
      cuestionarioid,
      respuestas: JSON.stringify(respuestas), // Serializamos el JSON de respuestas
    }

    // Realizar la solicitud usando el cliente API
    const response = await apiClient<CuestionarioResponse>(
      '/app-cuestionarios-response.php',
      {
        method: 'POST',
        headers: {},
        body,
        contentType: 'form-urlencoded', // El endpoint espera form-urlencoded
      },
    )

    return response
  } catch (error) {
    console.error('Error al enviar las respuestas del cuestionario:', error)
    throw error
  }
}

// Tipo para una rutina
export type Rutina = {
  ID: string
  modified: string
  nombre: string
  descripcion: string
  ejercicios: string // JSON serializado
}

// Función para obtener las rutinas
export const fetchRutinas = async (
  token: string,
  rutinaId?: number, // Opcional: ID de la rutina específica
  useCache: boolean = true, // Habilitamos caché por defecto
): Promise<Rutina[] | Rutina> => {
  try {
    // Construir la clave única para la caché
    const cacheKey = `rutinas:${token}:${rutinaId || 'all'}`
    if (useCache) {
      // Intentar obtener los datos de la caché
      const cachedData = await AsyncStorage.getItem(cacheKey)
      if (cachedData) {
        const {data, timestamp} = JSON.parse(cachedData)
        // Verificar si han pasado menos de 10 minutos
        const currentTime = Date.now()
        const tenMinutesInMs = 10 * 60 * 1000 // 10 minutos en milisegundos
        if (currentTime - timestamp < tenMinutesInMs) {
          console.log('Rutinas obtenidas desde la caché')
          return data
        }
        console.log('Caché expirada, realizando nueva solicitud...')
      }
    }

    // Construir el body de la solicitud
    const body: Record<string, any> = {
      token,
    }
    // Si se proporciona un ID de rutina, agregarlo al body
    if (rutinaId !== undefined) {
      body.rutinaid = rutinaId
    }

    // Realizar la solicitud usando el cliente API
    const rutinas = await apiClient<Rutina[] | Rutina>('/app-rutinas.php', {
      method: 'POST',
      headers: {},
      body,
      contentType: 'form-urlencoded', // El endpoint espera form-urlencoded
    })

    // Guardar los datos en la caché con un timestamp
    if (useCache) {
      const cacheData = {
        data: rutinas,
        timestamp: Date.now(), // Guardar el momento actual
      }
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData))
      console.log('Rutinas guardadas en la caché')
    }

    return rutinas
  } catch (error) {
    console.error('Error al obtener las rutinas:', error)
    throw error
  }
}

// Función para obtener programas con manejo de caché
export const getProgramas = async (
  token: string,
  programaid?: number, // ID del programa (opcional)
  useCache: boolean = true, // Habilitamos caché por defecto
): Promise<any> => {
  try {
    // Construir la clave única para la caché
    const cacheKey = `programas:${token}:${programaid || 'all'}`

    if (useCache) {
      // Intentar obtener los datos de la caché
      const cachedData = await AsyncStorage.getItem(cacheKey)
      if (cachedData) {
        const {data, timestamp} = JSON.parse(cachedData)

        // Verificar si han pasado menos de 10 minutos
        const currentTime = Date.now()
        const tenMinutesInMs = 10 * 60 * 1000 // 10 minutos en milisegundos
        if (currentTime - timestamp < tenMinutesInMs) {
          console.log('Programas obtenidos desde la caché')
          return data
        }
        console.log('Caché expirada, realizando nueva solicitud...')
      }
    }

    // Construir el body de la solicitud
    const body: Record<string, any> = {token}

    // Si se proporciona un ID de programa, agregarlo al body
    if (programaid !== undefined) {
      body.programaid = programaid
    }

    // Realizar la solicitud usando el cliente API
    const programas = await apiClient<any>('/app-programas.php', {
      method: 'POST',
      headers: {},
      body,
      contentType: 'form-urlencoded', // El endpoint espera form-urlencoded
    })

    // Guardar los datos en la caché con un timestamp
    if (useCache) {
      const cacheData = {
        data: programas,
        timestamp: Date.now(), // Guardar el momento actual
      }
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData))
      console.log('Programas guardados en la caché')
    }

    return programas
  } catch (error) {
    console.error('Error al obtener los programas:', error)
    throw error
  }
}

// Función para limpiar la caché de programas
const clearProgramsCache = async (token: string) => {
  const cacheKeyAll = `programas:${token}:all` // Clave para todos los programas
  await AsyncStorage.removeItem(cacheKeyAll)
  console.log('Caché de programas eliminada')
}

// Tipos para las acciones permitidas
type EnrollmentAction = 'add' | 'delete'

type ApiResponse2 = {
  mensaje: string
  [key: string]: any // Permite propiedades adicionales
}

export const manageProgramEnrollment = async (
  token: string,
  programaid: number,
  userid: number,
  action: EnrollmentAction,
): Promise<any> => {
  try {
    // Construir el body de la solicitud
    const body: Record<string, any> = {
      token,
      programaid,
      userid,
      action,
    }

    // Realizar la solicitud para inscribir/eliminar al usuario
    const response = await apiClient<ApiResponse2>(
      '/app-programas-enroll.php',
      {
        method: 'POST',
        headers: {},
        body,
        contentType: 'form-urlencoded', // El endpoint espera form-urlencoded
      },
    )

    console.log('Acción realizada:', response)

    // Limpiar la caché de programas
    await clearProgramsCache(token)

    // Obtener los programas actualizados desde el servidor
    const updatedPrograms = await getProgramas(token, undefined, false) // Deshabilitamos caché
    console.log('Datos actualizados:', updatedPrograms)

    return {
      ...response,
      updatedPrograms, // Incluimos los datos actualizados en la respuesta
    }
  } catch (error) {
    console.error('Error al gestionar la inscripción:', error)
    throw error
  }
}
