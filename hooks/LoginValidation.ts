// loginValidation.ts
import {z} from 'zod'

// Definir el esquema de validación
const loginSchema = z.object({
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(5, 'La contraseña debe tener al menos 5 caracteres'),
})

// Inferir el tipo TypeScript a partir del esquema
export type LoginFormData = z.infer<typeof loginSchema>

// Función para validar los datos
export const validateLogin = (data: LoginFormData) => {
  try {
    loginSchema.parse(data)
    return {isValid: true, errors: null}
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convertir los errores de Zod a un formato más manejable
      const errors = error.errors.reduce(
        (acc, err) => {
          acc[err.path[0]] = err.message // Asignar el mensaje de error al campo correspondiente
          return acc
        },
        {} as Record<string, string>,
      )
      return {isValid: false, errors}
    }
    throw error // Si hay un error inesperado, lanzarlo
  }
}
