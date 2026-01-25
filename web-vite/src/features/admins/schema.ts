import z from 'zod'
import { IMAGE_ACCEPTED_FORMATS, MAX_IMAGE_SIZE_MB } from '@/global'
import { roleSchema } from '../roles/schema'

export const ColumnKeys = {
  email: 'email',
  username: 'username',
  firstName: 'firstName',
  lastName: 'lastName',
  fullName: 'fullName',
  verifiedAt: 'verifiedAt',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  image: 'image',
}

export const FieldDisplayName = {
  [ColumnKeys.email]: 'Email',
  [ColumnKeys.username]: 'Username',
  [ColumnKeys.firstName]: 'First Name',
  [ColumnKeys.lastName]: 'Last Name',
  [ColumnKeys.fullName]: 'Full Name',
  [ColumnKeys.verifiedAt]: 'Verified',
  [ColumnKeys.role]: 'Role',
  [ColumnKeys.createdAt]: 'Created At',
  [ColumnKeys.updatedAt]: 'Updated At',
  [ColumnKeys.image]: 'Image',
}

export const adminSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  phone: z.string().nullable(),
  birthday: z.string().nullable(),
  email: z.string(),
  bio: z.string().nullish(),
  image: z.string().nullish(),
  verifiedAt: z.boolean(),
  role: roleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type AdminSchema = z.infer<typeof adminSchema>

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

export const adminCreateSchema = z
  .object({
    username: z.string().nullish(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().optional(),
    birthday: z.string().nullish(),
    email: z.email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters'),
    roleId: z.string(),
    bio: z.string().nullish(),
    image: z
      .instanceof(File)
      .optional()
      .refine(
        (f) => !f || f.size <= MAX_IMAGE_SIZE_MB,
        'File size is too large'
      )
      .refine(
        (f) => !f || IMAGE_ACCEPTED_FORMATS.includes(f.type),
        'Unsupported file format'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type AdminCreateSchema = z.infer<typeof adminCreateSchema>

export const adminEditSchema = z.object({
  username: z.string().nullish(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  birthday: z.string().nullish(),
  email: z.email('Invalid email address'),
  roleId: z.string(),
  bio: z.string().nullish(),
  image: z
    .instanceof(File)
    .optional()
    .refine((f) => !f || f.size <= MAX_IMAGE_SIZE_MB, 'File size is too large')
    .refine(
      (f) => !f || IMAGE_ACCEPTED_FORMATS.includes(f.type),
      'Unsupported file format'
    ),
})

export type AdminEditSchema = z.infer<typeof adminEditSchema>
