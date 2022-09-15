## Deployed lambda

- Development: https://xzga06cec2.execute-api.us-east-1.amazonaws.com/dev/api
- Production: https://cm03w2x3e8.execute-api.us-east-1.amazonaws.com/production/api

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository.
This project contains an example of a lambda function using NestJS.
It is a REST API

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# prisma generate
$ npx prisma generate

# prisma migrate
$ npx prisma migrate dev

```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Local

- Find the local Swagger UI in http://localhost:3000/api
- Health check in http://localhost:3000/ or http://localhost:3000/health-check

#### Lambda

```bash
$ serverless offline start
```

## Deploy

### Prerequisites

- AWS account
    - Create an IAM user with programmatic access. See
- AWS CLI
    - Install. See [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
    - Configure credentials.
      See [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
      and [AWS SAM docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-set-up-credentials.html)
- Serverless Framework. See [Serverless docs](https://www.serverless.com/framework/docs)
  ```bash
  $ yarn add serverless -g
  ```
- Docker
    - Install. See [Docker docs](https://docs.docker.com/get-docker/)
    - Start Docker daemon. See [Docker docs](https://docs.docker.com/engine/reference/commandline/dockerd/)

### Deploy to AWS

This will deploy the lambda to AWS and create a new API Gateway endpoint.
The endpoint will be printed to the console.
You can also find it in the AWS console.

This step uses the AWS CLI and [Serverless Framework](https://www.serverless.com/).

```bash
$ yarn install
$ docker build .
$ serverless deploy --stage production
```

