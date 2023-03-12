import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsOptional, IsString, Length } from 'class-validator'

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Length(1, 200)
  title?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  expireAt?: Date
}
