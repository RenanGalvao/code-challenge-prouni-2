import { Role } from '@src/routes/users/model'
import { IsOptional } from 'class-validator'
import { IsEnum, IsString, IsEmail, MinLength } from '@src/utils/class-validator'
import { Expose } from 'class-transformer'

export class UpdateUserDto {
	@Expose()
	@IsOptional()
	@IsString()
	name?: string
	@Expose()
	@IsOptional()
	@IsEmail()
	email?: string
	@Expose()
	@IsOptional()
	@IsString()
	@MinLength(8)
	@Expose()
	password?: string
	@Expose()
	@IsOptional()
	@IsEnum(Role, Object.values(Role))
	role?: Role
}
