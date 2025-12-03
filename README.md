# Movie Discovery Service API

A Node.js/Express API service for discovering movies, managing genres, and saving movies by users. Built with TypeScript, Prisma ORM, and PostgreSQL.

---

## Table of Contents

- [Overview](#overview)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Database Migrations](#database-migrations)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Available Endpoints](#available-endpoints)
  - [Error Responses](#error-responses)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## Overview

The Movie Discovery Service API provides endpoints to:

- **List Genres**: Retrieve paginated genres
- **List Movies**: Find movies available in a specific country, optionally filtered by genre
- **Save Movies**: Allow users to bookmark/save movies for later viewing
- **Remove Saved Movies**: Delete previously saved movies from a user's collection

All endpoints require API key authentication via the `x-api-key` header.

---

## Setup & Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 12+
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-discovery-service
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. **Generate Prisma Client**

   ```bash
   npm run prisma:generate
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/movie_discovery_db"

# API Configuration
PORT=3000
TOKEN_SECRET="your-secure-api-key-here"

# i18n (optional, for multi-language support)
LANGUAGE="en"
```

**Important Notes:**

- `DATABASE_URL`: PostgreSQL connection string
- `TOKEN_SECRET`: The API key required for all authenticated requests (used in `x-api-key` header)
- `PORT`: Server port (defaults to 3000)
- `LANGUAGE`: Language code for API responses ("en" for English, "id" for Indonesian)

---

## Database Migrations

### What are Migrations?

Migrations are version-controlled SQL scripts that define database schema changes. They allow you to safely evolve your database schema over time.

### Initial Migration

An initial migration (`20251202030134_init`) is included in `prisma/migrations/`. It sets up:

- User table
- Genre table
- Movie table
- Actor table
- Country table
- Relationships (MovieGenre, Cast, MovieAvailability, SavedMovie)

### Running Migrations

**Deploy pending migrations to the database:**

```bash
npm run migrate
```

This command applies all unapplied migrations from `prisma/migrations/` to your database.

**Create a new migration after schema changes:**

```bash
npm run migrate:create
```

This creates a new migration file without immediately applying it. You'll be prompted to name the migration.

**Reset database (⚠️ Destructive - Dev only):**

```bash
npm run migrate:reset
```

**⚠️ WARNING:** This command:

- Drops the entire database/schema
- Recreates it
- Applies all migrations
- Runs seed scripts

Only use on **development databases**. Never run on production!

### Migration Workflow

1. Update `prisma/schema.prisma` with your schema changes
2. Run `npm run migrate:create` and provide a descriptive name
3. Review the generated SQL in `prisma/migrations/<timestamp>_<name>/migration.sql`
4. Run `npm run migrate` to apply the migration
5. Commit the migration files to version control

---

## Database Seeding

### What is Seeding?

Seeding populates your database with initial/sample data for development and testing.

### Running the Seed

```bash
npm run seed
```

This executes `prisma/seed.ts` and creates:

- **15 Genres**: Action, Adventure, Comedy, Drama, Horror, Thriller, Sci-Fi, Fantasy, Romance, Mystery, Crime, Animation, Documentary, Family, Musical
- **5 Countries**: US, GB, ID, JP, FR
- **30 Actors**: Generated with random names
- **4 Users**: Alice, Bob, Charlie, Dina
- **150 Movies**: Randomly generated with:
  - Titles combining word pools
  - Years between 1980-2025
  - 1-3 genres per movie
  - 2-6 actors per movie
  - 1-4 country availabilities per movie
- **Saved Movies**: 5-20 saved movies per user with random dates

---

## Running the Application

### Development Mode

Start the development server with automatic restart on file changes:

```bash
npm run dev
```

The server runs on `http://localhost:3000` (or your configured `PORT`)

### Production Mode

Build and run for production:

```bash
npm run build  # (if build script is configured)
npm start
```

### Access API Documentation

Once the server is running, visit:

```
http://localhost:3000/api-docs
```

This opens the interactive Swagger UI for testing API endpoints.

---

## API Documentation

### Authentication

**All endpoints require the `x-api-key` header.**

The API key is validated against the `TOKEN_SECRET` environment variable.

**Header Format:**

```http
x-api-key: your-secure-api-key-here
```

**Authentication Errors:**

- **Missing header**: Returns `403 Forbidden`
- **Invalid key**: Returns `401 Unauthorized`

---

### Available Endpoints

#### 1. List Genres

**GET** `/api/genre`

Retrieve paginated list of all genres.

**Query Parameters:**

| Parameter   | Type    | Default | Description              |
| ----------- | ------- | ------- | ------------------------ |
| `page`      | integer | 1       | Page number (1-based)    |
| `page_size` | integer | 20      | Items per page (max 100) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/genre?page=1&page_size=10" \
  -H "x-api-key: your-api-key"
```

**Example Response (200 OK):**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Action"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Comedy"
    }
  ],
  "page": 1,
  "page_size": 10,
  "total": 15,
}
```

---

#### 2. List Movies

**GET** `/api/movie`

Retrieve paginated list of movies available in a specific country, optionally filtered by genre.

**Query Parameters:**

| Parameter   | Type          | Required | Description                                                     |
| ----------- | ------------- | -------- | --------------------------------------------------------------- |
| `country`   | string        | ✅ Yes   | ISO 3166-1 alpha-2 country code (e.g., "US", "GB", "ID")        |
| `genre`     | string (UUID) | ❌ No    | Genre ID for filtering                                          |
| `page`      | integer       | ❌ No    | Page number (default: 1)                                        |
| `page_size` | integer       | ❌ No    | Items per page (default: 20, max: 100)                          |
| `sort`      | string        | ❌ No    | Sort field: `year` (ascending) or `-year` (descending, default) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/movie?country=US&page=1&page_size=20&sort=-year" \
  -H "x-api-key: your-api-key"
```

**Example Request with Genre Filter:**

```bash
curl -X GET "http://localhost:3000/api/movie?country=ID&genre=550e8400-e29b-41d4-a716-446655440000&page=1" \
  -H "x-api-key: your-api-key"
```

**Example Response (200 OK):**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "title": "Shadow Empire 1",
      "year": 2024
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440011",
      "title": "Lost City 2",
      "year": 2023
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 45,
}
```

---

#### 3. List Saved Movies

**GET** `/api/savedmovie`

Retrieve paginated list of movies saved by a user that are available in a specific country.

**Query Parameters:**

| Parameter   | Type          | Required | Description                                                                 |
| ----------- | ------------- | -------- | --------------------------------------------------------------------------- |
| `country`   | string        | ✅ Yes   | ISO 3166-1 alpha-2 country code                                             |
| `user_id`   | string (UUID) | ✅ Yes   | User ID                                                                     |
| `page`      | integer       | ❌ No    | Page number (default: 1)                                                    |
| `page_size` | integer       | ❌ No    | Items per page (default: 20, max: 100)                                      |
| `sort`      | string        | ❌ No    | Sort field: `date_added` (ascending) or `-date_added` (descending, default) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/savedmovie?country=US&user_id=550e8400-e29b-41d4-a716-446655440100&page=1" \
  -H "x-api-key: your-api-key"
```

**Example Response (200 OK):**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "title": "Hidden Kingdom 5",
      "year": 2022
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 8,
}
```

---

#### 4. Save a Movie

**POST** `/api/savedmovie`

Save a movie for a user in a specific country.

**Request Body:**

```json
{
  "country": "US",
  "user_id": "550e8400-e29b-41d4-a716-446655440100",
  "movie_id": "550e8400-e29b-41d4-a716-446655440010"
}
```

**Required Fields:**

| Field      | Type          | Description              |
| ---------- | ------------- | ------------------------ |
| `country`  | string        | ISO alpha-2 country code |
| `user_id`  | string (UUID) | User ID                  |
| `movie_id` | string (UUID) | Movie ID                 |

**Example Request:**

```bash
curl -X POST "http://localhost:3000/api/savedmovie" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "country": "US",
    "user_id": "550e8400-e29b-41d4-a716-446655440100",
    "movie_id": "550e8400-e29b-41d4-a716-446655440010"
  }'
```

**Example Response (201 Created):**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "title": "Shadow Empire 1",
    "year": 2024
  }
}
```

**Error Responses:**

| Status | Error                | Description                                  |
| ------ | -------------------- | -------------------------------------------- |
| 409    | Conflict             | User already saved this movie                |
| 422    | Unprocessable Entity | Movie not available in the specified country |

---

#### 5. Remove a Saved Movie

**DELETE** `/api/savedmovie`

Remove a previously saved movie for a user.

**Request Body:**

```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440100",
  "movie_id": "550e8400-e29b-41d4-a716-446655440010"
}
```

**Required Fields:**

| Field      | Type          | Description |
| ---------- | ------------- | ----------- |
| `user_id`  | string (UUID) | User ID     |
| `movie_id` | string (UUID) | Movie ID    |

**Example Request:**

```bash
curl -X DELETE "http://localhost:3000/api/savedmovie" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440100",
    "movie_id": "550e8400-e29b-41d4-a716-446655440010"
  }'
