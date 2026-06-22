import { useState, useEffect } from "react"
import { getTasks, createTask, updateTask, deleteTask } from "./api"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)

  // Page load hote hi tasks lao
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const data = await getTasks()
    setTasks(data)
    setLoading(false)
  }

  // Naya task banao
  const handleCreate = async () => {
    if (!title) return
    await createTask({ title, description, status: "todo" })
    setTitle("")
    setDescription("")
    fetchTasks()
  }

  // Status change karo
  const handleStatus = async (task, newStatus) => {
    await updateTask(task.id, { ...task, status: newStatus })
    fetchTasks()
  }

  // Task delete karo
  const handleDelete = async (id) => {
    await deleteTask(id)
    fetchTasks()
  }

  // Status ke hisaab se tasks filter karo
  const todoTasks = tasks.filter(t => t.status === "todo")
  const inprogressTasks = tasks.filter(t => t.status === "inprogress")
  const doneTasks = tasks.filter(t => t.status === "done")

  return (
    <div className="app">

      {/* Header */}
      <div className="header">
        <h1>📋 DevBoard Pro 1</h1>
        <p>Apne tasks manage karo</p>
      </div>

      {/* Task Add Karo */}
      <div className="add-task">
        <input
          placeholder="Task ka naam..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Description (optional)..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={handleCreate}>+ Add Task</button>
      </div>

      {/* Columns */}
      {loading ? <p className="loading">Loading...</p> : (
        <div className="board">

          {/* Todo Column */}
          <div className="column">
            <div className="column-header todo-header">
              📝 Todo ({todoTasks.length})
            </div>
            {todoTasks.map(task => (
              <div key={task.id} className="card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="actions">
                  <button
                    className="btn-progress"
                    onClick={() => handleStatus(task, "inprogress")}
                  >
                    → In Progress
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* In Progress Column */}
          <div className="column">
            <div className="column-header progress-header">
              ⚡ In Progress ({inprogressTasks.length})
            </div>
            {inprogressTasks.map(task => (
              <div key={task.id} className="card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="actions">
                  <button
                    className="btn-done"
                    onClick={() => handleStatus(task, "done")}
                  >
                    ✓ Done
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Done Column */}
          <div className="column">
            <div className="column-header done-header">
              ✅ Done ({doneTasks.length})
            </div>
            {doneTasks.map(task => (
              <div key={task.id} className="card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="actions">
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}

export default App