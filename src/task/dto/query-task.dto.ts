import { IsDate, IsIn, IsNumber, IsOptional, ValidateIf } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TaskQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  creatorId: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createdBefore?: Date

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createdAfter?: Date

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(['id', 'createdAt', 'expireAt', 'creatorName'])
  orderBy: 'id' | 'createdAt' | 'expireAt' | 'creatorName'

  @ApiProperty({ required: false })
  @ValidateIf((query: TaskQueryParam) => !!query.orderBy)
  @IsIn(['asc', 'desc'])
  direction: 'asc' | 'desc'
}
