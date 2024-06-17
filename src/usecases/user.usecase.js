const User = require("../models/user.model");
const encryption = require("../lib/encryption");
const jwt = require("../lib/jwt");

//create user ♥ liisto
async function create(newUser) {
  try {
    const isDuplicateUser = await User.findOne({ email: newUser.email }); //busco si el usuario ya existe
    if (isDuplicateUser) {
      throw new Error("User already exists");
    }
    const encryptedPassword = encryption.hash(newUser.password);
    newUser.password = encryptedPassword;
    const data = await User.create(newUser);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

//get all ♥ listo
function getAll() {
  const users = User.find();
  return users;
}

//getById ♥ listo
async function getById(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

//borrar ♥ listo
async function deleteById(id) {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  console.log(`deleted user sucesfully:`, user); //refactor with http errors
  return user;
}

//update ♥ listo
async function update(id, updates) {
  if (updates.password) {
    updates.password = await User.encryptPassword(updates.password);
  }

  const user = await User.findByIdAndUpdate(id, updates, { new: true });

  if (!user) {
    throw new Error("User not found");
  }

  console.log("Updated user successfully:", user); //refactor with http errors
  return user;
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "invalid credentials");
  }

  const isPasswordVerified = encryption.compare(password, user.password);

  if (!isPasswordVerified) {
    throw createError(401, "invalid credentials");
  }

  return jwt.sign({ user: user._id, email: user.email });
}

// async function getByEmail(email) {
//   const user = await User.find(email);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   console.log("Found user by email:", user);
//   return user;
// }

//CRUD - Create Read Update Delete
module.exports = { create, getAll, getById, deleteById, update, login };
