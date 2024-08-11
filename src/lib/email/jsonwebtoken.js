const jwt = require('jsonwebtoken');

function generateAccessToken(payload, exp) {
  const token = jwt.sign(payload, process.env.TOKEN_EMAIL_SECRET, {
    expiresIn: exp,
  });

  const buf = Buffer.from(token, 'utf8');

  console.log('create token succ');

  return buf.toString('base64');
}

module.exports = generateAccessToken;
