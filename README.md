# To-Do List

**[Live Demo](https://olisebz.github.io/to-do/)**

## Description

A simple and clean to-do list application that allows you to add, delete, and manage tasks. Features include marking tasks as complete, batch operations for all tasks, and automatic data persistence. Built with HTML, CSS, and vanilla JavaScript.

## Features

- Add new tasks (press Enter or click the + button)
- Mark tasks as complete with checkboxes
- Delete individual tasks
- Mark all tasks as complete at once
- Reset all tasks to incomplete
- Clear all tasks
- **LocalStorage persistence** - tasks are saved automatically
- Clean, minimalist design
- Responsive layout

## Files

- `index.html`: HTML structure of the to-do list
- `style.css`: Styling and layout
- `script.js`: Application logic and LocalStorage handling

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with flexbox
- **JavaScript (ES6+)** - Event handling and data persistence
- **LocalStorage API** - Client-side data storage

## How It Works

### Data Persistence

Tasks are saved in your browser's LocalStorage in JSON format:

```json
[
  { "text": "Buy groceries", "done": false },
  { "text": "Walk the dog", "done": true }
]
```

The `saveTodos()` function automatically saves after every change (add, delete, check, uncheck), and `loadTodos()` retrieves them when the page loads.

### Key Functions

- `addTodo()`: Adds a new task to the list
- `createTodoItem()`: Creates the DOM elements for each task
- `saveTodos()`: Saves all tasks to LocalStorage
- `loadTodos()`: Loads tasks from LocalStorage on page load
- `checkAll()` / `uncheckAll()`: Batch operations for all tasks
- `clearAll()`: Removes all tasks from the list
- `showEmpty()`: Displays "No tasks" message when list is empty

## Installation & Usage

### Try it online

Visit the [live demo](https://olisebz.github.io/to-do/) - no installation needed!

### Run locally

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process or dependencies required!

## Deployment

Deployed via [GitHub Pages](https://pages.github.com/)
