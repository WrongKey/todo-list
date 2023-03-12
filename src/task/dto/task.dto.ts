import { Task } from '../entities/task.entity'
import { UserDto } from './user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class TaskDto {
  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly title: string

  @ApiProperty({ required: false })
  readonly description?: string

  @ApiProperty({ required: false })
  readonly expireAt: Date

  @ApiProperty()
  readonly creator: UserDto

  constructor(
    id: number,
    title: string,
    description: string,
    expireAt: Date,
    creator: UserDto
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.expireAt = expireAt
    this.creator = creator
  }

  static fromEntity(entity: Task) {
    return new TaskDto(
      entity.id,
      entity.title,
      entity.description,
      entity.expireAt,
      UserDto.fromEntity(entity.creator)
    )
  }
}
