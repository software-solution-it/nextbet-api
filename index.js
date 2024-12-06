const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 2764;

const rotas = require('./src/routes/routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', rotas);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
