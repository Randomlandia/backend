const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const connect = new Promise(async (resolve, reject) => {
  const conn = mongoose.connect(url);
  if (conn) resolve("Connection succesfully.");
  reject(new Error("Error connection failed"));
});

module.exports = {
  connect,
};
