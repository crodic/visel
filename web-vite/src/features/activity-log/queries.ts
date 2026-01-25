import z from 'zod'
import { useQuery } from '@tanstack/react-query'
import {
  type ApiMetadata,
  apiMetadataSchema,
  type PaginateQueryParams,
} from '@/global'
import http from '@/lib/http'
import { type ActivityLogSchema, logSchema } from './schema'

async function getLogListing(
  params: PaginateQueryParams
): Promise<ApiMetadata & { data: ActivityLogSchema[] }> {
  const response = await http.get('/audit-logs', { params })

  return apiMetadataSchema
    .extend({ data: z.array(logSchema) })
    .parse(response.data)
}

export async function apiGetLogById(id: string): Promise<ActivityLogSchema> {
  const response = await http.get(`/audit-logs/${id}`)

  return logSchema.parse(response.data)
}

export const useDataLogOverview = (params: PaginateQueryParams) =>
  useQuery({
    queryKey: ['log_overview_key', params],
    queryFn: () => getLogListing(params),
  })

export const useDataGetLogDetail = (id: string) =>
  useQuery<ActivityLogSchema>({
    queryKey: ['log_detail_key', id],
    queryFn: () => apiGetLogById(id),
  })
