// script.js

document.getElementById('todo-button').addEventListener('click', clickTodoButton);
document.getElementById('todo-clear').addEventListener('click', clickTodoClear);
document.getElementById('todo-checkall').addEventListener('click', clickTodoCheckAll);
document.getElementById('todo-entcheck').addEventListener('click', clickTodoEntCheck);

function clickTodoButton() {
  let todoInput = document.getElementById('todo-input');
  let errorElement = document.getElementById('container-error');
  if (todoInput.value.length > 0) {
    let todoList = document.getElementById('todo-list');
    let todoEntry = document.createElement('li');
    let todoParagraph = document.createElement('span');
    todoParagraph.textContent = todoInput.value;
    let todoDeleteBtn = document.createElement('button');
    let todoCheckbox = document.createElement('input');
    todoDeleteBtn.addEventListener('click', function() {
      todoList.removeChild(todoEntry);
    });
    todoCheckbox.addEventListener('change', function() {
      if (todoCheckbox.checked) {
        todoParagraph.classList.add('todo-done');
      } else {
        todoParagraph.classList.remove('todo-done');
      }
    });
    todoDeleteBtn.textContent = 'Löschen';
    todoCheckbox.type = 'checkbox';
    todoEntry.appendChild(todoCheckbox);
    todoEntry.appendChild(todoParagraph);
    todoEntry.appendChild(todoDeleteBtn);
    todoList.appendChild(todoEntry);
    todoInput.value = '';
    errorElement.textContent = '';
  } else {
    errorElement.textContent = 'Bitte geben Sie einen Wert ein!';
  }
}

function clickTodoClear() {
  let todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
}

function clickTodoCheckAll() {
  let todoListItems = document.querySelectorAll('#todo-list li');

  todoListItems.forEach(function(item) {
    let checkbox = item.querySelector('input[type="checkbox"]');
    let paragraph = item.querySelector('span');

    if (checkbox && paragraph) {
      checkbox.checked = true;
      paragraph.classList.add('todo-done');
    }
  });
}

function clickTodoEntCheck() {
  let todoListItems = document.querySelectorAll('#todo-list li');

  todoListItems.forEach(function(item) {
    let checkbox = item.querySelector('input[type="checkbox"]');
    let paragraph = item.querySelector('span');

    if (checkbox && paragraph) {
      checkbox.checked = false;
      paragraph.classList.remove('todo-done');
    }
  });
}