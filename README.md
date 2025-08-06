# Project One Node.js

A Node.js REST API project for user authentication and task management.

## Features

- User registration and login (JWT-based authentication)
- Task CRUD operations (Create, Read, Update, Delete)
- Error handling middleware
- Modular code structure (controllers, models, routes, middlewares, utils)
- MongoDB integration

## Project Structure

```
app.js                # Main application entry point
config/db.js          # Database connection setup
controllers/          # Route logic (auth, task)
middlewares/          # Auth, error handler, not found route
models/               # Mongoose models (User, Task)
routes/               # API route definitions
utils/                # Utility functions (error, async, token)
```

## Setup

1. Clone the repository.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Create a `.env` file with your environment variables (see `.env.example` if available).
4. Start the server:
   ```powershell
   npm start
   ```

## API Endpoints

- `/api/auth/signup` - Register a new user
- `/api/auth/signin` - Login and get JWT
- `/api/auth/logout` - Logout user
- `/api/tasks` - Manage tasks (protected routes)

## Scripts

- `npm start` - Start the server
- `npm run dev` - Start server in development mode (if using nodemon)
