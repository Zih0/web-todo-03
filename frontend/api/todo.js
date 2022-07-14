import fetcher from '../utils/fetcher.js';

const getTodoList = () => fetcher.get('/todos').then((response) => response.payload);

const createTodo = (status, title, description) =>
  fetcher.post('/todos', { status, title, description }).then((response) => response);

const moveTodo = (id, status) => fetcher.put(`/todos/${id}`, { status }).then((response) => response);

const updateTodo = (id, status, title, description) =>
  fetcher.put(`/todos/${id}`, { status, title, description }).then((response) => response);

const deleteTodo = (id, status) => fetcher.delete(`/todos/${id}?status=${status}`).then((response) => response);

export { getTodoList, createTodo, moveTodo, updateTodo, deleteTodo };
