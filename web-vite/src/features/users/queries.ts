import z from 'zod'
import { useQuery } from '@tanstack/react-query'
import { type ApiMetadata, apiMetadataSchema } from '@/global'
import http from '@/lib/http'
import { type PaginateQueryParams } from '@/lib/query-builder'
import {
  type UserCreateSchema,
  type UserEditSchema,
  userSchema,
  type UserSchema,
} from './schema'

async function getUserListing(
  params: PaginateQueryParams
): Promise<ApiMetadata & { data: UserSchema[] }> {
  const response = await http.get('/users', { params })

  return apiMetadataSchema
    .extend({ data: z.array(userSchema) })
    .parse(response.data)
}

export async function apiDeleteUser(id: string) {
  return await http.delete(`/users/${id}`)
}

export async function apiCreateUser(data: UserCreateSchema) {
  return await http.post('/users', data)
}

export async function apiGetUserById(id: string): Promise<UserSchema> {
  const response = await http.get(`/users/${id}`)

  return userSchema.parse(response.data)
}

export async function apiEditUser({
  id,
  data,
}: {
  id: string
  data: UserEditSchema
}) {
  return await http.put(`/users/${id}`, data)
}

export const useDataUserOverview = (params: PaginateQueryParams) =>
  useQuery({
    queryKey: ['user_overview_key', params],
    queryFn: () => getUserListing(params),
  })

export const useDataGetUserEdit = (id: string) =>
  useQuery<UserSchema>({
    queryKey: ['user_edit_key', id],
    queryFn: () => apiGetUserById(id),
  })

export const useDataGetUserDetail = (id: string) =>
  useQuery<UserSchema>({
    queryKey: ['user_detail_key', id],
    queryFn: () => apiGetUserById(id),
  })
