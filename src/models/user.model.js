const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const achievementsSchema = require("./achievements.model");
const Sandia = require("./sandia.model");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      required: false,
      trim: true,
      match: [/^[A-Za-z]+$/, "Character not valid"],
    },
    avatar: {
      type: Number,
      required: false,
      default: 0,
    },
    sandiasFavoritas: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sandia" }],
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
  }
);

// Middleware para asignar un nombre divertido y aleatorio si no se proporciona
userSchema.pre("save", function (next) {
  if (!this.name) {
    const funnyNames = [
      "SillyGoose",
      "WackyWombat",
      "CrazyCat",
      "JollyJoker",
      "FunkyMonkey",
      "ZanyZebra",
      "QuirkyQuokka",
      "BouncyBear",
      "GigglyGiraffe",
      "NiftyNarwhal",
      "PeppyPenguin",
      "WittyWalrus",
      "DizzyDuck",
      "LoopyLynx",
      "JumpyJaguar",
      "PerkyPanda",
      "SnazzySnail",
      "WhimsicalWhale",
      "GoofyGorilla",
      "CheerfulCheetah",
      "MerryMoose",
      "BubblyBison",
      "ChirpyChimp",
      "HappyHedgehog",
      "JovialJackal",
      "PlayfulPuffin",
      "SmileyShark",
      "WittyWolverine",
      "ZippyZebu",
    ];
    this.name = funnyNames[Math.floor(Math.random() * funnyNames.length)];
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
