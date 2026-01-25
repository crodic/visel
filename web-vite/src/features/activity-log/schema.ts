import z from 'zod'

export const ColumnKey = {
  id: 'id',
  entityId: 'entityId',
  entity: 'entity',
  action: 'action',
  userId: 'userId',
  createdAt: 'createdAt',
}

export const FieldDisplayName = {
  [ColumnKey.id]: 'ID',
  [ColumnKey.entity]: 'Entity',
  [ColumnKey.entityId]: 'Entity ID',
  [ColumnKey.action]: 'Action',
  [ColumnKey.userId]: 'User ID',
  [ColumnKey.createdAt]: 'Created At',
}

export const logSchema = z.object({
  id: z.string(),
  entity: z.string().nullable(),
  entityId: z.string(),
  action: z.string(),
  userId: z.string().nullish(),
  oldValue: z.any().nullish(),
  newValue: z.any().nullish(),
  createdAt: z.string(),
})

export type ActivityLogSchema = z.infer<typeof logSchema>
