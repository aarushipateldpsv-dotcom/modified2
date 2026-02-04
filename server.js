const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let todos = [];

// GET all todos
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// ADD todo
app.post("/api/todos", (req, res) => {
    const { text, day, time } = req.body;

    if (!text || !day || !time) {
        return res.status(400).json({ message: "All fields required" });
    }

    const newTodo = {
        id: Date.now(),
        text,
        day,
        time,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    todos.push(newTodo);
    res.json(newTodo);
});

 
app.put("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});
