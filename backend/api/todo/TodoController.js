import dbPool from '../../config/db.js';
import NotificationService from '../notification/NotificationService.js';
import TodoService from './TodoService.js';

const notificationService = new NotificationService();
const todoService = new TodoService();

const createTodo = (req, res) => {
  const { status, title, description } = req.body;

  const sql = `INSERT INTO todo(status, title, description, date) VALUES("${status}", "${title}", "${description}", NOW());`;
  const action = 'create';

  dbPool.getConnection().then((connection) =>
    connection.query(sql).then(([response]) => {
      notificationService.createNotification(response.insertId, action, status);
      res.status(201).send({
        message: '성공적으로 투두가 생성되었습니다.',
      });
    }),
  );
};

const getTodo = (req, res) => {
  const sql = 'SELECT * FROM todo WHERE is_delete=0';
  dbPool.getConnection().then((connection) => {
    connection.query(sql).then(([data, fields]) => {
      res.status(200).send({
        payload: data,
        message: '성공적으로 투두 목록을 불러왔습니다.',
      });
    });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { status, title, description } = req.body;

  // TODO : 에러 핸들링
  //   if (!status && !title && !description) return res.status(403).send({});

  let sql = 'UPDATE todo SET ';
  if (status) sql += `status="${status}", `;
  if (title) sql += `title="${title}", `;
  if (description) sql += `description="${description}", `;
  sql += `date=NOW() WHERE id=${id}`;

  const action = status ? 'move' : 'update';

  dbPool.getConnection().then((connection) => {
    connection.query(sql).then((response) => {
      notificationService.createNotification(response.insertId, action, status);
      res.status(201).send({
        message: '성공적으로 투두가 수정되었습니다.',
      });
    });
  });
};
const deleteTodo = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  todoService.deleteTodo(id, status, () => {
    res.status(200).send({ message: '성공적으로 삭제되었습니다.' });
  });
};

export default { createTodo, getTodo, updateTodo, deleteTodo };
