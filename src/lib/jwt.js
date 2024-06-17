const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

function sign(payload) {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "1w" });
}

function verify(token) {
  return jsobwebtoken.verify(token, JWT_SECRET);
}

module.exports = {
  sign,
  verify,
};
