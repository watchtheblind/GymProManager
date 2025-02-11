const BASE_URL = 'https://gympromanager.com'

// Tipos para el cuerpo de la solicitud
type ApiBody = {
  param1?: string | number
  param2?: string | number
  param3?: string | number
  param4?: string | number
  param5?: string | number
  token?: string // Token de autenticación
}

// Tipos para las opciones de la solicitud
type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: ApiBody
  useCache?: boolean // Indica si se debe usar la caché
  contentType?: 'json' | 'form-urlencoded' // Tipo de Content-Type
}

// Caché en memoria
const memoryCache: Record<string, any> = {}

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
    // Verificar si la respuesta está en la caché
    if (useCache && memoryCache[cacheKey]) {
      console.log('Respuesta obtenida desde la caché')
      return memoryCache[cacheKey]
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
      cache: 'force-cache', // Usa la caché nativa de fetch
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

    // Guardar la respuesta en la caché si se solicitó
    if (useCache) {
      memoryCache[cacheKey] = data
    }

    return data
  } catch (error) {
    console.error('Error en la API:', error)
    throw error
  }
}
