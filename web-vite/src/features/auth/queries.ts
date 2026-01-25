import { type User } from '@/types/auth.type'
import http from '@/lib/http'
import {
  type AccountFormSchema,
  type ProfileFormSchema,
} from '../settings/schema'
import { type ResetPasswordSchema, type LoginSchema } from './schema'

export interface ApiLoginResponse {
  accessToken: string
  refreshToken: string
  userId: string
}

export async function apiLogin(values: LoginSchema): Promise<ApiLoginResponse> {
  const res = await http.post('/auth/login', values)

  return res.data
}

export async function apiSignOut() {
  const res = await http.post(`/auth/logout`)

  return res
}

export async function apiRefreshToken(token: string) {
  const res = await http.post('/auth/refresh', { refreshToken: token })

  return res.data
}

export async function apiGetMe(): Promise<User> {
  const res = await http.get('/auth/me')

  return res.data
}

export async function apiForgotPassword(email: string) {
  return await http.post(`/auth/forgot-password`, { email })
}

export async function apiResetPassword(
  data: ResetPasswordSchema,
  token: string
) {
  return await http.post(`/auth/reset-password?token=${token}`, {
    password: data.newPassword,
    confirmPassword: data.confirmPassword,
  })
}

export async function apiUpdateMe(data: ProfileFormSchema) {
  return await http.put('/auth/me', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function apiUpdateCurrentAccount(data: AccountFormSchema) {
  return await http.put('/auth/me', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
