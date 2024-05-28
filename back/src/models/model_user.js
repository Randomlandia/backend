const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
      type: {
        topic: {
          type: Schema.Types.ObjectId,
          ref: "Achieve",
        },
        level: Number,
        default: {},
      },
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
