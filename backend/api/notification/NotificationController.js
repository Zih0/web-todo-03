import NotificationService from './NotificationService.js';

const notificationService = new NotificationService();

export const getNotification = (req, res) => {
  notificationService.getNotifications((notifications) => {
    res.status(200).send({ payload: notifications, message: '성공적으로 알림이 불러와졌습니다.' });
  });
};
