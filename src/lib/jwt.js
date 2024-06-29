const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

function sign(payload) {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "1w" });
}

function verify(token) {
  return jsobwebtoken.verify(token, JWT_SECRET);
}

const jwt = require("jsonwebtoken");

/**
 * Decodes and verifies a JWT token.
 *
 * @param {string} token - The JWT token to decode and verify.
 * @param {string} secretKey - The secret key to verify the token.
 * @returns {object|null} - The decoded payload if verification is successful, otherwise null.
 */

// Example usage
// const token = "your_jwt_token_here";
// const secretKey = "your_secret_key_here";

// const result = decodeAndVerifyJWT(token, secretKey);
// if (result) {
//   console.log("Token is valid. Payload:", result);
// } else {
//   console.log("Token is invalid or verification failed.");
// }

module.exports = {
  sign,
  verify,
};
