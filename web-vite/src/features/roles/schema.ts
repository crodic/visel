import z from 'zod'

export const ColumnKey = {
  name: 'name',
  description: 'description',
  permissions: 'permissions',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  all: 'all',
}

export const FieldDisplayName = {
  [ColumnKey.name]: 'Name',
  [ColumnKey.description]: 'Description',
  [ColumnKey.permissions]: 'Permissions',
  [ColumnKey.createdAt]: 'Created At',
  [ColumnKey.updatedAt]: 'Updated At',
  [ColumnKey.all]: 'All',
}

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.string().array(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const roleFormSchema = z.object({
  name: z.string(),
  description: z.string().nullish(),
  permissions: z
    .string()
    .array()
    .min(1, 'Please select one permission for role'),
})

export type RoleSchema = z.infer<typeof roleSchema>
export type RoleFormSchema = z.infer<typeof roleFormSchema>
