# 📌 Mini Kanban Board - Full-Stack Task Management Application

A modern, high-performance, full-stack **Mini Kanban Board** application built with **Next.js (App Router)** and **Express.js (Prisma 7 & Neon PostgreSQL)** featuring real-time drag-and-drop task management powered by **Fractional Indexing**.

---

## ✨ Features

- 🔐 **JWT Authentication & RBAC**: Secure user registration, login, token refresh, and Role-Based Access Control (`ADMIN` vs `USER`).
- ⚡ **O(1) Fractional Indexing Drag-and-Drop**: Drag tasks and columns with instant database position updates calculated using $(P_1 + P_2) / 2$, avoiding costly $O(N)$ row re-indexing.
- 📋 **Board & Column Management**: Create custom boards, add columns, update tasks, and manage board memberships (`OWNER`, `COLLABORATOR`, `VIEWER`).
- 🛡️ **Next.js Proxy Middleware**: Seamless route protection and server-side authentication redirecting users based on access tokens and roles.
- 🌱 **Automatic Database Seeding**: Server boot auto-seeder (`autoSeed`) populates default Admin and User credentials automatically.
- 🎨 **Modern Dark UI**: Clean, responsive, and glassmorphic UI styled with Tailwind CSS, Lucide Icons, and Sonner notifications.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js (App Router, React 19)
- **Styling**: Tailwind CSS & Shadcn UI-inspired components
- **Drag and Drop**: `@hello-pangea/dnd`
- **State & Server Actions**: React Hook Form, Server Actions (`"use server"`), `sonner` toasts, `js-cookie`

### **Backend**
- **Runtime & Framework**: Node.js, Express.js (TypeScript)
- **ORM & Database**: Prisma 7 (Multi-File Schema), Neon PostgreSQL (Serverless)
- **Security**: JWT (`jsonwebtoken`), bcrypt password hashing, `cookie-parser`, `cors`

---

## 🚀 Live Demo & API Endpoints

- **Live Backend API**: `https://kanban-backend-umber.vercel.app/api`
- **Live Frontend**: `https://mini-kanban-frontend.vercel.app` *(or your Vercel URL)*

---

## 🔑 Default Credentials (Auto-Seeded)

When the backend boots up, it automatically seeds these accounts if they do not exist:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@example.com` | `123456` |
| **User** | `user@example.com` | `123456` |

---

## ⚙️ Environment Variables

### **Backend (`backend/.env`)**
```env
PORT=5000
NODE_ENV=production
DATABASE_URL="postgresql://user:password@ep-cool-db.neon.tech/neondb?sslmode=require"
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET="your_jwt_access_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
JWT_ACCESS_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
APP_URL="https://kanban-backend-umber.vercel.app"
```

### **Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_API_URL="https://kanban-backend-umber.vercel.app/api"
```

---

## 🛠️ Local Installation & Setup

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/mini-kanban.git
cd mini-kanban
```

### **2. Setup Backend**
```bash
cd backend
npm install
npx prisma db push
npm run dev
```

### **3. Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
mini-kanban/
├── backend/
│   ├── prisma/
│   │   ├── schema/           # Prisma 7 Multi-File Schemas (user, board, task, etc.)
│   │   └── seed.ts           # Database Seed Script
│   └── src/
│       ├── module/           # Auth, Board, Column, Task, BoardShare modules
│       ├── middleware/       # JWT Auth & Error Handling
│       ├── utils/            # autoSeed & helper utilities
│       ├── app.ts            # Express app configuration & route mounting
│       └── server.ts         # Server boot script
└── frontend/
    └── app/
        ├── (authGroup)/      # Login, Register & Auth Server Actions
        ├── (kanbanGroup)/    # Dashboard, Kanban Board & Board Management
        └── (publicGroup)/    # Landing Page
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
