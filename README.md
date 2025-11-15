🚀 Task Management Application – Full Stack (MEAtec Assignment)

A fully functional Task Management Application with secure user authentication, role-based access, and complete CRUD operations for personal tasks.
This project was created as part of the MEAtec Full-Stack Developer Assignment and demonstrates modern full-stack development skills using React, Node.js, Express, Prisma, and PostgreSQL.

📌 Features
🔐 Authentication

User Registration

Secure Login

Password hashing using bcrypt

JWT-based authentication

Protected backend routes

📝 Task Management

Create new tasks

View logged-in user’s tasks

Update task title, description, and status

Delete tasks

Users can only access their own tasks

🛡️ Validation

Frontend form validation using Zod + React Hook Form

Backend request validation

Proper error responses and input sanitization

🎨 UI

Modern responsive UI using TailwindCSS

Clean, minimal design

Toast/error messages for feedback

📚 Tech Stack

Frontend:

React

Vite

Redux Toolkit

Axios

React Router

TailwindCSS

React Hook Form + Zod

Backend:

Node.js

Express

TypeScript

Prisma ORM

PostgreSQL

JWT Authentication

bcryptjs

🏗️ Project Architecture
.
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── services
│   │   ├── config
│   │   └── utils
│   ├── prisma
│   └── package.json
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   ├── store
    │   ├── hooks
    │   └── utils
    └── package.json

⚙️ Installation & Setup Guide

Follow this step-by-step guide to run the project on Windows, macOS, or Linux.

🖥️ 1. Prerequisites

Make sure the following are installed:

✔ Node.js (v18+ recommended)

Check version:

node --version

✔ npm (comes with Node)
✔ PostgreSQL

Download:
https://www.postgresql.org/download/

During installation:

Remember your PostgreSQL password

Install pgAdmin 4

🗄️ 2. Database Setup (PostgreSQL)
1. Open pgAdmin 4
2. Connect to your PostgreSQL server

(Enter the password you created during installation)

3. Create a new database:

Right-click Databases → Create → Database

Name it:

meatec_assignment

4. Save
🔧 3. Backend Setup
Go to backend folder:
cd backend

Install dependencies:
npm install

Create .env file:
DATABASE_URL="postgresql://postgres:<YOUR_PASSWORD>@localhost:5432/meatec_assignment?schema=public"
JWT_SECRET="your_jwt_secret_here"
PORT=5000


Replace <YOUR_PASSWORD> with your actual PostgreSQL password.

Generate Prisma client:
npx prisma generate

Apply migrations:
npx prisma migrate dev --name init

Run backend:
npm run dev


Backend should run at:

http://localhost:5000

🌐 4. Frontend Setup
Open a new terminal

Go to frontend folder:

cd frontend

Install dependencies:
npm install

Start dev server:
npm run dev


Frontend will run at:

http://localhost:5173


(or whatever Vite prints)

🔑 5. Environment Variables Summary
Backend .env:
DATABASE_URL="postgresql://postgres:<PASSWORD>@localhost:5432/meatec_assignment?schema=public"
JWT_SECRET="supersecret"
PORT=5000


Frontend does not require an .env unless you add API URL customization.

🧪 6. Running Tests 
Backend tests:
npm run test
npm run test:coverage

Frontend tests:
npm run test
npm run test:coverage


If tests are not implemented, include this note:

Test suite not implemented due to time constraints. Ready to extend with Jest & React Testing Library.

📡 API Documentation
🔹 Authentication Routes
POST /api/auth/register

Body:

{
  "username": "testuser",
  "password": "pass1234"
}

POST /api/auth/login

Returns JWT token:

{
  "token": "<jwt_token>"
}

🔹 Task Routes (Protected)
GET /api/tasks

Returns logged-in user tasks.

POST /api/tasks
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}

PUT /api/tasks/:id

Update any field of a task.

DELETE /api/tasks/:id

Deletes user’s task.

📁 Folder Structure Explanation
Backend

/controllers → route logic

/routes → API endpoints

/middleware → authentication

/services → database queries

/prisma → ORM schema

/config → server config

Frontend

/pages → login, register, tasks

/components → reusable UI

/store → Redux slices

/utils → Axios client, helpers

🎯 How to Use the Application
1. Register using username + password
2. Login → JWT saved to localStorage
3. Create, update, delete tasks
4. Logout safely

Everything is connected end-to-end.

🎁 Extra Enhancements

Proper error handling

Clean UX

Protected routes

Secure JWT handling

Modern folder structure

🏁 Conclusion

This project fulfills the MEAtec assignment requirements with a robust full-stack implementation, modern tooling, secure authentication, validated forms, and complete CRUD functionality.

For any additional information or improvements, feel free to explore the codebase.

👨‍💻 Developer: Priyanshu
📧 Email: beingpriyanshu5555@gmail.com
