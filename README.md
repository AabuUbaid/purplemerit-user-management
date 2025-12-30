# PurpleMerit User Management System

A full-stack user management application built as part of the PurpleMerit Backend Intern assessment.

The project demonstrates secure authentication, role-based access control, admin user management, and profile handling using a modern full-stack JavaScript setup.

## TECH STACK

### Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

bcrypt

### Frontend

React (Vite)

React Router

Axios

Minimal custom CSS

## FEATURES

Authentication & Authorization

User signup and login

JWT-based authentication

Role-based access (Admin / User)

Protected routes

User Features

View profile

Update name and email

Change password

Logout

Admin Features

View all users (paginated)

Activate and deactivate users

Admin-only dashboard access

## LIVE DEPLOYMENT

Frontend (Vercel)
https://purplemerit-user-management-lime.vercel.app/

Backend (Render)
https://purplemerit-user-management-k76u.onrender.com

## ENVIRONMENT VARIABLES

### Backend (.env)

PORT
MONGO_URI
JWT_SECRET
JWT_EXPIRES_IN

Note: Actual environment variable values are not committed to the repository.

## LOCAL SETUP INSTRUCTIONS

### Backend

Navigate to backend folder

Install dependencies

Start server

Commands:
cd backend
npm install
npm run dev

### Frontend

Navigate to frontend folder

Install dependencies

Start development server

Commands:
cd frontend
npm install
npm run dev

## API DOCUMENTATION

### Authentication

Signup
POST /api/auth/signup

Request Body:
{
"fullName": "John Doe",
"email": "john@example.com
",
"password": "password123"
}

Login
POST /api/auth/login

Response:
{
"token": "jwt-token",
"user": {
"id": "user-id",
"email": "john@example.com
",
"role": "user"
}
}

User Routes (Authenticated)

Get Profile
GET /api/users/profile

Headers:
Authorization: Bearer <token>

Update Profile
PUT /api/users/profile

Change Password
PUT /api/users/change-password

Admin Routes (Admin Only)

Get Users (Paginated)
GET /api/admin/users?page=1

Activate User
PUT /api/admin/users/:id/activate

Deactivate User
PUT /api/admin/users/:id/deactivate

## NOTES

Client-side validation is implemented for login and signup forms.

Role-based route protection is enforced on both frontend and backend.

Backend and frontend are fully deployed and connected.

Commit history reflects iterative development and deployment.

## WALKTHROUGH VIDEO

A 3–5 minute narrated walkthrough video demonstrates:

User login and signup

Role-based access control

Profile update and password change

Admin dashboard and user management

Live deployed frontend and backend

API testing using Postman

(Video link included in submission.)

# END OF DOCUMENT
