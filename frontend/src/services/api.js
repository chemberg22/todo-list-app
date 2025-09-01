import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Substitua pela URL do seu backend
});

// Função para listar todas as tarefas
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar tarefas');
  }
};

// Buscar task específica por ID
export const getTask = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar task');
  }
};

// Função para criar uma nova tarefa
export const createTask = async (task) => {
  try {
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao criar tarefa');
  }
};

// Função para atualizar uma tarefa existente
export const updateTask = async (id, task) => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar tarefa');
  }
};

// Função para excluir uma tarefa
export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir tarefa');
  }
};