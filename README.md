# Express TODO API with Cron Job, JWT Authentication, mongoDb using mongoose library

This project is an Express.js server that includes a scheduled cron job, JWT-based authentication,mongodb and environment-based configuration.

## Features

- **Nodemon for Development**: Automatic server reloading in development.
- **Environment Configuration**: `.env` file setup for sensitive information.create .env file - required sample keys are in .env.sample , for generating JWT_SECRET/JWT_REFRESH command

  ```
  openssl rand -hex 64
  OR
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

  ```

- **Node-Cron**: Schedules tasks based on specified cron expressions.
- **JWT Authentication**: Secures routes using JSON Web Tokens.
- **Seeding**: Populate the database with initial data from seed/seed.ts using json file from fixtures/todos.json (todos are fetched from https://dummyjson.com/todos?limit=256)
- **Postman Collection**: Test endpoints directly via Postman.

## Getting Started

### Prerequisites

- Node.js (>= 14.x) - used 20.17.0 specified in .nvmrc
- yarn (or npm)
- MongoDB database with mongoose library

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/sanjayagnani92/todo-api.git
    cd your-repo
    git checkout develop
    ```

    For seeding data:

    ```bash
    yarn run seed
    ```

2.  Start the dev server:

    ```bash
    yarn install
    yarn run dev  (uses nodemon)
    ```

    application would run on port 3000

3.  Start the prod server:

    ```bash
    yarn build
    yarn run start
    ```

4.  CRON JOB

    ```
    cron.schedule('* * * * *', () => {
    console.log('Cron job executed every minute');
    });
    ```

getTodos => QueryParams - pagination , limit, isCompleted
