import http from '@/lib/http'
import { type PasswordFormSchema } from './schema'

export async function apiChangePassword(
  data: PasswordFormSchema
): Promise<PasswordFormSchema> {
  const response = await http.post('/admin-users/me/change-password', data)

  return response.data
}
