import { IsInt, IsOptional } from 'class-validator'

export class PaginationDto {
    @IsOptional()
    @IsInt()
    itemsPerPage?: number
    @IsOptional()
    @IsInt()
    page?: number
}