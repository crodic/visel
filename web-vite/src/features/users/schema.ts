import z from 'zod'

export const ColumnKey = {
  id: 'id',
  email: 'email',
  username: 'username',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  image: 'image',
  verifiedAt: 'verifiedAt',
  all: 'all',
}

export const FieldDisplayName = {
  [ColumnKey.email]: 'Email',
  [ColumnKey.username]: 'Username',
  [ColumnKey.createdAt]: 'Created At',
  [ColumnKey.updatedAt]: 'Updated At',
  [ColumnKey.verifiedAt]: 'Verified',
  [ColumnKey.image]: 'Image',
  [ColumnKey.all]: 'All',
}

export const userSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  email: z.string(),
  bio: z.string().nullish(),
  image: z.string().nullish(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  fullName: z.string(),
  verifiedAt: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type UserSchema = z.infer<typeof userSchema>

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(20, { message: 'Password must be at most 20 characters' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must be contain at least one number letter',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must contain at least one special character (!@#$%^&*)',
  })

export const userCreateSchema = z
  .object({
    username: z.string().nullish(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().nullish(),
    email: z.email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters'),
    bio: z.string().nullish(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type UserCreateSchema = z.infer<typeof userCreateSchema>

export const userEditSchema = z.object({
  username: z.string().nullish(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().nullish(),
  email: z.email('Invalid email address'),
  bio: z.string().nullish(),
})

export type UserEditSchema = z.infer<typeof userEditSchema>
