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
