import { Role } from '@src/users/model'
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	name!: string
	@IsNotEmpty()
	@IsEmail()
	email!: string
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string
	@IsNotEmpty()
	@IsEnum(Role)
	role!: Role
}
