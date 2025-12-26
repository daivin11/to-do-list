const input = document.getElementById("Input");
const button = document.getElementById("addButton");
const list = document.getElementById("toList");
const filterbuttons = document.querySelectorAll(".filters button");
const taskleft = document.getElementById("taskLeft");

let tasks = [];
let filter = "all"; // all, completed, pending

function renderTasks() {
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  updateTasksLeft();
}



function addTask() {
  const tasktext = input.value.trim();
  if (tasktext !== "") {
    const task = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = "";
  }
}

filterbuttons.forEach(btn => {
    btn.addEventListener("click", () => {
        filter= btn.dataset.filter;
        renderTasks();
    });
    } );  

function updateTasksLeft() {
  const remaining = tasks.filter(task => !task.completed).length;
  taskleft.textContent = `${remaining} tarefas restantes`;
}



button.addEventListener("click", addTask);



function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

loadTasks();  
renderTasks();
