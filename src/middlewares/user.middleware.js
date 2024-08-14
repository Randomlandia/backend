const jwt = require("jsonwebtoken");

async function validUser(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({
        error: {
          message: "Necesitas enviar un token",
        },
      });
    }

    const token = authorization.split(" ")[1];

    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        return res.status(403).json({
          error: {
            message: "El token no es válido",
          },
        });
      } else {
        req.user = payload;
        next();
      }
    });
  } catch (error) {
    const tokenError = new Error(error);

    res.status(400).send({
      error: {
        message: `${tokenError}`,
      },
    });
  }
}

module.exports = validUser;
