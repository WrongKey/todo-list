import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import BaseEntity from '../../common/base-entity'
import { User } from './user.entity'
import { Comment } from './comment.entity'
import { TaskChangeHistory } from './task-change-history.entity'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  expireAt: Date

  @ManyToOne(() => User, (user) => user.tasks)
  creator: User

  @OneToMany(() => Comment, (comment) => comment.task, {
    onDelete: 'CASCADE',
  })
  comments: Comment[]

  @OneToMany(() => TaskChangeHistory, (changeHistory) => changeHistory.task, {
    onDelete: 'CASCADE',
  })
  changeHistoryItems: TaskChangeHistory[]
}
