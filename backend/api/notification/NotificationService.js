import connection from '../../config/db.js';
import dbPool from '../../config/db.js';

class NotificationService {
  getNotifications(responseCallback) {
    const sql = 'SELECT * FROM notification';

    dbPool
      .getConnection()
      .then((connection) => {
        connection.query(sql).then(([data]) => responseCallback(data));
      })
      .catch((e) => console.log(e));
  }
  createNotification(todo_id, action, kanvans) {
    const insert_sql = `INSERT INTO notification (todo_id, action, kanvans, cdate) VALUES ("${todo_id}", "${action}","${kanvans}",NOW())`;

    dbPool.getConnection().then((connection) => {
      connection.query(insert_sql).then((response) => console.log(response));
    });
  }
}

export default NotificationService;
