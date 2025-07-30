# Resource API

This project is an ExpressJS backend server implemented in TypeScript that provides a CRUD interface for resource management. It uses MongoDB for data persistence and supports running with Docker Compose.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing with curl](#testing-with-curl)

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd resource-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

---

## Configuration

- Copy `.env.example` to `.env` and adjust as needed, or set environment variables directly.
- Example `.env`:
  ```
  MONGO_URI=mongodb://mongodb:27017/expressdb
  PORT=3000
  ```

---

## Running the Application

### Using Docker Compose (Recommended)

```sh
docker-compose up --build -d
```
- This will start both MongoDB and the Express server.
- The API will be available at `http://localhost:3000/api/resources`.

### Running Locally

1. Make sure MongoDB is running locally or update your `.env` with the correct connection string.
2. Build the project:
   ```sh
   npm run build
   ```
3. Start the server:
   ```sh
   npm start
   ```
4. Run tests:
   ```sh
   npm test
   ```
- The API will be available at `http://localhost:3000/api/resources`.

---

## API Endpoints

| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| POST   | `/api/resources`        | Create a resource        |
| GET    | `/api/resources`        | List resources           |
| GET    | `/api/resources/:id`    | Get resource details     |
| PUT    | `/api/resources/:id`    | Update a resource        |
| DELETE | `/api/resources/:id`    | Delete a resource        |

---

## Testing with curl

### 1. Create a Resource

```sh
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name": "Sample Resource", "description": "This is a sample."}'
```

### 2. List Resources

```sh
curl http://localhost:3000/api/resources
```

### 3. Get Resource Details

```sh
curl http://localhost:3000/api/resources/<RESOURCE_ID>
```

### 4. Update Resource

```sh
curl -X PUT http://localhost:3000/api/resources/<RESOURCE_ID> \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "description": "Updated description."}'
```

### 5. Delete Resource

```sh
curl -X DELETE http://localhost:3000/api/resources/<RESOURCE_ID>
```

_Replace `<RESOURCE_ID>` with the actual resource ID returned from the create or list endpoints._

---

## License

NHY