const form = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = document.getElementById("task").value.trim();
  const dueDate = document.getElementById("due-date").value;

  if (!task || !dueDate) {
    alert("Please fill in both fields!");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${task}</td>
    <td>${dueDate}</td>
    <td>Pending</td>
    <td><button class="delete">Delete</button></td>
  `;

  todoList.appendChild(row);

  form.reset();
});

deleteAllBtn.addEventListener("click", function () {
  todoList.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
});

todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.closest("tr").remove();
  }
});
