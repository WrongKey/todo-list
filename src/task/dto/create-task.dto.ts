import { IsDate, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTaskDto {
  @ApiProperty()
  @IsNumber()
  creatorId: number

  @ApiProperty()
  @IsString()
  @Length(1, 200)
  title: string

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
