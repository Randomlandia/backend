const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const achievementsSchema = require("./model_achievements");

const achievementSchema = new Schema(
  {
    level: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
); // No necesitamos _id para subdocumentos

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Ingresa un correo valido: ejemplo juan.perez@gmail.com",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: Number,
      required: true,
      default: 0,
    },
    sandiasFavoritas: {
      type: [],
      default: [],
    },
    achievements: {
      type: achievementsSchema,
    },
    score: {
      type: Number,
      default: 0,
    },
    //TODO: encriptado de contraseña
  },
  {
    timestamps: true,
    statics: {
      encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(15); // determina cuántas veces se va a reencriptar la contraseña
        return await bcrypt.hash(password, salt);
      },
      isValidPassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
      },
      createToken: async (payload) => {
        return jwt.sign(payload, process.env.JWT_SIGN, { expiresIn: "24h" });
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
