import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Lists all tasks
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error searching for tasks');
  }
};

// Lists task by ID
export const getTask = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error searching task');
  }
};

// Creates new task
export const createTask = async (task) => {
  try {
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating task');
  }
};

// Updates task by ID
export const updateTask = async (id, task) => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating task');
  }
};

// Deletes task by ID
export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error deleting task');
  }
};