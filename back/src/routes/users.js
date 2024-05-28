const express = require("express");
const router = express.Router();
const Sandia = require("../models/model_sandia");
const User = require("../models/model_user");

// const Achievement = require("../models/model_achievements");

//crear usuario
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
    res.status(400).send({ error: err, msg: "Could not create user!" });
  }
});

//ver todos los usuarios

//ver usuarios por ID

//actualizar usuario

//borrar usuario
//CRUD - Create Read Update Delete
module.exports = router;
