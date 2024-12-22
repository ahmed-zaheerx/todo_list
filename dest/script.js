"use strict";
const taskForm = document.getElementById("task-form");
const input = document.getElementById("input");
const list = document.getElementById("tasks");
const taskCount = document.getElementById("task-count");
let tasks = [];
function addTask(title) {
    const newTask = {
        id: Date.now(),
        title,
        completed: false,
    };
    tasks.push(newTask);
    renderTasks();
    updateTaskCount();
    saveTasks();
}
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = task.completed ? "completed" : "";
        const label = document.createElement("label");
        label.textContent = task.title;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        label.prepend(checkbox);
        listItem.append(label, deleteButton);
        list.append(listItem);
    });
}
function toggleTask(id) {
    tasks = tasks.map((task) => task.id === id ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task);
    renderTasks();
    updateTaskCount();
    saveTasks();
}
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
    updateTaskCount();
    saveTasks();
}
function updateTaskCount() {
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    taskCount.textContent = remainingTasks.toString();
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
        updateTaskCount();
    }
}
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = input.value.trim();
    if (taskTitle) {
        addTask(taskTitle);
        input.value = "";
    }
});
loadTasks();
