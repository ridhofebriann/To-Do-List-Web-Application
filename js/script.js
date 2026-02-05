// --- DOM Elements ---
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.querySelector(".todo-list");
const emptyState = document.getElementById("empty-state");
const errorMsg = document.getElementById("error-msg");
const taskCountSpan = document.getElementById("task-count");
const digitalClock = document.getElementById("digital-clock");
const filterButtons = document.querySelectorAll(".filter-btn");

// --- State ---
let filterStatus = "all"; // 'all', 'pending', 'completed'

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  startClock();
  // Set default date to today
  dateInput.valueAsDate = new Date();
});

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", handleAction);

// Filter Buttons Logic
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    filterButtons.forEach((b) => b.classList.remove("active"));
    // Add to clicked
    btn.classList.add("active");
    // Set filter
    filterStatus = btn.getAttribute("data-filter");
    filterTodo();
  });
});

// --- Functions ---

function startClock() {
  setInterval(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    digitalClock.innerText = `${hours} : ${minutes} : ${seconds}`;
  }, 1000);
}

function addTodo(event) {
  event.preventDefault();

  const text = todoInput.value;
  const date = dateInput.value;
  const time = timeInput.value;

  // Validation
  if (text === "") {
    errorMsg.innerText = "⚠️ Nama tugas tidak boleh kosong!";
    return;
  }
  errorMsg.innerText = "";

  // Create Elements
  const todoDiv = document.createElement("li");
  todoDiv.classList.add("todo-item");
  // Default status is pending (not completed)

  // Format Date nicely
  const dateObj = new Date(date);
  const dateString = isNaN(dateObj)
    ? "No Date"
    : dateObj.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
  const timeString = time ? time : "--:--";

  todoDiv.innerHTML = `
        <div class="todo-info">
            <span class="todo-text">${text}</span>
            <div class="todo-meta">
                <span><i class="far fa-calendar-alt"></i> ${dateString}</span>
                <span><i class="far fa-clock"></i> ${timeString}</span>
            </div>
        </div>
        <div class="todo-actions">
            <button class="action-btn btn-check">
                <i class="fas fa-check"></i>
            </button>
            <button class="action-btn btn-delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

  todoList.appendChild(todoDiv);

  // Clear Input
  todoInput.value = "";
  timeInput.value = "";

  updateUI();
}

function handleAction(e) {
  const item = e.target;
  const todoItem = item.closest(".todo-item");

  if (!todoItem) return;

  // Delete
  if (item.classList.contains("btn-delete") || item.closest(".btn-delete")) {
    todoItem.style.opacity = "0";
    todoItem.style.transform = "translateX(20px)";
    setTimeout(() => {
      todoItem.remove();
      updateUI();
    }, 300);
  }

  // Check (Complete)
  if (item.classList.contains("btn-check") || item.closest(".btn-check")) {
    todoItem.classList.toggle("completed");
    updateUI(); // Re-run filter immediately to update view
  }
}

function filterTodo() {
  const todos = todoList.childNodes;
  let visibleCount = 0;

  todos.forEach(function (todo) {
    if (todo.nodeType === 1 && todo.classList.contains("todo-item")) {
      const isCompleted = todo.classList.contains("completed");

      let shouldShow = false;

      if (filterStatus === "all") {
        shouldShow = true;
      } else if (filterStatus === "completed" && isCompleted) {
        shouldShow = true;
      } else if (filterStatus === "pending" && !isCompleted) {
        shouldShow = true;
      }

      if (shouldShow) {
        todo.style.display = "flex";
        visibleCount++;
      } else {
        todo.style.display = "none";
      }
    }
  });

  // Handle Empty State Visibility
  if (visibleCount === 0) {
    emptyState.style.display = "block";
    // Ubah teks empty state sesuai filter
    if (filterStatus === "completed")
      emptyState.querySelector("p").innerText = "Belum ada tugas selesai 💤";
    else if (filterStatus === "pending")
      emptyState.querySelector("p").innerText = "Tugas aman semua! 🎉";
    else
      emptyState.querySelector("p").innerText =
        "Tidak ada task sesuai filter. 🎯";
  } else {
    emptyState.style.display = "none";
  }
}

function updateUI() {
  // Update Count
  const totalTasks = document.querySelectorAll(".todo-item").length;
  taskCountSpan.innerText = totalTasks;

  // Run Filter
  filterTodo();
}
