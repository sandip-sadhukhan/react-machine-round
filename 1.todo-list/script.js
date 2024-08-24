const todoForm = document.getElementById('todo-form');
const todoListUl = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');

var todos = [];

const storeInLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

const appendTodoInUI = (todo) => {
    const newTodoEl = document.createElement("li");
    newTodoEl.classList.add("list-group-item")
    newTodoEl.id = `todo-item-${todo.id}`;
    newTodoEl.innerHTML = `
        <div class="d-flex align-item-center">
            <span style="flex: 1;">${todo.todo}</span>

            <div class="d-flex gap-1">
                <button onclick="toggleEditTodo(event, ${todo.id})" class="btn btn-sm btn-info edit-btn">Edit</button>
                <button onclick="handleDeleteTodo(${todo.id})" class="btn btn-sm btn-danger">Delete</button>
            </div>
        </div>
    `;
    todoListUl.appendChild(newTodoEl)
}

const handleDeleteTodo = (todoId) => {
    todos = todos.filter(_todo => _todo.id !== todoId)
    const todoEl = document.getElementById(`todo-item-${todoId}`);
    todoEl.parentElement.removeChild(todoEl);
    storeInLocalStorage();
}

const toggleEditTodo = (event, todoId) => {
    const isEditing = event.target.textContent !== "Edit";
    const todo = todos.find(_todo => _todo.id === todoId);
    const todoEl = document.getElementById(`todo-item-${todoId}`);

    if (!isEditing) {
        const textEle = todoEl.querySelector('span')
        let inputEle = document.createElement("input");
        inputEle.classList.add("form-control", "mr-2");
        inputEle.placeholder = "Enter todo..."
        inputEle.value = todo.todo;

        todoEl.querySelector('div').removeChild(textEle);
        todoEl.querySelector('div').prepend(inputEle)
        todoEl.querySelector('.edit-btn').textContent = "Save"
    } else {
        const inputEle = todoEl.querySelector('input')
        const currentValue = inputEle.value;

        todos = todos.map(_todo => {
            if (_todo.id !== todoId) return _todo;

            _todo.todo = currentValue;
        })

        let textEle = document.createElement("span");
        textEle.style.flex = 1;
        textEle.textContent = currentValue;

        todoEl.querySelector('div').removeChild(inputEle);
        todoEl.querySelector('div').prepend(textEle);
        todoEl.querySelector('.edit-btn').textContent = "Edit";
        storeInLocalStorage();
    }
}

const handleFormSubmit = function(e) {
    e.preventDefault();
    const todo = todoInput.value;

    if (!todo) {
        return;
    }

    const newTodo = {
        id: Date.now(),
        todo
    }

    todos.push(newTodo);
    appendTodoInUI(newTodo);
    todoInput.value = '';
    storeInLocalStorage();
}

todoForm.addEventListener('submit', handleFormSubmit);

window.addEventListener("load", function() {
    var localTodos = localStorage.getItem("todos");
    if (localTodos) {
        localTodos = JSON.parse(localTodos);

        localTodos.forEach(_todo => {
            appendTodoInUI(_todo);
        })
    }
})