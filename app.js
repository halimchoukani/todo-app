const input = document.getElementById("todo-input");
const form = document.getElementById("todo-form");
const list = document.getElementById("todo-list");

let tasks = [];

function loadTask(task, index) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${task.id}</td>
    <td class="task-name">${task.name}</td>
    <td class="actions">
      <button class="done-btn">${task.done ? "Undone" : "Done"}</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;
  if (task.done) tr.classList.add("done");
  list.appendChild(tr);
}

function init() {
  list.innerHTML = "";
  tasks.forEach((task, idx) => loadTask(task, idx));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  const newTask = {
    id: tasks.length,
    name,
    done: false,
  };
  tasks.push(newTask);
  loadTask(newTask, tasks.length - 1);
  input.value = "";
});


//
list.addEventListener("click", function (e) {
  const tr = e.target.closest("tr");
  if (!tr) return;
  const idx = Array.from(list.children).indexOf(tr);
  if (e.target.classList.contains("done-btn")) {
    tasks[idx].done = !tasks[idx].done;
    init();
  }
  if (e.target.classList.contains("delete-btn")) {
    let confirm = window.confirm(`Are you sure you want to delete this task '${tasks[idx].name}'?`);
    if (!confirm) return;
    tasks.splice(idx, 1);
    init();
  }
  if (e.target.classList.contains("edit-btn")) {
    const tr = e.target.closest("tr");
    const idx = Array.from(list.children).indexOf(tr);
    const td = tr.querySelector(".task-name");
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = tasks[idx].name;
    inputEdit.className = "edit-input";
    td.innerHTML = "";
    td.appendChild(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener("blur", function () {
      const newName = inputEdit.value.trim();
      if (newName) tasks[idx].name = newName;
      init();
    });

    inputEdit.addEventListener("keydown", function (e) {
      if (e.key === "Enter") inputEdit.blur();
    });
  }
});

init();
