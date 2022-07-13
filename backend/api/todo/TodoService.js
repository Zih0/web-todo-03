import dbPool from '../../config/db.js';

import NotificationService from '../notification/NotificationService.js';

const notificationService = new NotificationService();

class TodoService {
  deleteTodo(todo_id, kanvan, responseCallback) {
    const sql = `UPDATE todo SET is_delete=1 WHERE id=${todo_id}`;
    const action = 'delete';
    dbPool.getConnection().then((connection) => {
      connection.query(sql).then((response) => {
        notificationService.createNotification(todo_id, action, kanvan);
        responseCallback(response);
      });
    });
  }
}

export default TodoService;
