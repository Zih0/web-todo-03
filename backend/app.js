import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`server listening on http://localhost:${PORT}`);
};
app.get('/', (req, res) => res.sendFile(`${process.cwd()}/dist/index.html`));
app.listen(PORT, handleListening);
