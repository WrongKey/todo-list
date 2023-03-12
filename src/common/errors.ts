import { HttpStatus } from '@nestjs/common'

export class ApiError extends Error {
  public readonly statusCode: number
  public constructor(message: string, statusCode: number) {
    super(message)

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.statusCode = Number(statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class NotFoundError extends ApiError {
  public constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
}

export const errors = {
  USER_NOT_FOUND: new NotFoundError('User not found'),
  TASK_NOT_FOUND: new NotFoundError('Task not found'),
}
