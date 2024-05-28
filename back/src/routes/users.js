const express = require("express");
const router = express.Router();
const Sandia = require("../models/model_sandia");
const User = require("../models/model_user");

// const Achievement = require("../models/model_achievements");
//HOY - Update, Delete user

router.post("/", async (req, res) => {
  try {
    let newUser = req.body;
    const user = await User.findOne({ email: newUser.email });
    if (user) {
      return res.status(201).send(`user already exists`);
    }
    newUser.password = await User.encryptPassword(newUser.password);
    const data = await User.create(newUser);
    await data.save();

    console.log(`User saved successfuly:`, data);
    res.status(201).send(data);

    console.log(data);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err, msg: err.message });
  }
});

//ver todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err, msg: err.message });
  }
});

//ver usuarios por ID

//actualizar usuario

//borrar usuario por id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    } else {
      console.log(`deleted user sucesfully:`, user);
      res.status(200).send({ msg: "deleted user sucesfully" });
    }
  } catch (err) {
    res.status(500).send({ error: err, msg: err.message });
  }
});
//CRUD - Create Read Update Delete
module.exports = router;
