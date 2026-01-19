# 🗂️ Kanban Board (Vanilla JavaScript)

A simple Kanban Board application built with Vanilla JavaScript, using LocalStorage for data persistence.  
Users can add, edit, delete, and drag tasks between columns (Todo, Pending, Completed).

---

## ✨ Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Drag & drop tasks between columns
- Persistent data using LocalStorage
- Live task count for each column
- No frameworks — pure JavaScript

---

## 📁 Project Structure

kanban-board/
│
├── index.html
├── style.css
├── index.js        # UI logic & event handling
├── kanban.js       # Data logic (CRUD + localStorage)
└── README.md

---

## 🧠 How It Works

Each column represents a task state:

- 0 → Todo
- 1 → Pending
- 2 → Completed

Data structure used:

[
  { columnId: 0, tasks: [] },
  { columnId: 1, tasks: [] },
  { columnId: 2, tasks: [] }
]

---

## 🛠️ Core Functionalities

### Add Task
- Enter task text and submit
- Task is saved to LocalStorage
- UI updates instantly

### Edit Task
- Click edit icon to enable editing
- Click update icon to save changes

### Delete Task
- Click delete icon to remove task
- Data and UI update immediately

### Drag & Drop
- Drag a task card between columns
- Task state updates automatically

---

## 📦 Kanban Class API

Kanban.getTasks(columnId)  
Kanban.insertTask(columnId, content)  
Kanban.updateTask(taskId, { columnId, content })  
Kanban.deleteTask(taskId)  
Kanban.getAllTasks()

---

## 💾 Data Persistence

All tasks are stored using LocalStorage:

localStorage.setItem("data", JSON.stringify(data))

Tasks remain after page refresh.

---

## 🚀 Getting Started

1. Clone the repository:

git clone https://github.com/your-username/kanban-board.git

2. Open index.html in your browser.

No build tools or dependencies required.

---

## 🧩 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage API
- Drag & Drop API

---

## 📌 Future Improvements

- Due dates
- User authentication
- Backend integration
- Better drag-drop animations
- Mobile responsiveness

---

## 👨‍💻 Author

TUN TUN OO

---

## 📄 License

MIT License

