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
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
    });

    updateTasksLeft();


    list.appendChild(li);
  });
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





