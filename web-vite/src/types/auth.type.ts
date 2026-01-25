export interface User {
  id: string
  firstName: string
  lastName: string
  fullName: string
  username?: string
  email: string
  image?: string
  bio?: string
  phone?: string
  birthday?: string
  role: {
    id: string
    name: string
    permissions: string[]
  }
  createdAt: string
  updatedAt: string
}
