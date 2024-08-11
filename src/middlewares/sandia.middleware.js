const validAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error('No provide auth');

    const b64auth = (authorization || '').split(' ')[1] || '';
    const [user, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');

    if (
      user !== process.env.USER_SANDIAS ||
      password !== process.env.PASSWORD_SANDIAS
    ) {
      throw new Error('Invalid Credentials');
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = validAdmin;
