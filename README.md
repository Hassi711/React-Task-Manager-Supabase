# Task Manager App with Supabase (CRUD Operations)

This is a simple **Task Manager App** built using **React** and **Supabase**.  
It demonstrates **CRUD operations** (Create, Read, Update, Delete) using Supabase as a **BaaS (Backend as a Service)**.

---

## Features
- Add a new task (title and description)  
- Edit task description  
- Delete a task  
- View all tasks in a table  
- Live updates without page reload  

This project helps you get familiar with:
- Supabase client integration in React  
- Handling state with React hooks (`useState`, `useEffect`)  
- Performing CRUD operations with Supabase  
- Using environment variables safely  

---

## Prerequisites
- Node.js installed (v16+)  
- npm or yarn installed  
- A Supabase project with a table named `task_manager`  

Your `task_manager` table should have the following columns:
- `id` (integer, primary key, auto-increment)  
- `title` (text)  
- `description` (text)  

---

## Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <your-repo-folder>

npm install
# or
yarn install

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

npm run dev
# or
yarn dev
