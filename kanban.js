// Exporting Kanban class as default so it can be imported elsewhere
export default class Kanban {
    // -----------------------------------------
    // Get all tasks from a specific column
    // -----------------------------------------
    static getTasks(columnId) {
        // Read data from localStorage and find the matching column
        const data = read().find((column) => {
            return column.columnId == columnId
        })
        // If column not found, return empty array
        if (!data) {
            return []
        }
        // Return tasks of the found column
        return data.tasks
    }

    // -----------------------------------------
    // Insert a new task into a column
    // -----------------------------------------
    static insertTask(columnId, content) {
        // Get all columns
        const data = read()

        // Find the column where task will be inserted
        const column = data.find((column) => {
            return column.columnId == columnId
        })

        // If column does not exist, throw error
        if (!column) {
            throw new Error("Thers is Not ColumnID").message
        }

        // Create new task object
        const task = {
            taskId: Math.floor(Math.random() * 100000),
            content: content
        }
        // Add task to column
        column.tasks.push(task)
        // Save updated data to localStorage
        save(data)
        // Return newly created task
        return task
    }

    // -----------------------------------------
    // Update task content and/or move task to another column
    // -----------------------------------------
    static updateTask(taskId, updatedInformation) {
        // Read all columns
        const data = read();

        // Find task and its current column
        function findColumnTask() {
            for (const column of data) {
                const task = column.tasks.find(item => {
                    return item.taskId == taskId;
                });
                // Return both task and its column
                if (task) {
                    return [task, column];
                }
            }
        }

        // Destructure returned task and column
        const [task, currentColumn] = findColumnTask();

        // Find target column (where task should move)
        const targetColumn = data.find(column => {
            return column.columnId == updatedInformation.columnId;
        });

        // Update task content
        task.content = updatedInformation.content;
        // Remove task from current column
        currentColumn.tasks.splice(currentColumn.tasks.indexOf(task), 1);
        // Add task to target column
        targetColumn.tasks.push(task);
        // Save updated data
        save(data);
    }

    // -----------------------------------------
    // Delete a task by taskId
    // -----------------------------------------
    static deleteTask(taskId) {
        const data = read()
        // Loop through all columns
        for (const column of data) {
            const task = column.tasks.find((item) => {
                return item.taskId == taskId
            })
            // If task found, remove it
            if (task) {
                column.tasks.splice(column.tasks.indexOf(task), 1)
            }
        }
        // Save updated data
        save(data)
    }

    // -----------------------------------------
    // Get tasks from all columns
    // -----------------------------------------
    static getAllTasks() {
        const data = read()
        // Update task count UI
        columnCount()
        // Return tasks for each column
        return [data[0].tasks, data[1].tasks, data[2].tasks]

    }

}

// -----------------------------------------
// Read data from localStorage
// -----------------------------------------
const read = () => {
    const data = localStorage.getItem("data")
    // If no data exists, return default columns
    if (!data) {
        return [
            { columnId: 0, tasks: [] },
            { columnId: 1, tasks: [] },
            { columnId: 2, tasks: [] }
        ]
    }
    // Parse stored JSON data
    return JSON.parse(data)
}

// -----------------------------------------
// Save data to localStorage
// -----------------------------------------
const save = (data) => {
    localStorage.setItem("data", JSON.stringify(data))
    // Update column counts after saving
    columnCount()
}

// -----------------------------------------
// Update task count UI for each column
// -----------------------------------------
const columnCount = () => {
    const data = read()

    // Update TODO count
    const todo = document.querySelector("span.todo")
    todo.textContent = data[0].tasks.length
    // Update PENDING count
    const pending = document.querySelector("span.pending")
    pending.textContent = data[1].tasks.length
    // Update COMPLETED count
    const completed = document.querySelector("span.completed")
    completed.textContent = data[2].tasks.length
}

