// define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.getElementById("filter");
const taskInput = document.getElementById("task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // remove all task events
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks events
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");
    // add class for style
    li.className =
      "collection-item teal lighten-2 blue-grey-text text-lighten-5";
    // create textNode and append to li
    li.appendChild(document.createTextNode(task));
    // create new link for delete icon
    const link = document.createElement("a");
    // add class for style
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = `<i class= "fa fa-remove"></i>`;
    // add icon to li element in html
    li.appendChild(link);

    // add(append) li to ul in html
    taskList.appendChild(li);
  });
}

// add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("add a task");
  } else {
    // create li element
    const li = document.createElement("li");
    // add class for style
    li.className =
      "collection-item teal lighten-2 blue-grey-text text-lighten-5";
    // create textNode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link for delete icon
    const link = document.createElement("a");
    // add class for style
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = `<i class= "fa fa-remove"></i>`;
    // add icon to li element in html
    li.appendChild(link);

    // add(append) li to ul in html
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = "";
  }

  e.preventDefault();
}

// remove task from UI
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // REMOVE TASK FROM LOCAL STORAGE
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// REMOVE TASK FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// store task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove all tasks
function clearTasks() {
  // taskList.innerHTML = ""; https://jsperf.com/innerhtml-vs-removechild/47 96% slower

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from LOCAL STORAGE
  clearTasksFromLocalStorage();
}

// clear from LOCAL STORAGE
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
