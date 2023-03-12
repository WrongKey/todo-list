import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { TaskDto } from './dto/task.dto'
import { TaskQueryParam } from './dto/query-task.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskDto })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @Get()
  @ApiOkResponse({ type: TaskDto, isArray: true })
  findAll(@Query() query: TaskQueryParam) {
    return this.taskService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskDto })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id)
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto)
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id)
  }
}
