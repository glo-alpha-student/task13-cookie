'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplete = document.querySelector('.todo-completed');

let todoData = [];

const myNineHours = function () {

    todoData = JSON.parse(localStorage.getItem('todoData'));

    render();
};
const render = function () {

    todoList.innerHTML = '';
    todoComplete.innerHTML = '';

    if (todoData.value === '') {
        return false;
    }

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed) {
            todoComplete.append(li);
        } else {

            todoList.append(li);
        }
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });
        li.querySelector('.todo-remove').addEventListener('click', function () {

            todoData.splice(0, 1);

            li.remove();
            render();
        });
    });


    localStorage.setItem('todoData', JSON.stringify(todoData));

};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();


    if (headerInput.value === '') {
        return false;
    }
    const newToDo = {
        text: headerInput.value,
        completed: false
    };


    todoData.push(newToDo);
    headerInput.value = '';


    render();
});

myNineHours();