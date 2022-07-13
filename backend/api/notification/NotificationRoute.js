import express from 'express';
import { getNotification } from './NotificationController.js';

export const notificationRouter = express.Router();

notificationRouter.get('/', getNotification);