```

**Example Response (204 No Content):**

No response body returned on success.

**Error Responses:**

| Status | Error     | Description                          |
| ------ | --------- | ------------------------------------ |
| 404    | Not Found | Movie not found in user's saved list |

---

### Error Responses

All errors return a consistent JSON format:

```json
{
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descriptive error message",
    "details": {}
  },
}
```

**Common HTTP Status Codes:**

| Status | Meaning                                                |
| ------ | ------------------------------------------------------ |
| 200    | OK - Request succeeded                                 |
| 201    | Created - Resource successfully created                |
| 204    | No Content - Successful deletion                       |
| 400    | Bad Request - Invalid query parameters or request body |
| 401    | Unauthorized - Invalid API key                         |
| 403    | Forbidden - Missing API key header                     |
| 404    | Not Found - Resource not found                         |
| 409    | Conflict - Duplicate save attempt                      |
| 422    | Unprocessable Entity - Movie not available in country  |

---

## Testing

Run the test suite:

```bash
npm run test
```

Test files are located in the `test/` directory:

- `genre.api.test.ts` - Genre endpoint tests
- `movie.api.test.ts` - Movie endpoint tests
- `savedMovie.api.test.ts` - Saved movie endpoint tests

---

## Project Structure

```
movie-discovery-service/
├── src/
│   ├── index.ts                          # Application entry point
│   ├── controllers/                      # Request handlers
│   │   ├── genre.controller.ts
│   │   ├── movie.controller.ts
│   │   ├── savedMovie.controller.ts
│   │   └── common/
│   │       └── base.controller.ts
│   ├── services/                         # Business logic
│   │   ├── genre.service.ts
│   │   ├── movie.service.ts
│   │   └── savedMovie.service.ts
│   ├── repositories/                     # Data access
│   │   ├── genre.repository.ts
│   │   ├── movie.repository.ts
│   │   └── savedMovie.repository.ts
│   ├── routes/                           # API routes
│   │   ├── genre.route.ts
│   │   ├── movie.route.ts
│   │   └── savedMovie.route.ts
│   └── helpers/
│       ├── response.ts                   # Response formatting
│       ├── errors/
│       │   └── errors.ts                 # Error definitions
│       ├── messages/                     # i18n messages
│       │   ├── messages_en.ts
│       │   ├── messages_id.ts
│       │   ├── messagesKey.ts
│       │   └── messagesUtil.ts
│       ├── dtos/                         # Data transfer objects
│       │   ├── genre.dto.ts
│       │   └── movie.dto.ts
│       ├── const/
│       │   └── default-pagination.ts
│       ├── utility/
│       │   └── verifyToken.ts            # API key middleware
│       └── view-model/
│           ├── listReturn.vm.ts
│           └── result.vm.ts
├── prisma/
│   ├── schema.prisma                     # Database schema
│   ├── seed.ts                           # Database seeding script
│   └── migrations/                       # Schema migrations
├── generated/
│   └── prisma/                           # Generated Prisma Client
├── test/                                 # Test files and utilities
├── openapi.yaml                          # OpenAPI/Swagger specification
├── package.json                          # Dependencies and scripts
├── tsconfig.json                         # TypeScript configuration
├── jest.config.ts                        # Jest testing configuration
├── eslint.config.mjs                     # ESLint configuration
└── README.md                             # This file
```

---

## Development Notes

### Adding New Endpoints

1. Create a new service in `src/services/`
2. Create a corresponding repository in `src/repositories/`
3. Create a controller in `src/controllers/`
4. Define routes in `src/routes/`
5. Update `openapi.yaml` with endpoint documentation
6. Add tests in `test/`

### Database Schema Changes

1. Update `prisma/schema.prisma`
2. Run `npm run migrate:create`
3. Review generated migration SQL
4. Run `npm run migrate` to apply
5. Run `npm run seed` if needed to populate new data

---

## Support & Troubleshooting

### Common Issues

**Database Connection Error**

- Verify `DATABASE_URL` in `.env` is correct
- Ensure PostgreSQL is running
- Check database credentials

**API Key Invalid**

- Verify `TOKEN_SECRET` in `.env` matches the `x-api-key` header value

**Migration Errors**

- Run `npx prisma generate`
- Remove old migration folder with `rm -rf prisma/migrations`
- Reset migration with `npx prisma migrate reset --force`
- Do migration again with `npx prisma migrate dev --name init`
