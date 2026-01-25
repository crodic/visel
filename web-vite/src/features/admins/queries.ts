import z from 'zod'
import { useQuery } from '@tanstack/react-query'
import {
  type ApiMetadata,
  apiMetadataSchema,
  type PaginateQueryParams,
} from '@/global'
import http from '@/lib/http'
import {
  type AdminCreateSchema,
  type AdminEditSchema,
  adminSchema,
  type AdminSchema,
} from './schema'

async function getAdminListing(
  params: PaginateQueryParams
): Promise<ApiMetadata & { data: AdminSchema[] }> {
  const response = await http.get('/admin-users', { params })

  return apiMetadataSchema
    .extend({ data: z.array(adminSchema) })
    .parse(response.data)
}

export async function apiCreateAdmin(data: AdminCreateSchema) {
  return await http.post('/admin-users', data)
}

export async function apiGetAdminById(id: string): Promise<AdminSchema> {
  const response = await http.get(`/admin-users/${id}`)

  return adminSchema.parse(response.data)
}

export async function apiEditAdmin({
  id,
  data,
}: {
  id: string
  data: AdminEditSchema
}) {
  return await http.put(`/admin-users/${id}`, data)
}

export async function deleteAdmin(id: string) {
  return await http.delete(`/admin-users/${id}`)
}

export const useDataAdminOverview = (params: PaginateQueryParams) =>
  useQuery({
    queryKey: ['admin_overview_key', params],
    queryFn: () => getAdminListing(params),
  })

export const useDataGetAdminEdit = (id: string) =>
  useQuery<AdminSchema>({
    queryKey: ['admin_edit_key', id],
    queryFn: () => apiGetAdminById(id),
  })

export const useDataGetAdminDetail = (id: string) =>
  useQuery<AdminSchema>({
    queryKey: ['admin_detail_key', id],
    queryFn: () => apiGetAdminById(id),
  })
