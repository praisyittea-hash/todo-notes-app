# Web Development - Week 04 Minor Project
## To-Do App + Notes App in React

This repository contains my Week 04 Minor Project built using React.js. The application includes two core tools: a **To-Do App** for task management and a **Notes App** for taking and organizing notes.

---

## Features

### 1. To-Do App
- **Add Tasks**: Add new tasks with a task name and optional due date.
- **Mark Completed / Pending**: Checkbox toggle that updates the task status and strikethrough.
- **Delete Tasks**: Delete unwanted tasks.
- **Edit Tasks**: Update the name and due date of existing tasks.
- **Task Status Badges**: Displays `Completed` or `Pending` status.
- **Task Filtering**: Filter tasks by `All`, `Pending`, or `Completed`.
- **Due Dates**: Shows the due date for each task.
- **Local Storage**: Automatically saves tasks to the browser so data is not lost on reload.

### 2. Notes App
- **Create Notes**: Add notes with a title, category, and text content.
- **Edit Notes**: Modify existing notes.
- **Delete Notes**: Remove notes from the grid.
- **Organized Grid Layout**: Notes are displayed in a clean card grid.
- **Search Notes**: Search notes dynamically by title or content keywords.
- **Categorize Notes**: Filter notes by categories (`Study`, `Work`, `Personal`, `Ideas`).
- **Note Timestamps**: Shows the date and time when the note was created or updated.
- **Local Storage**: Keeps notes saved in the browser.

---

## React & JavaScript Concepts Used

- **Functional Components**: Component-based structure with reusable child components (`TodoItem`, `NoteItem`, `Navbar`).
- **Props**: Passing data and callback functions between parent and child components.
- **useState**: Managing input values, lists, edit states, and active tabs.
- **useEffect**: Synchronizing tasks and notes with `localStorage`.
- **Event Handling**: `onSubmit`, `onClick`, and `onChange` events.
- **Conditional Rendering**: Toggling between To-Do and Notes tabs, and switching between Add/Update buttons.
- **List Rendering**: Rendering arrays of tasks and notes using `.map()` with unique keys.
- **ES6+ JavaScript**: Arrow functions, template literals, destructuring, spread operators, and array methods (`.filter()`, `.map()`).

---

## Project Structure

```
todo-notes-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TodoApp.jsx
│   │   ├── TodoItem.jsx
│   │   ├── NotesApp.jsx
│   │   └── NoteItem.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## How to Run the Project

1. Open your terminal in the project directory:
   ```bash
   cd todo-notes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the browser link (usually `http://localhost:5173`) to view the application.
