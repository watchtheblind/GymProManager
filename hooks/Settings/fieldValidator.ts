import {z} from 'zod'

// Define el esquema de validación
export const userSchema = z.object({
  user_login: z
    .string()
    .min(1, 'El campo Usuario no puede estar vacío.')
    .max(20, 'El campo Usuario no puede tener más de 20 caracteres.')
    .optional(),
  user_email: z
    .string()
    .email('El campo Email debe ser un correo electrónico válido.')
    .max(254, 'El campo Email no puede tener más de 254 caracteres.')
    .optional(),
  backend_nombre: z
    .string()
    .min(1, 'El campo Nombre no puede estar vacío.')
    .max(50, 'El campo Nombre no puede tener más de 50 caracteres.')
    .optional(),
  backend_apellido: z
    .string()
    .min(1, 'El campo Apellido no puede estar vacío.')
    .max(50, 'El campo Apellido no puede tener más de 50 caracteres.')
    .optional(),
  backend_nif: z
    .string()
    .max(20, 'El campo NIF no puede tener más de 20 caracteres.')
    .optional(),
  backend_direccion: z
    .string()
    .min(1, 'El campo Apellido no puede estar vacío.')
    .max(100, 'El campo Dirección no puede tener más de 100 caracteres.')
    .optional(),
  backend_codigo_pais: z
    .string()
    .max(3, 'El campo Código de País no puede tener más de 3 caracteres.')
    .optional(),
  backend_telefono: z
    .string()
    .max(20, 'El campo Teléfono no puede tener más de 15 caracteres.')
    .optional(),
  backend_genero: z
    .string()
    .max(10, 'El campo Género no puede tener más de 10 caracteres.')
    .optional(),
  backend_fecha_de_nacimiento: z
    .string()
    .max(
      20,
      'El campo Fecha de Nacimiento no puede tener más de 20 caracteres.',
    )
    .optional(),

  backend_altura: z
    .object({
      valor: z.number().min(2, 'La altura debe ser un número positivo.'),
      unidad: z.string().optional(),
    })
    .optional(),
  backend_peso: z
    .object({
      valor: z.number().min(2, 'El peso debe ser un número positivo.'),
      unidad: z.string().optional(),
    })
    .optional(),
})
