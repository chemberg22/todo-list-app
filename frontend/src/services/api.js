import axios from 'axios';

// Axios instance configured for API requests to the backend
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Fetches all tasks
// @return = array of tasks
// @throws = error if the request fails
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
  }
};

// Fetches task by ID
// @param = task ID
// @return = task body
// @throws = error if the request fails
export const getTask = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch task');
  }
};

// Creates new task
// @param = task body
// @return = promise object related to the created task
// @throws = error if the request fails
export const createTask = async (task) => {
  try {
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating task');
  }
};

// Updates task by ID
// @param = task ID and task body
// @return = promise object related to the updated task
// @throws = error if the request fails
export const updateTask = async (id, task) => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating task');
  }
};

// Deletes task by ID
// @param = task ID
// @return = void promise that resolves when task id deleted
// @throws = error if the request fails
export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error deleting task');
  }
};