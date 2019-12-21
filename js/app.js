"use strict";

var input = document.querySelector('.input'),
    ul = document.querySelector('.text-value'),
    btnReset = document.querySelector('.reset'),
    savebtn = document.querySelector('.save-btn'),
    addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', function (key) {
  if (input.value != '') {
    generateToDo();
  }
});
input.addEventListener('keydown', function (key) {
  var keyBtn = key.code;

  if (keyBtn == 'Enter' && input.value != '' || keyBtn == 'actionGo') {
    generateToDo();
  }
});

function generateToDo() {
  var li = document.createElement('li'),
      span = document.createElement('span'),
      close = document.createElement('button');
  li.classList.add('todo-items');
  close.classList.add('btn-close');
  span.classList.add('todo-text');
  ul.appendChild(li).append(span, close);
  span.textContent = input.value;
  input.value = '';
  resetBtn(li);
  deleteItem(close);
  crossItem(span);
}

function deleteItem(e) {
  e.addEventListener('click', function (event) {
    e.parentElement.remove();
  });
}

function crossItem(e) {
  e.addEventListener('click', function () {
    if (e.style.textDecoration == '') {
      e.style.textDecoration = 'line-through';
    } else {
      e.style.textDecoration = '';
    }
  });
}

function resetBtn(item) {
  btnReset.addEventListener('click', function () {
    if (item) {
      ul.innerHTML = '';
      localStorage.removeItem('todos', ul.innerHTML);
    }
  });
}

function saveList() {
  savebtn.addEventListener('click', function () {
    localStorage.setItem('todos', ul.innerHTML);
  });
}

function loadTodo() {
  var arr = localStorage.getItem('todos');

  if (arr) {
    ul.innerHTML = arr;
  } else {
    ul.innerHTML = '';
  }

  var deleteButtons = document.querySelectorAll("button.btn-close");
  deleteButtons.forEach(function (btn) {
    deleteItem(btn);
  });
  var spanAll = document.querySelectorAll(".todo-text");
  spanAll.forEach(function (items) {
    crossItem(items);
  });
  var liall = document.querySelector('li');
  resetBtn(liall);
}

loadTodo();
saveList();