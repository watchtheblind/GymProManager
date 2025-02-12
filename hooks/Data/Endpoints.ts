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

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
  token: string,
): Promise<ApiResponse<User>> => {
  return apiClient<ApiResponse<User>>('/users', {
    method: 'POST',
    body: {param1: name, param2: email, param3: password, param4: role, token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones POST
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

export const deleteUser = async (
  userId: number,
  token: string,
): Promise<ApiResponse<void>> => {
  return apiClient<ApiResponse<void>>(`/users/${userId}`, {
    method: 'DELETE',
    body: {token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones DELETE
  })
}

// Membresías
type Membership = {
  id: number
  name: string
  duration: number // En días
  price: number
}

export const getMembershipById = async (
  membershipId: number,
  token: string,
): Promise<ApiResponse<Membership>> => {
  return apiClient<ApiResponse<Membership>>(`/memberships/${membershipId}`, {
    method: 'GET',
    body: {token},
    contentType: 'json',
    useCache: true, // Habilitar caché para datos de membresía
  })
}

export const createMembership = async (
  name: string,
  duration: number,
  price: number,
  token: string,
): Promise<ApiResponse<Membership>> => {
  return apiClient<ApiResponse<Membership>>('/memberships', {
    method: 'POST',
    body: {param1: name, param2: duration, param3: price, token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones POST
  })
}

export const updateMembership = async (
  membershipId: number,
  name: string,
  duration: number,
  price: number,
  token: string,
): Promise<ApiResponse<Membership>> => {
  return apiClient<ApiResponse<Membership>>(`/memberships/${membershipId}`, {
    method: 'PUT',
    body: {param1: name, param2: duration, param3: price, token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones PUT
  })
}

export const deleteMembership = async (
  membershipId: number,
  token: string,
): Promise<ApiResponse<void>> => {
  return apiClient<ApiResponse<void>>(`/memberships/${membershipId}`, {
    method: 'DELETE',
    body: {token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones DELETE
  })
}

// Pagos
type Payment = {
  id: number
  userId: number
  amount: number
  date: string // Fecha en formato ISO
  status: 'pending' | 'completed' | 'failed'
}

export const getPaymentById = async (
  paymentId: number,
  token: string,
): Promise<ApiResponse<Payment>> => {
  return apiClient<ApiResponse<Payment>>(`/payments/${paymentId}`, {
    method: 'GET',
    body: {token},
    contentType: 'json',
    useCache: true, // Habilitar caché para datos de pagos
  })
}

export const createPayment = async (
  userId: number,
  amount: number,
  date: string,
  status: string,
  token: string,
): Promise<ApiResponse<Payment>> => {
  return apiClient<ApiResponse<Payment>>('/payments', {
    method: 'POST',
    body: {param1: userId, param2: amount, param3: date, param4: status, token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones POST
  })
}

export const updatePayment = async (
  paymentId: number,
  amount: number,
  date: string,
  status: string,
  token: string,
): Promise<ApiResponse<Payment>> => {
  return apiClient<ApiResponse<Payment>>(`/payments/${paymentId}`, {
    method: 'PUT',
    body: {param1: amount, param2: date, param3: status, token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones PUT
  })
}

export const deletePayment = async (
  paymentId: number,
  token: string,
): Promise<ApiResponse<void>> => {
  return apiClient<ApiResponse<void>>(`/payments/${paymentId}`, {
    method: 'DELETE',
    body: {token},
    contentType: 'json',
    useCache: false, // No usar caché para operaciones DELETE
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

// Tipo para la respuesta del login
type LoginResponse = {
  ID: number
  user_login: string
  user_email: string
  first_name: string
  last_name: string
  user_registered: string // Fecha en formato "YYYY-MM-DD HH:mm:ss"
  roles: string[]
  meta: {
    nickname: string
    first_name: string
    last_name: string
    description: string
    backend_nombre: string
    backend_apellido: string
    backend_nif: string
    backend_direccion: string
    backend_codigo_pais: string
    backend_telefono: string
    backend_genero: string
    backend_fecha_de_nacimiento: string // Formato "DD-MM-YYYY"
    backend_altura: {
      valor: number
      unidad: string
    }
    backend_peso: {
      valor: number
      unidad: string
    }
    backend_imagen: string
  }
  has_active_subscription: boolean
  active_subscription_details: null | any // Puedes ajustar este tipo si tienes más detalles sobre la suscripción
}
// Endpoint para iniciar sesión
export const login = async (
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse>> => {
  return apiClient<ApiResponse<LoginResponse>>('/app-login.php', {
    method: 'POST',
    body: {param1: email, param2: password},
    contentType: 'form-urlencoded',
    useCache: false, // No usar caché para operaciones de login
  })
}
