import './dotenv.js';
import express from 'express';
import todoRouter from './api/todo/TodoController.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`server listening on http://localhost:${PORT}`);
};

app.get('/', (req, res) => res.sendFile(`${process.cwd()}/dist/index.html`));

app.use('/todo', todoRouter);

app.listen(PORT, handleListening);
