## Backend for the [interview assignment](https://github.com/stark-tech-space/interview-todoList)

## Tech stack
Typescript + NestJs + TypeORM + Postgres + Docker

## Installation

```bash
$ yarn install
```

## Build Docker

```bash
$ docker build . -t todo-list:latest
```

## Running the app
Start local dependency(postgres database)
```bash
$ docker compose up
```

Start application
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API doc


## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```
