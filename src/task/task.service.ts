import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import {
  Between,
  DataSource,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'
import { User } from './entities/user.entity'
import { errors } from '../common/errors'
import { pick, mergeLeft } from 'ramda'
import { TaskDto } from './dto/task.dto'
import { TaskQueryParam } from './dto/query-task.dto'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { TaskChangeHistory } from './entities/task-change-history.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(taskDto: CreateTaskDto): Promise<TaskDto> {
    const creator = await this.userRepository.findOneBy({
      id: taskDto.creatorId,
    })

    if (!creator) {
      throw errors.USER_NOT_FOUND
    }

    const task = this.taskRepository.create({
      creator: creator,
      ...pick(['title', 'description', 'expireAt'], taskDto),
    })

    return TaskDto.fromEntity(await this.taskRepository.save(task))
  }

  async findAll(query: TaskQueryParam) {
    const tasks = await this.taskRepository.find({
      where: this.buildConditions(query),
      relations: { creator: true },
      order: this.buildOrder(query),
    })
    return tasks.map(TaskDto.fromEntity)
  }

  async findOne(id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { creator: true },
    })
    if (!task) {
      throw errors.TASK_NOT_FOUND
    }

    return TaskDto.fromEntity(task)
  }

  update(id: number, input: UpdateTaskDto) {
    return this.dataSource.transaction(async (trx) => {
      const taskRepository = trx.getRepository(Task)
      const taskChangeHistoryRepository = trx.getRepository(TaskChangeHistory)

      const task = await taskRepository.findOne({
        where: { id },
        lock: { mode: 'pessimistic_write' },
      })

      if (!task) {
        throw errors.TASK_NOT_FOUND
      }

      await taskChangeHistoryRepository.insert({
        input,
        task,
      })

      return await taskRepository.save(mergeLeft(input, task))
    })
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.taskRepository.delete(id)
    if (affected === 0) {
      throw errors.TASK_NOT_FOUND
    }
  }

  private buildConditions(query: TaskQueryParam) {
    const conditions: FindOptionsWhere<Task> = {}
    if (query.creatorId) {
      conditions.creator = { id: query.creatorId }
    }
    if (query.createdBefore && query.createdAfter) {
      conditions.createdAt = Between(query.createdAfter, query.createdBefore)
    } else if (query.createdBefore) {
      conditions.createdAt = LessThanOrEqual(query.createdBefore)
    } else {
      conditions.createdAt = MoreThanOrEqual(query.createdAfter)
    }
    return conditions
  }

  private buildOrder(query: TaskQueryParam) {
    if (!query.orderBy) {
      return undefined
    }

    if (query.orderBy === 'creatorName') {
      return { creator: { name: query.direction } }
    }
    return { [query.orderBy]: query.direction }
  }
}
