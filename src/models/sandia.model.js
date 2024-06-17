const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sandiaSchema = new Schema(
  {
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      default: "",
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: Boolean,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Asegúrate de que el índice único se cree en la base de datos
sandiaSchema.index({ content: 1 }, { unique: true });

module.exports = mongoose.model("Sandia", sandiaSchema);
