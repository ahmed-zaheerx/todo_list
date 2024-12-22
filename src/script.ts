type Task = {id: number,title: string, completed: boolean};

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const list = document.getElementById("tasks") as HTMLUListElement;
const taskCount = document.getElementById("task-count") as HTMLSpanElement;

let tasks: Task[] = [];

function addTask(title: string): void {
  const newTask: Task = {
    id: Date.now(),
    title,
    completed: false,
  };
  tasks.push(newTask);
  renderTasks();
  updateTaskCount();
  saveTasks();
}

function renderTasks(): void {
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

function toggleTask(id: number): void {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
  updateTaskCount();
  saveTasks();
}

function deleteTask(id: number): void {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
  updateTaskCount();
  saveTasks();
}

function updateTaskCount(): void {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = remainingTasks.toString();
}

function saveTasks(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): void {
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