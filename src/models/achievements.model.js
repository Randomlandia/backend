const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const achievementsSchema = new Schema(
  {
    idiomas: { type: achievementSchema, default: () => ({ level: 0 }) },
    matematicas: { type: achievementSchema, default: () => ({ level: 0 }) },
    ciencias: { type: achievementSchema, default: () => ({ level: 0 }) },
    mundo: { type: achievementSchema, default: () => ({ level: 0 }) },
    deportes: { type: achievementSchema, default: () => ({ level: 0 }) },
    vida: { type: achievementSchema, default: () => ({ level: 0 }) },
    nerd: { type: achievementSchema, default: () => ({ level: 0 }) },
    artes: { type: achievementSchema, default: () => ({ level: 0 }) },
  },
  { _id: false }
); // No necesitamos _id para subdocumentos

module.exports = achievementsSchema;
