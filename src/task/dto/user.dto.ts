import { User } from '../entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty()
  readonly id: number
  @ApiProperty()
  readonly name: string
  @ApiProperty()
  readonly avatar: string

  constructor(id: number, name: string, avatar: string) {
    this.id = id
    this.name = name
    this.avatar = avatar
  }

  static fromEntity(entity: User) {
    return new UserDto(entity.id, entity.name, entity.avatar)
  }
}
