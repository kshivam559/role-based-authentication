# Role-Based User Management App

> A full-stack Node.js, Express, and MySQL application with a simple HTML/JS frontend for role-based user management (admin/student). Features include registration, login, JWT authentication, user CRUD, email support, and password change.

## Features
- User registration (student) with email
- Admin dashboard: view, create, and delete users
- Change password (for both admin and student)
- JWT-based authentication and role-based access
- MySQL database with users table

## Setup Instructions

### 1. Database Setup

Run the following SQL in your MySQL shell to create the users table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'student') NOT NULL
);
```

If you are migrating an existing table, use:
```sql
ALTER TABLE users ADD COLUMN email VARCHAR(255) AFTER username;
UPDATE users SET email = CONCAT(username, '@example.com') WHERE email IS NULL OR email = '';
ALTER TABLE users MODIFY COLUMN email VARCHAR(255) UNIQUE NOT NULL;
```

### 2. Environment Variables

Create a `.env` file in the project root:
```
DB_HOST=127.0.0.1
DB_PORT=YOUR_MYSQL_PORT
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=role_based
DB_SOCKET=YOUR_MYSQL_SOCKET_PATH # (if using LocalWP or socket)
JWT_SECRET=your_super_secret_key
```

### 3. Install Dependencies

```
npm install
```

### 4. Run the App

Start the backend:
```
node backend/app.js
```

Start the frontend:
```
npx serve frontend -l 5000
```

Or use the VS Code tasks: "Run Backend Server" and "Run Frontend".

### 5. Usage

- Open [http://localhost:5000](http://localhost:5000) in your browser.
- Register as a student or login as admin (default admin: `admin` / `admin123`).
- Admin can create/delete users and see all users with emails.
- All users can change their password.

## File Structure

- `backend/` - Express backend, routes, DB config, seed script
- `frontend/` - HTML, JS, and CSS for UI
- `.env` - Environment variables
- `backend/schema.db` - DB schema

## Notes
- The default admin user is created automatically if not present and cannot be deleted.
- All API responses are JSON.
- Make sure your MySQL server is running and accessible.

---
