//todo lo que no está directamente relacionado con los casos de uso, rutas o modelos
//y se puede compartir, va en lib
const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

function connect() {
  return mongoose.connect(url);
}

module.exports = {
  connect,
};
