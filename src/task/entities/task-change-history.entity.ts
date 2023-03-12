import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import BaseEntity from '../../common/base-entity'
import { Task } from './task.entity'

@Entity()
export class TaskChangeHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('json')
  input: Partial<Pick<Task, 'title' | 'description' | 'expireAt'>>

  @ManyToOne(() => Task, (task) => task.changeHistoryItems)
  task: Task
}
