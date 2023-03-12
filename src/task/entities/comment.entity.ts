import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import BaseEntity from '../../common/base-entity'
import { Task } from './task.entity'
import { User } from './user.entity'

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  description: string

  @ManyToOne(() => User)
  author: User

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task
}
