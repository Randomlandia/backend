const User = require("../models/user.model");

//create user ♥
async function create(newUser) {
  try {
    const isDuplicateUser = await User.findOne({ email: newUser.email }); //busco si el usuario ya existe
    if (isDuplicateUser) {
      throw new Error("User already exists");
    }
    newUser.password = await User.encryptPassword(newUser.password);
    const data = await User.create(newUser);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

//get all ♥
function getAll() {
  const users = User.find();
  return users;
}

//getById ♥
async function getById(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function deleteById(id) {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  console.log(`deleted user sucesfully:`, user);
  return user;
}

async function update(id, updates) {
  if (updates.password) {
    updates.password = await User.encryptPassword(updates.password);
  }

  const user = await User.findByIdAndUpdate(id, updates, { new: true });

  if (!user) {
    throw new Error("User not found");
  }

  console.log("Updated user successfully:", user);
  return user;
}

async function getByEmail(email) {
  const user = await User.find({ email });

  if (!user) {
    throw new Error("User not found");
  }

  console.log("Found user by email:", user);
  return user;
}

//CRUD - Create Read Update Delete
module.exports = { create, getAll, getById, deleteById, update, getByEmail };
