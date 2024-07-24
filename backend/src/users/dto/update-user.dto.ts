import { Role } from '@src/users/model'
import { IsEnum, IsOptional, IsString, IsEmail, MinLength } from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	name?: string
	@IsOptional()
	@IsEmail()
	email?: string
	@IsOptional()
	@IsString()
	@MinLength(8)
	password?: string
	@IsOptional()
	@IsEnum(Role)
	role?: Role
}
