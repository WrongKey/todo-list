import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'

const applySwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Todo list api')
    .setDescription('The todo list API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  applySwagger(app)
  app.use(helmet())
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    })
  )
  await app.listen(3000)
}

bootstrap()
