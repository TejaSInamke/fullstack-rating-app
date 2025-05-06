# FullStack Rating App

A full-stack web application for store ratings with role-based access control.

## 🛠 Tech Stack

- Backend: Express.js, Node.js
- Frontend: React.js
- Database: MySQL

## 🔧 Features by Role

### 👨‍💼 Admin
- Add users and stores
- Dashboard: total users, stores, ratings
- View/filter/sort users and stores

### 👤 Normal User
- Signup/login/update password
- Search stores
- Submit/modify ratings

### 🏪 Store Owner
- View ratings for their store
- See average rating

## 🚀 Setup Instructions

### Backend
1. Clone the repo.
2. Create `.env` file using the example above.
3. Run:
```bash
cd backend
npm install
node server.js
