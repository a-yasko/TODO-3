export async function app(owner, title) {
    let { createTodoApp } = await import('./view.js');
    let {
        getTodoListApi,
        createTodoItemApi,
        switchTodoItemDoneApi,
        deleteTodoItemApi
    } = await import('./api.js');
    let {
        getTodoListLocalStorage,
        createTodoItemLocalStorage,
        switchTodoItemDoneLocalStorage,
        deleteTodoItemLocalStorage
    } = await import('./local-storage.js');
    let { 
        setTypeApi,
        setTypeLocalStorage,
        getTypeStorage
    } = await import('./switch-type.js');

    const btnSwitch = document.querySelector('#btn-switch .btn');

    const typeStorage = getTypeStorage();
    if (typeStorage) {
        if (typeStorage.type === 'api') {
            api();
            btnSwitch.textContent = 'Перейти на локальное хранилище';
        } else {
            localStorage();
            btnSwitch.textContent = 'Перейти на серверное хранилище';
        }
    } else {
        localStorage();
        btnSwitch.textContent = 'Перейти на серверное хранилище';
    }

    async function api() {
        const todoItemList = await getTodoListApi(owner);
        createTodoApp(document.getElementById('todo-app'), {
            title: title, 
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
            title: title, 
            owner, 
            todoItemList,
            onCreateFormSubmit: createTodoItemLocalStorage,
            onDoneClick: switchTodoItemDoneLocalStorage,
            onDeleteClick: deleteTodoItemLocalStorage
        });
    }

    btnSwitch.addEventListener('click', () => {
        if (btnSwitch.textContent === 'Перейти на серверное хранилище') {
            document.getElementById('todo-app').textContent = '';
            api();
            btnSwitch.textContent = 'Перейти на локальное хранилище';
            setTypeApi();
        } else {
            document.getElementById('todo-app').textContent = '';
            localStorage();
            btnSwitch.textContent = 'Перейти на серверное хранилище';
            setTypeLocalStorage();
        }
    });
}