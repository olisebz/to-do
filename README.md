# To-Do List

**[Live Demo](https://olisebz.github.io/ToDo/)**

## Description

A modern, feature-rich to-do list application built to help you stay organized. It allows you to add tasks with categories and due dates, track your progress, and manages everything with a clean, responsive interface. Built with semantic HTML, modern CSS, and vanilla JavaScript.

## Features

- **Categorize Tasks**: Organize tasks by category (Personal, Work, School, etc.)
- **Bigger Input Area**: Multi-line text support for detailed task descriptions
- **Due Dates**: Set due dates for tasks with smart highlighting:
    - 🟢 Today
    - 🔴 Overdue
    - ⚪ Future dates
    - Automatic year display
- **Task Management**:
    - Add new tasks quickly
    - Mark tasks as complete
    - Delete individual tasks
    - "Check all" / "Reset" batch actions
    - "Clear completed" to tidy up your list
- **Tasks Counter**: See how many active tasks you have left
- **Date Header**: Always see the current date at the top
- **LocalStorage Persistence**: Your tasks are saved automatically and persist between reloads.
- **Responsiveness**: Works perfectly on desktop and mobile devices.

## Files

- `index.html`: Structure of the app using semantic HTML5 tags.
- `style.css`: Modern styling with CSS variables, flexbox, and animations.
- `script.js`: App logic handling state, events, and data storage.

## Technology Stack

- **HTML5** (Semantic)
- **CSS3** (Variables, Transitions, Flexbox)
- **JavaScript** (ES6+, LocalStorage)


## How It Works

### Data Structure

Tasks are stored in browser's LocalStorage as an array of objects:

```json
[
  { 
    "text": "Project Deadline", 
    "done": false, 
    "category": "Work",
    "dueDate": "2026-11-25" 
  }
]
```

### Key Functions

- `addTodo()`: Creates a new task with category and optional due date.
- `updateDate()`: Displays the current full date in the header.
- `updateStats()`: Updates the "X tasks left" counter.
- `createTodoItem()`: Generates the DOM elements with smart date formatting.

## Usage

1. **Add a Task**: Type your task name.
2. **Select Category**: Choose a category (defaults to **Other**).
3. **Set Due Date**: Optionally pick a date.
4. **Hit Enter**: Or click the + button to add.

## Deployment

Deployed via [GitHub Pages](https://pages.github.com/). To run locally, simply open `index.html` in your browser.
