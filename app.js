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
