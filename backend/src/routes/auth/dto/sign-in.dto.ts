import { IsEmail, IsNotEmpty, IsString, MinLength } from '@src/utils/class-validator'
import { Expose } from 'class-transformer'

export class SignInDto {
	@Expose()
	@IsNotEmpty()
	@IsEmail()
	email!: string
	@Expose()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string
}
