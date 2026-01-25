// To-Do Logic
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const todoInput = document.getElementById('todo-input');
  const todoCategory = document.getElementById('todo-category');
  const todoDate = document.getElementById('todo-date');
  const todoButton = document.getElementById('todo-button');
  const todoList = document.getElementById('todo-list');
  const errorElement = document.getElementById('container-error');
  const tasksLeftElement = document.getElementById('tasks-left');
  const dateDisplay = document.getElementById('date-display');

  // Initialize
  loadTodos();
  updateDate();

  // Event Listeners
  todoButton.addEventListener('click', addTodo);
  document.getElementById('todo-clear').addEventListener('click', clearCompleted);
  document.getElementById('todo-checkall').addEventListener('click', checkAll);
  document.getElementById('todo-entcheck').addEventListener('click', uncheckAll);

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });

  // Functions
  function updateDate() {
    // This uses the browser's local time zone automatically
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateDisplay.textContent = today.toLocaleDateString('en-US', options);
  }

  function addTodo() {
    const text = todoInput.value.trim();
    // Default to 'Other' if no category is selected
    const category = todoCategory.value || 'Other';
    const dueDate = todoDate.value;

    if (!text) {
      showError('Please enter a task!');
      return;
    }

    createTodoItem(text, false, dueDate, category);
    saveTodos();
    updateStats();

    todoInput.value = '';
    todoDate.value = '';
    todoCategory.value = 'Other'; // Reset to default
    showError(''); // Clear error
    todoInput.focus();
  }

  function showError(msg) {
    errorElement.textContent = msg;
    if (msg) {
      setTimeout(() => {
        errorElement.textContent = '';
      }, 3000);
    }
  }

  function createTodoItem(text, done, dueDate, category = 'Other') {
    const li = document.createElement('li');
    li.className = 'todo-li';

    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'checkbox-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = done;
    checkbox.addEventListener('change', () => {
      textContainer.classList.toggle('todo-done', checkbox.checked);
      saveTodos();
      updateStats();
    });

    checkboxWrapper.appendChild(checkbox);

    const textContainer = document.createElement('div');
    textContainer.className = 'todo-text' + (done ? ' todo-done' : '');

    // Header row with Name + Category
    const headerRow = document.createElement('div');
    headerRow.className = 'todo-header-row';

    const taskName = document.createElement('div');
    taskName.className = 'todo-task-name';
    taskName.textContent = text;

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = category;

    headerRow.append(taskName, categoryBadge);
    textContainer.appendChild(headerRow);

    if (dueDate) {
      const dueDateElement = document.createElement('div');
      dueDateElement.className = 'todo-due-date';

      const dateObj = new Date(dueDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric' // Always show year as requested
      });

      if (dateObj < today) {
        dueDateElement.classList.add('overdue');
        dueDateElement.textContent = `Due: ${formattedDate} (Overdue)`;
      } else if (dateObj.getTime() === today.getTime()) {
        dueDateElement.classList.add('today');
        dueDateElement.textContent = `Due: Today`;
      } else {
        dueDateElement.textContent = `Due: ${formattedDate}`;
      }

      textContainer.appendChild(dueDateElement);
      li.dataset.dueDate = dueDate;
    }
    li.dataset.category = category;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    deleteBtn.ariaLabel = 'Delete task';
    deleteBtn.addEventListener('click', () => {
      li.classList.add('removing');
      li.addEventListener('animationend', () => {
        li.remove();
        saveTodos();
        updateStats();
        showEmpty();
      });
    });

    li.append(checkboxWrapper, textContainer, deleteBtn);
    todoList.appendChild(li);
    showEmpty();
  }

  function clearCompleted() {
    const completed = todoList.querySelectorAll('.todo-li input:checked');
    if (completed.length === 0) return;

    completed.forEach(checkbox => {
      const li = checkbox.closest('.li, .todo-li');
      li.classList.add('removing');
      li.addEventListener('animationend', () => {
        li.remove();
        saveTodos(); // Save after each removal or batch save at end
        updateStats();
        showEmpty();
      });
    });

    // Fallback save in case animation fails or multiple firing
    setTimeout(() => {
      saveTodos();
      updateStats();
      showEmpty();
    }, 350);
  }

  function checkAll() {
    const items = todoList.querySelectorAll('.todo-li');
    let changed = false;
    items.forEach(li => {
      const checkbox = li.querySelector('input');
      const textDiv = li.querySelector('.todo-text');
      if (!checkbox.checked) {
        checkbox.checked = true;
        textDiv.classList.add('todo-done');
        changed = true;
      }
    });
    if (changed) {
      saveTodos();
      updateStats();
    }
  }

  function uncheckAll() {
    const items = todoList.querySelectorAll('.todo-li');
    let changed = false;
    items.forEach(li => {
      const checkbox = li.querySelector('input');
      const textDiv = li.querySelector('.todo-text');
      if (checkbox.checked) {
        checkbox.checked = false;
        textDiv.classList.remove('todo-done');
        changed = true;
      }
    });
    if (changed) {
      saveTodos();
      updateStats();
    }
  }

  function updateStats() {
    const total = todoList.querySelectorAll('.todo-li').length;
    const completed = todoList.querySelectorAll('.todo-li input:checked').length;
    const left = total - completed;

    tasksLeftElement.textContent = `${left} task${left !== 1 ? 's' : ''} left`;
  }

  function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('.todo-li').forEach(li => {
      const textContainer = li.querySelector('.todo-text');
      const taskName = textContainer.querySelector('.todo-task-name');
      // We grab category from data attribute to always rely on source of truth
      todos.push({
        text: taskName.textContent,
        done: li.querySelector('input').checked,
        dueDate: li.dataset.dueDate || null,
        category: li.dataset.category || 'Other'
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todoList.innerHTML = ''; // Start fresh
    todos.forEach(t => createTodoItem(t.text, t.done, t.dueDate, t.category));
    updateStats();
    showEmpty();
  }

  function showEmpty() {
    const empty = todoList.querySelector('.empty-message');
    const hasTodos = todoList.querySelectorAll('.todo-li').length > 0;

    if (!hasTodos && !empty) {
      const msg = document.createElement('div');
      msg.className = 'empty-message';
      msg.textContent = 'No tasks yet. Add one above!';
      todoList.appendChild(msg);
    } else if (hasTodos && empty) {
      empty.remove();
    }
  }
});