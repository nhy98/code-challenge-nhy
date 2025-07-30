# Scoreboard API Module

## Overview
The Scoreboard API Module is a backend service for a website featuring a live-updating scoreboard displaying the top 10 users by score. It handles secure score updates triggered by user actions and broadcasts real-time updates to connected clients using WebSockets. The module is built with TypeScript, Express, Mongoose, and Socket.IO, ensuring security, scalability, and maintainability.

## Features
- **Secure Score Updates**: Users can increment their scores via an authenticated API endpoint, preventing unauthorized updates.
- **Live Scoreboard Updates**: Real-time updates to the top 10 scores are broadcast to all connected clients using WebSockets.
- **Top 10 Scoreboard**: Retrieve the top 10 users by score, sorted in descending order.
- **MongoDB Integration**: Stores user and score data persistently.
- **Authentication**: Uses JSON Web Tokens (JWT) to authenticate score update requests.
- **Input Validation**: Ensures valid data for score updates using Yup.
- **Error Handling**: Robust error handling with custom HTTP errors.
- **Testing**: Unit and integration tests using Jest and Supertest.

## Tech Stack
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **WebSocket**: Socket.IO
- **Authentication**: JWT
- **Validation**: Yup
- **Testing**: Jest, Supertest, MongoDB Memory Server
- **Containerization**: Docker, Docker Compose

## Project Structure
```
scoreboard-api/
├── src/
│   ├── controllers/
│   │   └── scoreController.ts
│   ├── services/
│   │   └── scoreService.ts
│   ├── models/
│   │   └── User.ts
│   ├── routes/
│   │   └── scoreRoutes.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   │   └── errorHandler.ts
│   │   └── validateRequest.ts
│   ├── types/
│   │   └── environment.d.ts
│   ├── utils/
│   │   └── httpError.ts
│   └── index.ts
├── tests/
│   ├── integration/
│   │   └── scoreRoutes.test.ts
│   ├── unit/
│   │   └── scoreService.test.ts
│   └── setup.ts
├── .env
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
```

## API Endpoints
### POST /api/scores
- **Description**: Increments a user's score by a specified amount (default: 1) upon completing an action.
- **Authentication**: Requires a valid JWT in the `Authorization` header (Bearer token).
- **Request Body**:
  ```json
  {
    "scoreIncrement": 1
  }
  ```
- **Response**:
  - `201 Created`: `{ userId: string, newScore: number }`
  - `400 Bad Request`: Invalid input
  - `401 Unauthorized`: Invalid or missing token
  - `500 Internal Server Error`: Server error

### GET /api/scores/top
- **Description**: Retrieves the top 10 users by score.
- **Response**:
  ```json
  [
    { "userId": string, "username": string, "score": number },
    ...
  ]
  ```

## WebSocket Events
- **Event**: `scoreboardUpdate`
- **Description**: Broadcasts the updated top 10 scores to all connected clients whenever a score is updated.
- **Payload**:
  ```json
  [
    { "userId": string, "username": string, "score": number },
    ...
  ]
  ```

## Setup Instructions
1. **Prerequisites**:
   - Node.js 18+
   - Docker and Docker Compose
   - MongoDB (local or via Docker)

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://mongodb:27017/scoreboard
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Run Locally**:
   - Development: `npm run dev`
   - Build: `npm run build`
   - Production: `npm start`

5. **Run with Docker**:
   ```bash
   docker-compose up --build
   ```

6. **Run Tests**:
   ```bash
   npm test
   ```

## Testing
- **Unit Tests**: Test `ScoreService` methods with mocked Mongoose models.
- **Integration Tests**: Test API endpoints with an in-memory MongoDB instance.
- **Run Tests**:
  ```bash
  npm test
  npm run test:watch
  npm run test:coverage
  ```

## Docker Setup
- **Dockerfile**: Builds the Node.js app with TypeScript compilation.
- **Docker Compose**: Runs the app and MongoDB services with a test service for running tests.
- **Volumes**: Persists MongoDB data and maps the project directory for development.

## Security
- **JWT Authentication**: Protects the score update endpoint.
- **Input Validation**: Uses Yup to validate `scoreIncrement`.
- **Helmet**: Adds security headers.
- **CORS**: Configured to allow only trusted origins (set in `.env`).

## Error Handling
- Custom `HttpError` class for consistent error responses.
- Centralized error handling middleware.

## Improvements
- **Rate Limiting**: Add rate limiting to prevent abuse of the score update endpoint.
- **Redis for Caching**: Cache the top 10 scores to reduce database load.
- **Pagination**: Support pagination for the scoreboard if the dataset grows large.
- **Logging**: Implement structured logging (e.g., Winston) for better monitoring.
- **WebSocket Authentication**: Add token-based authentication for WebSocket connections.
- **Database Indexing**: Ensure indexes on `score` and `userId` for performance.