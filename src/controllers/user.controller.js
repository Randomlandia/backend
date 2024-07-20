const userUseCase = require('../usecases/user.usecase');
const createError = require('http-errors');

// Controlador para obtener usuario por email y fecha de nacimiento
async function getUserByEmailAndDate(req, res, next) {
  try {
    const { email, fechaNacimiento } = req.body;

    // Validar que email y fechaNacimiento están presentes
    if (!email || !fechaNacimiento) {
      throw createError(400, "Email y fecha de nacimiento son requeridos");
    }

    const user = await userUseCase.getUserByEmailAndDate(email, fechaNacimiento);

    // Si las fechas coinciden, regresar la misma información que en el login
    const token = jwt.sign({ user: user._id, email: user.email });
    const userLoginData = { token, userID: user._id };

    return res.json(userLoginData);
  } catch (error) {
    next(error);
  }
}

module.exports = { getUserByEmailAndDate };