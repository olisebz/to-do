// To-Do List

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const errorElement = document.getElementById('container-error');

// Event Listeners
document.getElementById('todo-button').addEventListener('click', addTodo);
document.getElementById('todo-clear').addEventListener('click', clearAll);
document.getElementById('todo-checkall').addEventListener('click', checkAll);
document.getElementById('todo-entcheck').addEventListener('click', uncheckAll);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Load on start
loadTodos();

function addTodo() {
  const text = todoInput.value.trim();
  
  if (!text) {
    errorElement.textContent = 'Please enter a task!';
    return;
  }
  
  createTodoItem(text, false);
  saveTodos();
  todoInput.value = '';
  errorElement.textContent = '';
}

function createTodoItem(text, done) {
  const li = document.createElement('li');
  li.className = 'todo-li';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = done;
  checkbox.addEventListener('change', () => {
    span.classList.toggle('todo-done', checkbox.checked);
    saveTodos();
  });
  
  const span = document.createElement('span');
  span.className = 'todo-text' + (done ? ' todo-done' : '');
  span.textContent = text;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '×';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTodos();
    showEmpty();
  });
  
  li.append(checkbox, span, deleteBtn);
  todoList.appendChild(li);
  showEmpty();
}

function clearAll() {
  if (todoList.querySelectorAll('.todo-li').length > 0) {
    todoList.innerHTML = '';
    saveTodos();
    showEmpty();
  }
}

function checkAll() {
  todoList.querySelectorAll('.todo-li').forEach(li => {
    li.querySelector('input').checked = true;
    li.querySelector('span').classList.add('todo-done');
  });
  saveTodos();
}

function uncheckAll() {
  todoList.querySelectorAll('.todo-li').forEach(li => {
    li.querySelector('input').checked = false;
    li.querySelector('span').classList.remove('todo-done');
  });
  saveTodos();
}

function saveTodos() {
  const todos = [];
  todoList.querySelectorAll('.todo-li').forEach(li => {
    todos.push({
      text: li.querySelector('span').textContent,
      done: li.querySelector('input').checked
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.forEach(t => createTodoItem(t.text, t.done));
  showEmpty();
}

function showEmpty() {
  const empty = todoList.querySelector('.empty-message');
  const hasTodos = todoList.querySelectorAll('.todo-li').length > 0;
  
  if (!hasTodos && !empty) {
    const msg = document.createElement('div');
    msg.className = 'empty-message';
    msg.textContent = 'No tasks';
    todoList.appendChild(msg);
  } else if (hasTodos && empty) {
    empty.remove();
  }
}