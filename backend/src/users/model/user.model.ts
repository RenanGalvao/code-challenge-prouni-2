export const Role = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}
export type Role = (typeof Role)[keyof typeof Role]

export class UserModel {
    id: string
    name: string
    email: string
    hashedPassword: string
    role: Role
    createdAt: string
    updatedAt: string | null

    constructor(user: UserModel) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.hashedPassword = user.hashedPassword
        this.role = user.role
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
    }
}