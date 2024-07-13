import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

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
	@IsOptional()
	@IsEnum(Role)
	role?: Role
}
