import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import BaseEntity from '../../common/base-entity'
import { Task } from './task.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  avatar: string

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Task[]
}
