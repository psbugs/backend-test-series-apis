# 🧪 Backend Test Series APIs

This project is a backend API service for managing online test series. It provides RESTful APIs for admins to manage tests, questions, and results, and for learners to take tests and view scores. Built with **Node.js**, **Express**, and **MongoDB**, the architecture follows clean code principles with modular organization.

---

## 📁 Project Structure

src/
├── config/ # Environment config and database setup
├── controllers/ # Business logic for routes
├── middlewares/ # Auth, error handling, and logging middleware
├── models/ # Mongoose schemas for Users, Tests, Results, etc.
├── routes/ # Express route definitions
├── services/ # Helper services (email, score calculation, etc.)
├── uploads/ # File upload directory
├── utils/ # Utility functions
└── server.js # Entry point

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/backend-test-series-apis.git
cd backend-test-series-apis
```

### 2. Install dependencies

npm install

### 3. Set up env

PORT=5000
MONGO_URI=mongodb://localhost:27017/testseries
JWT_SECRET=your_jwt_secret

### 4. Run the app

# Start in development

npm run dev

# Start in production

npm start

📌 Features
✅ User Authentication with JWT

🧠 Skill-based tagging and performance scoring

🔐 Role-based access for Admin and Learner

📊 Test result calculation and analytics

📁 Bulk upload via CSV (for questions)

🔄 Attempt limit, random shuffle, and skill score integration

We have also managed login feature on the basis of role of a user
if role is instructor we must redirect to admin related api's
else redirected to learner dashboard
