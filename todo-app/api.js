export async function getTodoListApi(owner) {
    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    return await response.json();
}

export async function createTodoItemApi({ name, owner }) {
    const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        body: JSON.stringify({
            name,
            owner
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    return await response.json();
}

export async function switchTodoItemDoneApi({ todoItem }) {
    todoItem.done = !todoItem.done;
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            done: todoItem.done
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export async function deleteTodoItemApi({ element, todoItem }) {
    if (!confirm('Вы уверены?')) {
        return;
    }
    element.remove();
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'DELETE'
    });
}