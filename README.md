# wspaceagentsdemo

## Project Description

This project is a web application that allows users to sign up for an account, and from there allows users to register their picks for 12 golfers for a Masters pool. The application includes user authentication and login, a database containing all of the players in the Masters, and a separate database for the user picks for all users. The project uses SQLite as the database technology for portability and requires no additional server or cloud service.

## Features

- User account sign-up and login
- User authentication using JWT (JSON Web Tokens)
- Register picks for 12 golfers for a Masters pool
- SQLite database for user accounts, player information, and user picks
- Password reset functionality
- User account verification
- User input validation
- API endpoints for user registration, login, profile retrieval, logout, and account verification
- API endpoints for user picks submission, retrieval, update, and deletion
- Front-end built with React
- Testing framework using Jest and Supertest

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/adamga/wspaceagentsdemo.git
   cd wspaceagentsdemo
   ```

2. Install dependencies for the backend:
   ```sh
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```sh
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```sh
   cd ../backend
   npm start
   ```

5. Start the frontend development server:
   ```sh
   cd ../frontend
   npm start
   ```

## Usage Instructions

### User Registration

1. Open the web application in your browser.
2. Navigate to the registration page.
3. Fill in the registration form with your username, email, and password.
4. Submit the form to create a new account.

### User Login

1. Open the web application in your browser.
2. Navigate to the login page.
3. Fill in the login form with your username and password.
4. Submit the form to log in to your account.

### Register Picks

1. Log in to your account.
2. Navigate to the picks page.
3. Select 12 golfers for your Masters pool and specify the pick order.
4. Submit the form to register your picks.

## Database Schema

### Users Table

- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT): Unique identifier for each user
- `username` (TEXT, UNIQUE, NOT NULL): Username for the user
- `password_hash` (TEXT, NOT NULL): Hashed password for the user
- `email` (TEXT, UNIQUE, NOT NULL): Email address of the user
- `verified` (BOOLEAN, NOT NULL, DEFAULT 0): Indicates whether the user's account has been verified

### Players Table

- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT): Unique identifier for each player
- `name` (TEXT, NOT NULL): Name of the player
- `country` (TEXT, NOT NULL): Country of the player
- `ranking` (INTEGER, NOT NULL): Current ranking of the player

### User Picks Table

- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT): Unique identifier for each pick
- `user_id` (INTEGER, NOT NULL, FOREIGN KEY REFERENCES users(id)): ID of the user making the pick
- `player_id` (INTEGER, NOT NULL, FOREIGN KEY REFERENCES players(id)): ID of the picked player
- `pick_order` (INTEGER, NOT NULL): Order in which the player was picked by the user

### Password Reset Tokens Table

- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT): Unique identifier for each token
- `user_id` (INTEGER, NOT NULL, FOREIGN KEY REFERENCES users(id)): ID of the user requesting the password reset
- `token` (TEXT, UNIQUE, NOT NULL): Unique token for password reset
- `expires_at` (DATETIME, NOT NULL): Expiration time for the token

### Verification Tokens Table

- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT): Unique identifier for each token
- `user_id` (INTEGER, NOT NULL, FOREIGN KEY REFERENCES users(id)): ID of the user requesting the account verification
- `token` (TEXT, UNIQUE, NOT NULL): Unique token for account verification
- `expires_at` (DATETIME, NOT NULL): Expiration time for the token

## API Endpoints

### User Authentication

- `POST /api/register`: Create a new user account
- `POST /api/login`: Log in to an existing user account
- `GET /api/profile`: Retrieve the authenticated user's profile information
- `POST /api/logout`: Log out the authenticated user
- `POST /api/verify-account`: Request account verification
- `GET /api/verify-account`: Verify the user's account
- `POST /api/request-password-reset`: Request a password reset
- `POST /api/reset-password`: Reset the user's password

### User Picks

- `POST /api/picks`: Submit user picks for the Masters pool
- `GET /api/picks`: Retrieve the authenticated user's picks
- `PUT /api/picks/:id`: Update the authenticated user's picks
- `DELETE /api/picks/:id`: Delete a specific pick

## Testing

### Backend Tests

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Run the tests:
   ```sh
   npm test
   ```

### Frontend Tests

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Run the tests:
   ```sh
   npm test
   ```
