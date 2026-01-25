import z from 'zod'
import { IMAGE_ACCEPTED_FORMATS, MAX_FILE_SIZE } from '@/global'

export const profileFormSchema = z.object({
  bio: z.string().max(160).min(4).nullish(),
  image: z.union([
    z
      .instanceof(File)
      .refine((file) => IMAGE_ACCEPTED_FORMATS.includes(file.type), {
        message: 'Unsupported file format',
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: 'File size must be less than 5MB',
      }),
    z.null(),
    z.undefined(),
  ]),
  removeAvatar: z.boolean().default(false).optional(),
})

export type ProfileFormSchema = z.infer<typeof profileFormSchema>

export const accountFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthday: z.string().nullable(),
  phone: z.string().optional(),
})

export type AccountFormSchema = z.infer<typeof accountFormSchema>

export const passwordFormSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmNewPassword'],
      })
    }
  })

export type PasswordFormSchema = z.infer<typeof passwordFormSchema>
