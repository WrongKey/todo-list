import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Task } from './entities/task.entity'
import { Comment } from './entities/comment.entity'
import { TaskChangeHistory } from './entities/task-change-history.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, Comment, TaskChangeHistory])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
