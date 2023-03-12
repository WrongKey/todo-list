FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json tsconfig*.json nest-cli.json yarn.lock ./
COPY src ./src
RUN yarn install
RUN yarn build

FROM node:lts-alpine as release
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=build /app/dist ./

EXPOSE 3000 3000

CMD ["node", "./main"]