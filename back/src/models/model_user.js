const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const achievementsSchema = require("./model_achievements");
const Sandia = require("./model_sandia");

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
      type: [{ type: Schema.Types.ObjectId, ref: "Sandia" }],
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

// Middleware para validar las IDs de las sandías favoritas antes de guardar el usuario
userSchema.pre("save", async function (next) {
  if (this.sandiasFavoritas && this.sandiasFavoritas.length > 0) {
    const sandiasExistentes = await Sandia.find({
      _id: { $in: this.sandiasFavoritas },
    }).select("_id");
    const sandiaIds = sandiasExistentes.map((sandia) => sandia._id.toString());
    const idsValidos = this.sandiasFavoritas.every((id) =>
      sandiaIds.includes(id.toString())
    );

    if (!idsValidos) {
      const error = new Error("Algunas sandías no existen en la base de datos");
      error.status = 400;
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
