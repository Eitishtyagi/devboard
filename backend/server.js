// 1. Libraries import karo
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()

// 2. Express app banao
const app = express()

// 3. Middleware setup karo
app.use(cors())
app.use(express.json())

// 4. Database connection banao
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// 5. Database se connect karo
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err)
    return
  }
  console.log('Database connected successfully!')
})

// 6. Routes — Frontend inhe call karega

// Saare tasks lao
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

// Naya task banao
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body
  db.query(
    'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
    [title, description, status || 'todo'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id: result.insertId, title, description, status })
    }
  )
})

// Task update karo
app.put('/tasks/:id', (req, res) => {
  const { title, description, status } = req.body
  db.query(
    'UPDATE tasks SET title=?, description=?, status=? WHERE id=?',
    [title, description, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ message: 'Task updated!' })
    }
  )
})

// Task delete karo
app.delete('/tasks/:id', (req, res) => {
  db.query(
    'DELETE FROM tasks WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ message: 'Task deleted!' })
    }
  )
})

// 7. Server start karo
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})