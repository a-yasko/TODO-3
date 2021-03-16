// import { createTodoApp } from './todo-app/view.js';
import {
    getTodoList as getTodoListApi,
    createTodoItem as createTodoItemApi,
    switchTodoItemDone as switchTodoItemDoneApi,
    deleteTodoItem as deleteTodoItemApi
} from './todo-app/api.js';

import {
    getTodoList as getTodoListLocalStorage,
    createTodoItem as createTodoItemLocalStorage,
    switchTodoItemDone as switchTodoItemDoneLocalStorage,
    deleteTodoItem as deleteTodoItemLocalStorage
} from './todo-app/local-storage.js';

(async () => {
    let { createTodoApp } = await import('./todo-app/view.js');
    // let { owner } = await import('./index.html');
    const btnSwitch = document.querySelector('#btn-switch .btn');

    async function api() {
        const todoItemList = await getTodoListApi(owner);
        createTodoApp(document.getElementById('todo-app'), {
            title: 'Мои дела', 
            owner, 
            todoItemList,
            onCreateFormSubmit: createTodoItemApi,
            onDoneClick: switchTodoItemDoneApi,
            onDeleteClick: deleteTodoItemApi
        });
    }

    function localStorage() {
        const todoItemList = getTodoListLocalStorage(owner);
        createTodoApp(document.getElementById('todo-app'), {
            title: 'Мои дела', 
            owner, 
            todoItemList,
            onCreateFormSubmit: createTodoItemLocalStorage,
            onDoneClick: switchTodoItemDoneLocalStorage,
            onDeleteClick: deleteTodoItemLocalStorage
        });
    }

    localStorage();

    btnSwitch.addEventListener('click', () => {
        if (btnSwitch.textContent === 'Перейти на серверное хранилище') {
            document.getElementById('todo-app').textContent = '';
            api();
            btnSwitch.textContent = 'Перейти на локальное хранилище';
        } else {
            document.getElementById('todo-app').textContent = '';
            localStorage();
            btnSwitch.textContent = 'Перейти на серверное хранилище';
        }
    });
})();