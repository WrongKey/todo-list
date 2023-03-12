import { Module } from '@nestjs/common'
import { TaskModule } from './task/task.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './task/entities/task.entity'
import { User } from './task/entities/user.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Comment } from './task/entities/comment.entity'
import { TaskChangeHistory } from './task/entities/task-change-history.entity'
import * as process from 'process'

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Task, User, Comment, TaskChangeHistory],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: process.env.NODE_ENV === 'local',
      logging: process.env.NODE_ENV === 'local' ? 'all' : ['error'],
      logger: 'advanced-console',
    }),
  ],
})
export class AppModule {}
