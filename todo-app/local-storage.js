let arr = [];

export function getTodoListLocalStorage(owner) {
    arr = JSON.parse(localStorage.getItem(owner));
    return arr;
}

export function createTodoItemLocalStorage({ name, owner }) {
    if (arr) {
        arr = JSON.parse(localStorage.getItem(owner));
    } else {
        arr = [];
    }
    let obj = {
        name, 
        owner, 
        done: false
    };
    arr.push({ name, owner, done: false });
    localStorage.setItem(owner, JSON.stringify(arr));

    return obj;
}

export async function switchTodoItemDoneLocalStorage({ todoItem }) {
    const listGroup = document.querySelectorAll('.list-group li');
    arr = [];
    todoItem.done = !todoItem.done;

    listGroup.forEach(i => {
        let obj = {
            name: i.childNodes[0].textContent,
            owner: todoItem.owner,
            done: i.classList.contains('list-group-item-success')
        };
        arr.push(obj);
    });
    localStorage.setItem(todoItem.owner, JSON.stringify(arr));
}

export function deleteTodoItemLocalStorage({ element, todoItem }) {
    arr = [];
    if (!confirm('Вы уверены?')) {
        return;
    }
    element.remove();
    const listGroup = document.querySelectorAll('.list-group li');
    listGroup.forEach(i => {
        let obj = {
            name: i.childNodes[0].textContent,
            owner: todoItem.owner,
            done: i.classList.contains('list-group-item-success')
        };
        arr.push(obj);
    });
    localStorage.setItem(todoItem.owner, JSON.stringify(arr));
}