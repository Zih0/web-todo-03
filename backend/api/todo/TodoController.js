import express from 'express';
import { connection } from '../../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  const { status, title, description } = req.body;

  const sql = `INSERT INTO todo(status, title, description, date) VALUES("${status}", "${title}", "${description}", NOW());`;

  const conn = await connection.getConnection();
  const [result] = await conn.query(sql);

  console.log(result);
  res.send(result);
});

export default router;
