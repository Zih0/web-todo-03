import TodoService from './TodoService.js';

const todoService = new TodoService();

const createTodo = (req, res) => {
  const { status, title, description } = req.body;

  todoService.createTodo(
    status,
    title,
    description,
    (todo_id) =>
      res.status(201).send({
        payload: { todo_id },
        message: '성공적으로 투두가 생성되었습니다.',
      }),
    (err) => res.status(500).send({ error: err }),
  );
};

const getTodo = (req, res) => {
  todoService.getTodo(
    (todos) => {
      res.status(200).send({
        payload: todos,
        message: '성공적으로 투두 목록을 불러왔습니다.',
      });
    },
    (err) => res.status(500).send({ error: err }),
  );
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { status, title, description } = req.body;

  // TODO : 에러 핸들링
  //   if (!status && !title && !description) return res.status(403).send({});

  todoService.updateTodo(
    id,
    status,
    title,
    description,
    () =>
      res.status(201).send({
        message: '성공적으로 투두가 수정되었습니다.',
      }),
    (err) => res.status(500).send({ error: err }),
  );
};

const deleteTodo = (req, res) => {
  const { status } = req.query;
  const { id } = req.params;

  todoService.deleteTodo(
    id,
    status,
    () => {
      res.status(200).send({ message: '성공적으로 삭제되었습니다.' });
    },
    (err) => res.status(500).send({ error: err }),
  );
};

export default { createTodo, getTodo, updateTodo, deleteTodo };
