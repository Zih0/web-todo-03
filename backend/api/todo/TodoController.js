import express from 'express';
import { connection } from '../../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { status, title, description } = req.body;

  const sql = `INSERT INTO todo(status, title, description, date) VALUES("${status}", "${title}", "${description}", NOW());`;

  const conn = await connection.getConnection();
  const [result] = await conn.query(sql);

  res.send(result);
});

router.get('/', async (req, res) => {
  const sql = `SELECT * FROM todo`;

  const conn = await connection.getConnection();
  const [result] = await conn.query(sql);

  res.send(result);
});

export default router;
