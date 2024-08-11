require('dotenv').config();

//Email verification
const templateHtml = require('../lib/email/templates/validate-email.template.js');
const generateAccessToken = require('../lib/email/jsonwebtoken.js');
const Email = require('../lib/email/sendEmail.js');

const User = require('../models/user.model');
const encryption = require('../lib/encryption');
const jwt = require('../lib/jwt');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = process.env;

//Funcion para encriptar fecha de nacimiento
async function encryptDate(date) {
  const salt = await bcrypt.genSalt(10);
  const hashedDate = await bcrypt.hash(date, salt);
  return hashedDate;
}

//Funcion para comparar fecha de nacimiento

async function verifyDate(inputDate, hashedDate) {
  const isMatch = await bcrypt.compare(inputDate, hashedDate);
  return isMatch;
}

//create user ♥ listo
async function create(newUser) {
  try {
    const isDuplicateUser = await User.findOne({ email: newUser.email });
    if (isDuplicateUser) {
      throw new Error('User already exists');
    }
    const encryptedPassword = await bcrypt.hash(newUser.password, 10);
    const birthdate = new Date(newUser.fechaNacimiento).toISOString();
    const encryptedBirthDate = await encryptDate(birthdate);
    newUser.password = encryptedPassword;
    newUser.fechaNacimiento = encryptedBirthDate;
    const data = await User.create(newUser);

    if (data) {
      console.log('create email');
      const token = generateAccessToken({ id: data._id }, '5m');

      const link = `${process.env.URL_EMAIL}/${token}`;

      const r = await Email(
        [data.email],
        'Empieza por aquí...',
        templateHtml(link)
      );

      if (r) console.log('Valida send Email');
    }

    await data.save();

    const token = jwt.sign({ email: newUser.email }, JWT_SECRET);
    const { password, ...userWithoutPassword } = newUser;
    return { userWithoutPassword, token };
  } catch (err) {
    throw new Error(err.message);
  }
}

//get all ♥ listo
function getAll() {
  const users = User.find();
  if (!users) {
    throw createError(404, 'no users found');
  }
  return users;
}

//getById ♥ listo
async function getById(id) {
  try {
    const user = await User.findById(id)
      .populate({
        path: 'sandiasFavoritas',
        populate: { path: 'topic' },
      })
      .populate({
        path: 'sandiasVistas',
        populate: { path: 'topic' },
      })
      .populate('achievements');

    if (!user) {
      throw createError(404, 'User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

//borrar ♥ listo
async function deleteById(id) {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw createError(404, 'delete error: no user found');
  }

  console.log(`deleted user sucesfully:`, user); //refactor with http errors
  return user;
}

//update ♥ listo
async function update(id, updates) {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, updates, { new: true });

  if (!user) {
    throw createError(404, `Update error: User not found.`);
  }
  console.log('Updated user successfully:'); //refactor with http errors
  return user;
}

//login ♥ listo

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, 'invalid credentials');
  }

  const isPasswordVerified = encryption.compare(password, user.password);

  if (!isPasswordVerified) {
    throw createError(401, 'invalid credentials');
  }

  const token = jwt.sign({ user: user._id, email: user.email });
  const userLoginData = { token, userID: user._id };

  return userLoginData;
}

async function getUserByEmailAndDate(email, inputDate) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const birthdate = new Date(inputDate).toISOString();
    const isMatch = await verifyDate(birthdate, user.fechaNacimiento);

    if (isMatch) {
      return { userId: user._id };
    } else {
      console.log('Las fechas no coinciden');
      throw new Error('Fechas no coinciden');
    }
  } catch (error) {
    console.error('Error al comparar fechas:', error.message);
    throw error;
  }
}

// New function: getUserByEmail
async function getByEmail(email) {
  try {
    const user = await User.findOne({ email })
      .select('-password')
      .populate({
        path: 'sandiasFavoritas',
        populate: { path: 'topic' },
      })
      .populate({
        path: 'sandiasVistas',
        populate: { path: 'topic' },
      })
      .populate('achievements');

    if (!user) {
      throw createError(404, 'User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function sendEmail(idUser) {
  const userToEmail = await getById(idUser);

  /* Verificar en modelo si está validado
  if (userToEmail.emailVerified)
    throw new createError(400, 'El correo ya está validado')*/

  const token = generateAccessToken({ idUser }, '5m');

  const link = `${process.env.URL_EMAIL}/${token}`;

  const email = await Email(
    [userToEmail.email],
    'Empieza por aquí...',
    templateHtml(link)
  );

  return email;
}

async function verifyEmail(id) {
  const user = await getById(id);

  return user.emailVerified;
}

//CRUD - Create Read Update Delete
module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  update,
  login,
  getUserByEmailAndDate,
  encryptDate,
  verifyDate,
  getByEmail,
  sendEmail,
  verifyEmail,
};
