// Select Elements
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.getElementById("filter-todo");
const deleteAllBtn = document.getElementById("delete-all-btn");
const emptyMsg = document.getElementById("empty-msg");
const errorMsg = document.getElementById("error-msg");

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", handleListActions);
filterOption.addEventListener("change", filterTodo);
deleteAllBtn.addEventListener("click", deleteAll);

// --- Functions ---

function addTodo(event) {
  event.preventDefault(); // Prevent form submit

  const taskText = todoInput.value;
  const taskDate = dateInput.value;

  // Validation
  if (taskText === "") {
    errorMsg.innerText = "Task name cannot be empty!";
    return;
  }
  if (taskDate === "") {
    errorMsg.innerText = "Please select a due date!";
    return;
  }
  errorMsg.innerText = "";

  const todoDiv = document.createElement("li");
  todoDiv.classList.add("todo-item");

  const taskSpan = document.createElement("span");
  taskSpan.classList.add("task-text");
  taskSpan.innerText = taskText;
  todoDiv.appendChild(taskSpan);

  const dateSpan = document.createElement("span");
  dateSpan.innerText = taskDate;
  todoDiv.appendChild(dateSpan);

  // 3. Status Column
  const statusSpan = document.createElement("span");
  statusSpan.classList.add("status-badge", "status-pending");
  statusSpan.innerText = "Pending";
  todoDiv.appendChild(statusSpan);

  // 4. Actions Column
  const actionDiv = document.createElement("div");

  // Check Button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fas fa-check"></i>';
  checkBtn.classList.add("action-btn", "check-btn");
  actionDiv.appendChild(checkBtn);

  // Trash Button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("action-btn", "trash-btn");
  actionDiv.appendChild(trashBtn);

  todoDiv.appendChild(actionDiv);

  // Append to List
  todoList.appendChild(todoDiv);

  // Clear Inputs
  todoInput.value = "";
  dateInput.value = "";

  checkEmpty();
}

function handleListActions(e) {
  const item = e.target;
  const todoItem = item.closest(".todo-item");

  if (!todoItem) return;

  // Delete
  if (
    item.classList.contains("trash-btn") ||
    item.parentElement.classList.contains("trash-btn")
  ) {
    todoItem.remove();
    checkEmpty(); // Check if list is empty after delete
  }

  // Complete
  if (
    item.classList.contains("check-btn") ||
    item.parentElement.classList.contains("check-btn")
  ) {
    todoItem.classList.toggle("completed");

    // Update Status Badge
    const statusBadge = todoItem.querySelector(".status-badge");
    if (todoItem.classList.contains("completed")) {
      statusBadge.innerText = "Completed";
      statusBadge.classList.remove("status-pending");
      statusBadge.classList.add("status-completed");
    } else {
      statusBadge.innerText = "Pending";
      statusBadge.classList.remove("status-completed");
      statusBadge.classList.add("status-pending");
    }

    // Re-apply filter in case we are in "Pending" or "Completed" view
    filterTodo();
  }
}

function filterTodo() {
  const todos = todoList.childNodes;
  const filterValue = filterOption.value;

  todos.forEach(function (todo) {
    if (todo.nodeType === 1) {
      // Ensure it's an element
      switch (filterValue) {
        case "all":
          todo.style.display = "grid";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "grid";
          } else {
            todo.style.display = "none";
          }
          break;
        case "pending": // Changed from 'uncompleted' to 'pending' to match HTML value
          if (!todo.classList.contains("completed")) {
            todo.style.display = "grid";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

function deleteAll() {
  // Standard confirm dialog
  if (confirm("Are you sure you want to delete all tasks?")) {
    todoList.innerHTML = "";
    checkEmpty();
  }
}

function checkEmpty() {
  if (todoList.children.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}
