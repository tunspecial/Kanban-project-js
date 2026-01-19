// Import Kanban class (handles data & localStorage)
import Kanban from "./kanban.js";
// Select task container columns
const todo = document.querySelector(".cards.todo")
const pending = document.querySelector(".cards.pending")
const completed = document.querySelector(".cards.completed")

// Store all columns in an array (index = columnId)
const taskbox = [todo, pending, completed]


// ------------------------------------------------
// Create and display a task card inside a column
// ------------------------------------------------
function addTaskCard(task, index) {
    // Create form element for task card
    const element = document.createElement("form");
    element.className = "card";
    element.draggable = true;// Enable drag & drop
    element.dataset.id = task.taskId;// Store taskId
    element.innerHTML = `
        <input value="${task.content}" type="text" name="task" autocomplete="off" disabled="disabled">
        <div>
            <span class="task-id">#${task.taskId}</span>
            <span>
                <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                <button class="bi bi-check-lg update hide" data-id="${task.taskId}" data-column="${index}"></button>
                <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
            </span>
        </div>
    `;
    // Add task card to its column
    taskbox[index].appendChild(element);
}

// ------------------------------------------------
// Load all saved tasks and render them on page load
// ------------------------------------------------
Kanban.getAllTasks().forEach((tasks, index) => {
    tasks.forEach((task) => {
        addTaskCard(task, index)
    })
})

// ------------------------------------------------
// Handle add task form submission
// ------------------------------------------------
const addForm = document.querySelectorAll(".add")
addForm.forEach((form) => {
    form.addEventListener("submit", event => {
        event.preventDefault()
        if (form.task.value) {
            const task = Kanban.insertTask(form.submit.dataset.id, form.task.value.trim())
            addTaskCard(task, form.submit.dataset.id)
            form.reset()
        }
    })
})

// ------------------------------------------------
// Handle click, edit, delete, and drag events
// ------------------------------------------------
taskbox.forEach((column) => {
    column.addEventListener("click", event => {
        event.preventDefault()
        // Get input field of the task
        const inputForm = event.target.parentElement.parentElement.previousElementSibling

        // Enable edit mode
        if (event.target.classList.contains("edit")) {
            inputForm.removeAttribute("disabled")
            event.target.classList.add("hide")
            event.target.nextElementSibling.classList.remove("hide")
        }

        // Update task content
        if (event.target.classList.contains("update")) {
            inputForm.setAttribute("disabled", "disabled")
            event.target.classList.add("hide")
            event.target.previousElementSibling.classList.remove("hide")

            const taskId = event.target.dataset.id
            const columnId = event.target.dataset.column
            const content = inputForm.value
            Kanban.updateTask(taskId, {
                columnId: columnId,
                content: content
            })
        }
        // Delete task
        if (event.target.classList.contains("delete")) {
            inputForm.parentElement.remove()
            Kanban.deleteTask(event.target.dataset.id)
        }
    })

    // ----------------------------
    // Drag start event
    // ----------------------------
    column.addEventListener("dragstart", event => {
        if (event.target.classList.contains("card")) {
            event.target.classList.add("dragging")
        }
    })

    column.addEventListener("dragover", event => {
        const card = document.querySelector(".dragging")
        column.appendChild(card)
    })

    column.addEventListener("dragend", event => {
        if (event.target.classList.contains("card")) {
            event.target.classList.remove("dragging")

            const taskId = event.target.dataset.id
            const columnId = event.target.parentElement.dataset.id
            const content = event.target.task.value
            Kanban.updateTask(taskId, {
                columnId: columnId,
                content: content
            })
        }
    })

})

