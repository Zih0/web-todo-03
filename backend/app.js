import './dotenv.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import todoRouter from './api/todo/TodoRoute.js';
import { notificationRouter } from './api/notification/NotificationRoute.js';

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`server listening on http://localhost:${PORT}`);
};

app.get('/', (req, res) => res.sendFile(`${process.cwd()}/dist/index.html`));

app.use('/todos', todoRouter);
app.use('/notifications', notificationRouter);

app.listen(PORT, handleListening);
