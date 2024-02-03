# Nestjs Todo api

A simple Todo REST API with authentication built with NestJS and Prisma.

### Installation

1. Clone the repository

```bash
git clone https://github.com/mohamadayash22/nestjs-todo-api.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development database

- If you have a local instance of PostgreSQL running, you can skip this step. In this case, you will need to update the `DATABASE_URL` in the `.env` file to point to your local instance of PostgreSQL.

```bash
docker-compose up -d
```

4. Run the migrations

```bash
npm run migrate:dev
```

5. Start the development server

```bash
npm run start:dev
```
