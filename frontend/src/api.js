// Production API URL
const API_URL = 'devboard-alb-2024257509.ap-south-1.elb.amazonaws.com'

// Saare tasks lao
export const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`)
  return response.json()
}

// Naya task banao
export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  })
  return response.json()
}

// Task update karo
export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  })
  return response.json()
}

// Task delete karo
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}