const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 3000

const { register, login } = require("./handlers/auth");
const { create } = require("./handlers/investments");

var jsonParser = bodyParser.json()

const errorHandler = (err, res) => {
  console.log(err);
  res.status(500).send('Something went wrong!');
};

app.post('/users/register', jsonParser, register);
app.post('/users/login', jsonParser, login);
app.post('/investments/create', jsonParser, create);

app.use(errorHandler);


const server = app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`)
})

module.exports = { server };
