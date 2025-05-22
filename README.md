# Cadre Frontend

Cadre is a project management system designed to streamline team collaboration, project tracking, timesheet management, and communication. This repository contains the frontend module, built with React, Redux, and Vite, providing a modern, responsive, and interactive user interface.

> **Note:** This is the frontend part of the project. The backend is available at [Cadre Backend](https://github.com/brijrajparmar27/Cadre-Backend).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Setup & Installation](#setup--installation)
- [Available Scripts](#available-scripts)
- [Key Components & Pages](#key-components--pages)
- [State Management](#state-management)
- [Custom Hooks](#custom-hooks)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Login and registration with role-based access (Sr Developer, Jr Developer, Admin).
- **Dashboard**: Central hub for accessing all project management features.
- **Project Management**: Create, view, edit, and manage projects and tasks.
- **Task Tracking**: Organize tasks by status (Pending, Running, Completed, Closed) and assign to team members.
- **Timesheet Management**: Log work hours, view timesheets by date, and track project contributions.
- **Team Collaboration**: Real-time chat (group and direct), typing indicators, and message history.
- **User Management**: Admins can view and manage all users.
- **Settings**: Update user profile, including avatar and contact information.
- **Responsive UI**: Modern, animated, and mobile-friendly interface.

---

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit, Redux Persist
- **Routing**: React Router DOM v6
- **UI/UX**: Framer Motion, Lottie, React Icons, React Select, React Toastify, SweetAlert2
- **Networking**: Axios
- **Real-time Communication**: Socket.io-client
- **Utilities**: Moment.js, Browser Image Compression
- **Build Tool**: Vite

---

## Project Structure

```
src/
  ├── App.jsx                # Main app component, routing setup
  ├── main.jsx               # Entry point, Redux and Persist setup
  ├── index.css, App.css     # Global styles
  ├── Pages/
  │    ├── Auth/             # Authentication (login/signup)
  │    ├── Dashboard/        # Main dashboard and subroutes
  │    │    ├── SubRoutes/   # Features: Projects, Project, Tasks, Timesheets, Chat, Settings, Admin
  │    │    ├── Components/  # Dashboard-specific UI components
  │    ├── redux/            # Redux slices and root reducer
  │    ├── axios/            # Axios instance/config
  ├── UniversalComponents/   # Reusable UI components (Loading, Empty states)
  ├── Hooks/                 # Custom React hooks for business logic
  └── assets/                # Images, Lottie animations, etc.
```

---

## Core Concepts

### Authentication

- Users can sign up or log in.
- Role selection during signup (Sr Developer, Jr Developer).
- Auth state is persisted using Redux Persist.

### Dashboard

- Sidebar navigation to all main features.
- Content area displays the selected feature (Projects, Timesheets, Chat, etc.).

### Project & Task Management

- List all projects, filter/sort/search, and create new projects (role-based).
- View project details, including members, stack, deadlines, and tasks.
- Tasks are categorized by status and can be assigned to users.

### Timesheets

- Calendar-based timesheet entry and viewing.
- Log hours worked on projects, with status tracking (completed/running).

### Chat

- Real-time messaging with Socket.io.
- Group and direct chat, typing indicators, and chat history.

### User Management & Settings

- Admins can view all users.
- Users can update their profile and avatar.

---

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd Cadre-Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values (API endpoints, etc.).

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## Available Scripts

- `npm run dev` – Start the development server (Vite).
- `npm run build` – Build the app for production.
- `npm run preview` – Preview the production build.

---

## Key Components & Pages

- **`App.jsx`**: Sets up routing and authentication guards.
- **`Dashboard.jsx`**: Main layout with sidebar and content area.
- **`Projects.jsx`**: List, search, sort, and create projects.
- **`Project.jsx` / `Details.jsx`**: View and manage a single project and its tasks.
- **`TimeSheets.jsx`**: Calendar and timesheet entry.
- **`Chat.jsx`**: Real-time chat interface.
- **`Settings.jsx`**: User profile management.
- **`AllUsers.jsx`**: Admin user management.

---

## State Management

- **Redux Toolkit** is used for global state (user data, project data, etc.).
- **Redux Persist** ensures state is saved across sessions.
- **Slices**: `logindataslice`, `projectDataSlice`, etc.

---

## Custom Hooks

- `useAuth` – Handles login, signup, and auth state.
- `useProject` – Project CRUD and filtering logic.
- `useTask` – Task management.
- `useTimeSheet` – Timesheet data fetching and submission.
- `useChat` / `useMessage` – Chat and messaging logic.
- `useUserCollection` – User profile and avatar updates.

---

## Environment Variables

Create a `.env` file in the root with the following (example):

```
VITE_BASEURL=https://your-backend-api
VITE_SERVER=https://your-backend-api
VITE_STACK=https://your-stack-assets
```

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

**For more details, refer to the codebase and comments within each component.**
