import dbPool from '../../config/db.js';

import NotificationService from '../notification/NotificationService.js';

const notificationService = new NotificationService();

class TodoService {
  createTodo(status, title, description, responseCallback, errorCallback) {
    const sql = `INSERT INTO todo(status, title, description, date) VALUES("${status}", "${title}", "${description}", NOW());`;
    const action = 'create';

    dbPool.getConnection().then((connection) =>
      connection
        .query(sql)
        .then(([response]) => {
          connection.release();
          notificationService.createNotification(response.insertId, action, status, responseCallback, errorCallback);
        })
        .catch((err) => errorCallback(err)),
    );
  }

  getTodo(responseCallback, errorCallback) {
    const sql = 'SELECT todo_id, status, title, description FROM todo WHERE is_delete=0';

    dbPool.getConnection().then((connection) => {
      connection
        .query(sql)
        .then(([data]) => {
          connection.release();
          responseCallback(data);
        })
        .catch((err) => errorCallback(err));
    });
  }

  updateTodo(todo_id, status, title, description, responseCallback, errorCallback) {
    let sql = 'UPDATE todo SET ';

    const [prevStatus, curStatus] = status.split(',');

    if (curStatus) sql += `status="${curStatus}", `;
    else sql += `status="${prevStatus}", `;

    if (title) sql += `title="${title}", `;
    if (description) sql += `description="${description}", `;
    sql += `date=NOW() WHERE todo_id=${todo_id}`;

    const action = curStatus ? 'move' : 'update';

    dbPool
      .getConnection()
      .then((connection) => {
        connection
          .query(sql)
          .then(() => {
            connection.release();
            notificationService.createNotification(todo_id, action, status, responseCallback, errorCallback);
          })
          .catch((err) => errorCallback(err));
      })
      .catch((err) => errorCallback(err));
  }

  deleteTodo(todo_id, status, responseCallback, errorCallback) {
    const sql = `UPDATE todo SET is_delete=1 WHERE todo_id=${todo_id}`;
    const action = 'delete';

    dbPool.getConnection().then((connection) => {
      connection
        .query(sql)
        .then(() => {
          connection.release();
          notificationService.createNotification(todo_id, action, status, responseCallback, errorCallback);
        })
        .catch((err) => errorCallback(err));
    });
  }
}

export default TodoService;
