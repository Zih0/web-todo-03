import express from 'express';
import todoController from './TodoController.js';

const todoRouter = express.Router();

todoRouter.post('/', todoController.createTodo);
todoRouter.get('/', todoController.getTodo);
todoRouter.put('/:id', todoController.updateTodo);
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;
