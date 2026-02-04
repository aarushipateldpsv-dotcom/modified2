const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const todoDay = document.getElementById("todoDay");
const todoTime = document.getElementById("todoTime");

window.onload = fetchTodos;

function fetchTodos() {
    fetch("/api/todos")
        .then(res => res.json())
        .then(data => {
            todoList.innerHTML = "";
            data.forEach(todo => addTodoToDOM(todo));
        });
}

function addTodo() {
    const text = todoInput.value.trim();
    const day = todoDay.value;
    const time = todoTime.value;

    if (!text || !day || !time) {
        alert("Fill all fields");
        return;
    }

    fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, day, time })
    })
    .then(res => res.json())
    .then(() => {
        fetchTodos();
        todoInput.value = "";
        todoDay.value = "";
        todoTime.value = "";
    });
}

function toggleTodo(id) {
    fetch(`/api/todos/${id}`, {
        method: "PUT"
    }).then(() => fetchTodos());
}

function deleteTodo(id) {
    fetch(`/api/todos/${id}`, {
        method: "DELETE"
    }).then(() => fetchTodos());
}

function addTodoToDOM(todo) {
    const li = document.createElement("li");

    if (todo.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <div class="task-info">
            <strong>${todo.text}</strong><br>
            📅 ${todo.day} | ⏰ ${todo.time}<br>
            🕒 ${todo.createdAt}
        </div>

        <div class="actions">
            <input type="checkbox" 
                   ${todo.completed ? "checked" : ""} 
                   onclick="toggleTodo(${todo.id})">
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">✖</button>
        </div>
    `;

    todoList.appendChild(li);
}
