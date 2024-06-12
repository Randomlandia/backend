const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sandiaSchema = new Schema(
  {
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    content: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Sandia", sandiaSchema);
