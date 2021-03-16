
// создаем и возвращаем заголовок приложения
function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}

// создаем и возвращаем форму для создания дела
function createTodoItemForm() {
    const form = document.createElement('form'),
            input = document.createElement('input'),
            buttonWrapper = document.createElement('div'),
            button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button
    };
}

// создаем и возвращаем список элементов
function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItemElement( todoItem, { onDone, onDelete} ) {
    const doneClass = 'list-group-item-success';

    const item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    const buttonGroup = document.createElement('div'),
            doneButton = document.createElement('button'),
            deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (todoItem) {
        if (todoItem.done) {
            item.classList.add(doneClass);
        }
    }
    item.textContent = todoItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // добавляем обработчики на кнопки
    doneButton.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle(doneClass);
        onDone({ todoItem, element: item });
    });
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        onDelete({ todoItem, element: item });
    });

    // вкладываем кнопки в отдельный элемент, чтобы они объеденились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item;
}

async function createTodoApp(container, {
    title, 
    owner,
    todoItemList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick
}) {
    const todoAppTitile = createAppTitle(title),
          todoItemForm = createTodoItemForm(),
          todoList = createTodoList(),
          handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

    container.append(todoAppTitile);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (todoItemList) {
        todoItemList.forEach(todoItem => {
            const todoItemElement = createTodoItemElement(todoItem, handlers);
            todoList.append(todoItemElement);
        });
    }

    // браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', async e => {
        // эта строчка необходима, чтобы предотвратить стандартное действие браузера
        // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
        e.preventDefault();

        // игнорируем создание элемента, если пользователь ничего не ввел в поле
        if (!todoItemForm.input.value) {
            return;
        }

        const todoItem = await onCreateFormSubmit({
            owner,
            name: todoItemForm.input.value.trim()
        });

        const todoItemElement = createTodoItemElement(todoItem, handlers);

        // создаем и добавляем в список новое дело с названием из поля для ввода
        todoList.append(todoItemElement);

        // обнуляем значение в поле, чтобы не пришлось стирать его вручную
        todoItemForm.input.value = '';
    });
}

export { createTodoApp };