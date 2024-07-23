export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}
export type Role = (typeof Role)[keyof typeof Role]

export type User = {
  id: string
  name: string
  email: string
  role: Role

  createdAt: string
  updatedAt?: string
}
