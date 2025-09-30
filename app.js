let input = document.getElementById("todo-input");
let form = document.getElementById("todo-form");
let list = document.getElementById("todo-list");

let tasks = [];
function addElement(task) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  td1.innerHTML = task.id;
  td2.innerHTML = task.name;
  let donebtn = document.createElement("button");
  let deletebtn = document.createElement("button");
  donebtn.className = "done-btn";
  donebtn.innerHTML = "Done";
  deletebtn.className = "delete-btn";
  deletebtn.innerHTML = "Delete";
  td3.className = "actions";
  td3.appendChild(donebtn);
  td3.appendChild(deletebtn);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  td2.addEventListener("dblclick", function () {
    let currentName = td2.innerText;
    let inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = currentName;
    inputEdit.className = "edit-input";
    td2.innerHTML = "";
    td2.appendChild(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener("blur", function () {
      let newName = inputEdit.value.trim();
      td2.innerHTML = newName !== "" ? newName : currentName;
      let trElement = td2.closest("tr");
      let idx = Array.from(list.children).indexOf(trElement);
      if (newName !== "" && tasks[idx]) {
        tasks[idx].name = newName;
      }
    });

    inputEdit.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        inputEdit.blur();
      }
    });
  });
  donebtn.addEventListener("click", function () {
    let trElement = this.closest("tr");
    let idx = Array.from(list.children).indexOf(trElement);
    trElement.classList.toggle("done");
    donebtn.innerHTML = donebtn.innerHTML === "Done" ? "Undone" : "Done";
  });
  deletebtn.addEventListener("click", function () {
    let trElement = this.closest("tr");
    let idx = Array.from(list.children).indexOf(trElement);
    list.removeChild(trElement);
    tasks.splice(idx, 1);
  });

  list.appendChild(tr);
}
tasks.forEach((task) => {
  addElement(task);
});
function addTask(event) {
  event.preventDefault();
  let name = input.value;
  if (name != null && name != "") {
    let newTask = {
      id: tasks.length || 0,
      name: name,
    };
    addElement(newTask);
    input.value = "";
    tasks.push(newTask);
    return;
  }
  return;
}
