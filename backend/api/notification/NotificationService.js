import dbPool from '../../config/db.js';

class NotificationService {
  getNotifications(responseCallback, errorCallback) {
    const sql = 'SELECT * FROM notification, todo WHERE notification.todo_id=todo.todo_id';

    dbPool
      .getConnection()
      .then((connection) => {
        connection
          .query(sql)
          .then(([data]) => {
            connection.release();
            responseCallback(data);
          })
          .catch((err) => errorCallback(err));
      })
      .catch((err) => errorCallback(err));
  }

  createNotification(todo_id, action, kanvans, responseCallback, errorCallback) {
    const sql = `INSERT INTO notification (todo_id, action, kanvans, cdate) VALUES ("${todo_id}", "${action}","${kanvans}",NOW())`;

    dbPool
      .getConnection()
      .then((connection) => {
        connection
          .query(sql)
          .then(() => {
            connection.release();
            responseCallback();
          })
          .catch((err) => errorCallback(err));
      })
      .catch((err) => errorCallback(err));
  }
}

export default NotificationService;
