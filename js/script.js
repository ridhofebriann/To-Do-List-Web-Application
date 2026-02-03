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
    <td class="border border-gray-700 px-4 py-2">${task}</td>
    <td class="border border-gray-700 px-4 py-2">${dueDate}</td>
    <td class="border border-gray-700 px-4 py-2">Pending</td>
    <td class="border border-gray-700 px-4 py-2">
      <button class="delete px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white">Delete</button>
    </td>
  `;

  todoList.appendChild(row);
  form.reset();
});

deleteAllBtn.addEventListener("click", function () {
  todoList.innerHTML =
    '<tr><td colspan="4" class="px-4 py-2">No task found</td></tr>';
});

todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.closest("tr").remove();
  }
});
