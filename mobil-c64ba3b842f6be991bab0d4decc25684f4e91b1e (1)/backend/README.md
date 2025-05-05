# OtoCars API

This is the backend API for the OtoCars mobile application, built with Express.js and MongoDB.

## Features

- RESTful API for cars, parts, rentals, and user management
- Authentication with JWT
- Database operations using Mongoose
- Search and filtering functionality

## Requirements

- Node.js (v14 or higher)
- MongoDB (local or cloud)

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
```
npm install
```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/otocarDB
JWT_SECRET=your_jwt_secret
```

## Running the Server

Development mode with auto-reload:
```
npm run dev
```

Production mode:
```
npm start
```

## Database Seeding

To populate the database with sample data:
```
npm run seed
```

## API Endpoints

### Cars

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get a single car
- `GET /api/cars/search` - Search cars by filter criteria
- `POST /api/cars` - Create a new car (Auth required)
- `PUT /api/cars/:id` - Update a car (Auth required)
- `DELETE /api/cars/:id` - Delete a car (Auth required)

### Parts

- `GET /api/parts` - Get all parts
- `GET /api/parts/:id` - Get a single part
- `GET /api/parts/search` - Search parts by filter criteria
- `POST /api/parts` - Create a new part (Auth required)
- `PUT /api/parts/:id` - Update a part (Auth required)
- `DELETE /api/parts/:id` - Delete a part (Auth required)

### Rentals

- `GET /api/rentals` - Get all rentals
- `GET /api/rentals/:id` - Get a single rental
- `GET /api/rentals/search` - Search rentals by filter criteria
- `POST /api/rentals` - Create a new rental listing (Auth required)
- `PUT /api/rentals/:id` - Update a rental listing (Auth required)
- `DELETE /api/rentals/:id` - Delete a rental listing (Auth required)
- `POST /api/rentals/:id/book` - Book a rental (Auth required)

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile (Auth required)
- `PUT /api/users/profile` - Update user profile (Auth required)
- `POST /api/users/favorites` - Add item to favorites (Auth required)
- `DELETE /api/users/favorites` - Remove item from favorites (Auth required) 