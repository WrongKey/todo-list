import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export default class BaseEntity {
  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
