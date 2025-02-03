class UserDataUploader {
  private baseUrl: string
  private token: string

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl
    this.token = token
  }

  /**
   * Sube todos los datos del usuario y la imagen al servidor.
   * @param userData - Datos del usuario (objeto plano con strings y números).
   * @param base64Image - Representación base64 de la imagen (opcional).
   */
  async upload(userData: Record<string, any>, base64Image?: string) {
    try {
      const requestBody = {
        usuario: {
          ...userData,
          ...(base64Image
            ? {
                imagen: {
                  nombre: 'foto_perfil.jpg',
                  contenido: base64Image,
                },
              }
            : {}),
        },
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`, // Incluir el token en los encabezados
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        console.log('Datos completos subidos correctamente')
      } else {
        const errorResponse = await response.text()
        console.error('Error al subir los datos completos:', errorResponse)
      }
    } catch (err) {
      console.error('Error en la solicitud:', err)
    }
  }

  /**
   * Sube un campo específico del usuario o la imagen al servidor.
   * @param field - Nombre del campo (por ejemplo, "nombre", "apellido", "imagen").
   * @param value - Valor del campo (cadena, número o base64 de la imagen).
   */
  async uploadField(field: string, value: string | number | null) {
    try {
      const requestBody = {
        usuario: {
          [field]: value,
        },
      }

      // Si el campo es "imagen" y el valor es una cadena base64
      if (field === 'imagen' && typeof value === 'string') {
        requestBody.usuario[field] = {
          nombre: 'foto_perfil.jpg',
          contenido: value,
        }
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`, // Incluir el token en los encabezados
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        console.log(`Campo "${field}" subido correctamente`)
      } else {
        const errorResponse = await response.text()
        console.error(`Error al subir el campo "${field}":`, errorResponse)
      }
    } catch (err) {
      console.error('Error en la solicitud:', err)
    }
  }
}
