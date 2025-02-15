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
