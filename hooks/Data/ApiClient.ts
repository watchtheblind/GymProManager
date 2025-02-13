import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'https://gympromanager.com'

// Tipos para las opciones de la solicitud
type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: Record<string, any> // Body genérico
  useCache?: boolean // Indica si se debe usar la caché
  contentType?: 'json' | 'form-urlencoded' // Tipo de Content-Type
}

// Función para verificar si el body está vacío
const isBodyEmpty = (body: Record<string, any> | undefined): boolean => {
  if (!body) {
    console.log('El body está vacío o es undefined')
    return true
  }
  // Verifica si el body tiene al menos una propiedad con valor definido
  const hasValues = Object.values(body).some((value) => value !== undefined)
  if (!hasValues) {
    console.log('El body está vacío: todas las propiedades son undefined')
    return true
  }
  console.log('El body NO está vacío:', body)
  return false
}

// Función principal del cliente API
export const apiClient = async <T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> => {
  const {
    method = 'GET',
    headers = {},
    body,
    useCache = false,
    contentType = 'json',
  } = options
  const url = `${BASE_URL}${endpoint}`
  const cacheKey = `${method}:${url}:${JSON.stringify(body)}`
  try {
    // Verificar si el body está vacío (solo para métodos que requieren body)
    if (method !== 'GET' && isBodyEmpty(body)) {
      throw new Error('El body de la solicitud está vacío')
    }

    // Verificar si la respuesta está en la caché persistente
    if (useCache) {
      const cachedData = await AsyncStorage.getItem(cacheKey)
      if (cachedData) {
        console.log('Respuesta obtenida desde la caché persistente')
        return JSON.parse(cachedData)
      }
    }

    // Construir los headers finales
    const finalHeaders: Record<string, string> = {
      ...headers,
    }

    // Agregar el token al header si está presente en el body
    if (body?.token) {
      finalHeaders['Authorization'] = `Bearer ${body.token}`
    }

    // Determinar el Content-Type
    if (contentType === 'json') {
      finalHeaders['Content-Type'] = 'application/json'
    } else if (contentType === 'form-urlencoded') {
      finalHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    // Construir la configuración de la solicitud
    const fetchOptions: RequestInit = {
      method,
      headers: finalHeaders,
    }

    // Agregar el body según el Content-Type
    if (method !== 'GET' && body) {
      if (contentType === 'json') {
        fetchOptions.body = JSON.stringify(body)
      } else if (contentType === 'form-urlencoded') {
        const formData = new URLSearchParams()
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, String(value))
          }
        })
        fetchOptions.body = formData.toString()
      }
    }

    // Realizar la solicitud
    const response = await fetch(url, fetchOptions)

    // Manejo de errores
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error en la solicitud')
    }

    // Parsear la respuesta
    const data = await response.json()

    // Guardar la respuesta en la caché persistente si se solicitó
    if (useCache) {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(data))
      console.log('Respuesta guardada en la caché persistente')
    }

    return data
  } catch (error) {
    console.error('Error en la API:', error)
    throw error
  }
}
