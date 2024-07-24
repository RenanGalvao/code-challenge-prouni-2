import { Role } from '@src/routes/users/model'
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from '@src/utils/class-validator'
import { Expose } from 'class-transformer'

export class CreateUserDto {
	@Expose()
	@IsNotEmpty()
	@IsString()
	name!: string
	@Expose()
	@IsNotEmpty()
	@IsEmail()
	email!: string
	@Expose()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@Expose()
	password!: string
	@Expose()
	@IsNotEmpty()
	@IsEnum(Role, Object.values(Role))
	role!: Role
}
