import dbPool from '../../config/db.js';

import NotificationService from '../notification/NotificationService.js';

const notificationService = new NotificationService();

class TodoService {
  createTodo(status, title, description, responseCallback) {
    const sql = `INSERT INTO todo(status, title, description, date) VALUES("${status}", "${title}", "${description}", NOW());`;
    const action = 'create';

    dbPool.getConnection().then((connection) =>
      connection.query(sql).then(([response]) => {
        notificationService.createNotification(response.insertId, action, status, responseCallback);
      }),
    );
  }

  getTodo(responseCallback) {
    const sql = 'SELECT todo_id, status, title, description FROM todo WHERE is_delete=0';

    dbPool.getConnection().then((connection) => {
      connection.query(sql).then(([data]) => responseCallback(data));
    });
  }

  updateTodo(todo_id, status, title, description, responseCallback) {
    let sql = 'UPDATE todo SET ';

    if (status) {
      const [prevStatus, curStatus] = status.split(',');

      sql += `status="${curStatus}", `;
    }
    if (title) sql += `title="${title}", `;
    if (description) sql += `description="${description}", `;
    sql += `date=NOW() WHERE todo_id=${todo_id}`;

    const action = status ? 'move' : 'update';

    dbPool.getConnection().then((connection) => {
      connection.query(sql).then(() => {
        notificationService.createNotification(todo_id, action, status, responseCallback);
      });
    });
  }

  deleteTodo(todo_id, status, responseCallback) {
    const sql = `UPDATE todo SET is_delete=1 WHERE todo_id=${todo_id}`;
    const action = 'delete';

    dbPool.getConnection().then((connection) => {
      connection.query(sql).then(() => {
        notificationService.createNotification(todo_id, action, status, responseCallback);
      });
    });
  }
}

export default TodoService;
